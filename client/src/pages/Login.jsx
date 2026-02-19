import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        if (res.data.user.role === "athlete")
            navigate("/athlete");
        else
            navigate("/scout");
    };

    return (
        <div>
            <h1>Login</h1>
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;
