import { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import api from '../../utils/api';
import Loader from '../../components/Loader';

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const currentUser = JSON.parse(localStorage.getItem('userInfo') || 'null');

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (selectedUser) fetchMessages(selectedUser._id);
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const { data } = await api.get('/messages');
            setConversations(data);
        } catch (error) {
            console.error('Conversations error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (userId) => {
        try {
            const { data } = await api.get(`/messages/${userId}`);
            setMessages(data);
        } catch (error) {
            console.error('Messages error:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        try {
            const { data } = await api.post('/messages', {
                receiverId: selectedUser._id,
                text: newMessage.trim()
            });
            setMessages(prev => [...prev, data]);
            setNewMessage('');
        } catch (error) {
            console.error('Send message error:', error);
        }
    };

    if (loading) return <Loader text="Loading messages..." />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Messages</h1>

            <div className="glass rounded-xl border border-white/10 overflow-hidden" style={{ height: '600px' }}>
                <div className="flex h-full">
                    {/* Conversation List */}
                    <div className="w-72 border-r border-white/10 overflow-y-auto">
                        {conversations.length === 0 ? (
                            <div className="p-6 text-center text-gray-500 text-sm">
                                <MessageSquare size={32} className="mx-auto mb-2 text-gray-600" />
                                No conversations yet
                            </div>
                        ) : (
                            conversations.map((conv) => {
                                const partner = conv.senderId?._id === currentUser?._id ? conv.receiverId : conv.senderId;
                                return (
                                    <button
                                        key={conv._id}
                                        onClick={() => setSelectedUser(partner)}
                                        className={`w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left border-b border-white/5 ${selectedUser?._id === partner?._id ? 'bg-blue-500/10' : ''
                                            }`}
                                    >
                                        <img
                                            src={partner?.profilePhoto || 'https://via.placeholder.com/40'}
                                            alt={partner?.name}
                                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-medium text-white truncate">{partner?.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{conv.text}</p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    {/* Message Area */}
                    <div className="flex-1 flex flex-col">
                        {selectedUser ? (
                            <>
                                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                    <img
                                        src={selectedUser.profilePhoto || 'https://via.placeholder.com/36'}
                                        alt={selectedUser.name}
                                        className="w-9 h-9 rounded-full object-cover"
                                    />
                                    <span className="font-semibold text-white">{selectedUser.name}</span>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {messages.map((msg) => {
                                        const isOwn = msg.senderId === currentUser?._id || msg.senderId?._id === currentUser?._id;
                                        return (
                                            <div key={msg._id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${isOwn
                                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                                        : 'bg-white/10 text-gray-200 rounded-bl-sm'
                                                    }`}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>

                                <form onSubmit={sendMessage} className="p-4 border-t border-white/10 flex gap-3">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors disabled:opacity-50"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500">
                                <div className="text-center">
                                    <MessageSquare size={48} className="mx-auto mb-3 text-gray-600" />
                                    <p>Select a conversation to start messaging</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
