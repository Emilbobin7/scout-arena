import API from "../services/api";
import { useState } from "react";

function Register() {
    const [form, setForm] = useState({});

    const register = async () => {
        await API.post("/auth/register", form);
        alert("Registered");
    };

    return (
        <div>
            <input placeholder="name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="athlete">Athlete</option>
                <option value="scout">Scout</option>
            </select>
            <button onClick={register}>Register</button>
        </div>
    );
}

export default Register;
