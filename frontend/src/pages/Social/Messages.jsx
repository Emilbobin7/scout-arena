import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Send, Search, MessageSquare, Circle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { SOCKET_URL } from "../../config";

const socket = io(SOCKET_URL, { autoConnect: false });

export default function Messages() {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [text, setText] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUser, setTypingUser] = useState(null);
    const [unreadMap, setUnreadMap] = useState({});
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const typingTimeout = useRef(null);
    const [searchParams] = useSearchParams();

    const currentUser = JSON.parse(localStorage.getItem("userInfo") || "null");
    const myId = currentUser?._id;

    const getConfig = useCallback(() => ({
        headers: { Authorization: `Bearer ${currentUser?.token}` }
    }), [currentUser?.token]);

    // Connect socket on mount
    useEffect(() => {
        if (!myId) return;
        socket.connect();
        socket.emit("userOnline", myId);

        socket.on("onlineUsers", (users) => setOnlineUsers(users));
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => {
                // Avoid duplicate if we sent it ourselves
                if (prev.find((m) => m._id === msg._id)) return prev;
                return [...prev, msg];
            });
            // Update unread badge for conversations list
            if (msg.senderId?._id !== myId && msg.senderId !== myId) {
                setUnreadMap((prev) => ({
                    ...prev,
                    [msg.senderId?._id || msg.senderId]: (prev[msg.senderId?._id || msg.senderId] || 0) + 1
                }));
            }
        });
        socket.on("typing", ({ senderName }) => setTypingUser(senderName));
        socket.on("stopTyping", () => setTypingUser(null));

        return () => {
            socket.off("onlineUsers");
            socket.off("receiveMessage");
            socket.off("typing");
            socket.off("stopTyping");
            socket.disconnect();
        };
    }, [myId]);

    // Fetch conversations
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const { data } = await axios.get("/api/messages", getConfig());
                setConversations(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchConversations();
    }, [getConfig]);

    // Auto-select user from URL param ?userId=xxx
    useEffect(() => {
        const targetId = searchParams.get("userId");
        const targetName = searchParams.get("userName");
        if (targetId && targetName) {
            setSelectedUser({ _id: targetId, name: targetName });
        }
    }, [searchParams]);

    // Fetch messages when user selected
    useEffect(() => {
        if (!selectedUser) return;
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(`/api/messages/${selectedUser._id}`, getConfig());
                setMessages(data);
                // Clear unread badge
                setUnreadMap((prev) => ({ ...prev, [selectedUser._id]: 0 }));
            } catch (e) {
                console.error(e);
            }
        };
        fetchMessages();
    }, [selectedUser, getConfig]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typingUser]);

    const handleSend = async () => {
        if (!text.trim() || !selectedUser) return;
        const msgData = {
            senderId: myId,
            receiverId: selectedUser._id,
            text: text.trim(),
            createdAt: new Date().toISOString()
        };

        // Optimistic UI
        setMessages((prev) => [...prev, { ...msgData, _id: Date.now().toString(), senderId: { _id: myId } }]);
        setText("");

        // Emit via socket
        socket.emit("sendMessage", { ...msgData, senderId: { _id: myId, name: currentUser?.name } });

        // Persist to DB
        try {
            await axios.post("/api/messages", { receiverId: selectedUser._id, text: msgData.text }, getConfig());
        } catch (e) {
            console.error("Failed to save message:", e);
        }
    };

    const handleTyping = (e) => {
        setText(e.target.value);
        if (!selectedUser) return;
        socket.emit("typing", { receiverId: selectedUser._id, senderName: currentUser?.name });
        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            socket.emit("stopTyping", { receiverId: selectedUser._id });
        }, 1500);
    };

    const isOnline = (userId) => onlineUsers.includes(userId?.toString());

    const getPartner = (conv) => {
        const senderId = conv.senderId?._id?.toString() || conv.senderId?.toString();
        return senderId === myId?.toString() ? conv.receiverId : conv.senderId;
    };

    const filteredConversations = conversations.filter((c) => {
        const partner = getPartner(c);
        return partner?.name?.toLowerCase().includes(search.toLowerCase());
    });

    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50">
            {/* LEFT — Conversations List */}
            <div className="w-80 flex-shrink-0 border-r border-white/10 flex flex-col bg-slate-900">
                {/* Header */}
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold mb-3">Messages</h2>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search conversations..."
                            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : filteredConversations.length === 0 ? (
                        <div className="p-6 text-center text-gray-500 text-sm">
                            <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
                            No conversations yet
                        </div>
                    ) : (
                        filteredConversations.map((conv) => {
                            const partner = getPartner(conv);
                            const partnerId = partner?._id?.toString();
                            const online = isOnline(partnerId);
                            const unread = unreadMap[partnerId] || 0;
                            const isSelected = selectedUser?._id === partnerId;

                            return (
                                <button
                                    key={conv._id}
                                    onClick={() => { setSelectedUser(partner); setUnreadMap(p => ({ ...p, [partnerId]: 0 })); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 ${isSelected ? "bg-blue-500/10 border-l-2 border-l-blue-500" : ""}`}
                                >
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                            {partner?.name?.[0]?.toUpperCase() || "?"}
                                        </div>
                                        {online && (
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-white text-sm truncate">{partner?.name}</p>
                                            <span className="text-xs text-gray-500 flex-shrink-0 ml-1">{formatTime(conv.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-0.5">
                                            <p className="text-xs text-gray-500 truncate">{conv.text}</p>
                                            {unread > 0 && (
                                                <span className="ml-1 flex-shrink-0 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                                    {unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            {/* RIGHT — Chat Window */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-slate-900/80 backdrop-blur">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    {selectedUser.name?.[0]?.toUpperCase()}
                                </div>
                                {isOnline(selectedUser._id) && (
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900" />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-white">{selectedUser.name}</p>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    {isOnline(selectedUser._id) ? (
                                        <><Circle size={8} className="fill-green-500 text-green-500" /> Online</>
                                    ) : (
                                        "Offline"
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-3">
                            {messages.map((msg, i) => {
                                const senderId = msg.senderId?._id?.toString() || msg.senderId?.toString();
                                const isOwn = senderId === myId?.toString();
                                const showTime = i === messages.length - 1 ||
                                    new Date(messages[i + 1]?.createdAt) - new Date(msg.createdAt) > 60000;

                                return (
                                    <div key={msg._id || i} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                                        <div className="max-w-xs lg:max-w-md">
                                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isOwn
                                                ? "bg-blue-600 text-white rounded-br-sm"
                                                : "bg-white/10 text-gray-100 rounded-bl-sm"
                                                }`}>
                                                {msg.text}
                                            </div>
                                            {showTime && (
                                                <p className={`text-xs text-gray-600 mt-1 ${isOwn ? "text-right" : "text-left"}`}>
                                                    {formatTime(msg.createdAt)}
                                                    {isOwn && msg.read && <span className="ml-1 text-blue-400">✓✓</span>}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Typing indicator */}
                            {typingUser && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-gray-400">{typingUser} is typing</span>
                                            <div className="flex gap-0.5 ml-1">
                                                {[0, 1, 2].map((i) => (
                                                    <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                                        style={{ animationDelay: `${i * 0.15}s` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-6 py-4 border-t border-white/10 bg-slate-900/80">
                            <div className="flex items-center gap-3">
                                <input
                                    value={text}
                                    onChange={handleTyping}
                                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                                    placeholder={`Message ${selectedUser.name}...`}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!text.trim()}
                                    className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all hover:scale-105 active:scale-95"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                <MessageSquare size={36} className="text-gray-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Your Messages</h3>
                            <p className="text-gray-500 text-sm">Select a conversation or message an athlete from their profile</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
