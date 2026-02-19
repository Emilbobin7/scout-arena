import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AthleteDashboard from "./pages/AthleteDashboard";
import ScoutDashboard from "./pages/ScoutDashboard";
import UploadVideo from "./pages/UploadVideo";
import Explore from "./pages/Explore";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/athlete" element={<AthleteDashboard />} />
                <Route path="/scout" element={<ScoutDashboard />} />
                <Route path="/upload" element={<UploadVideo />} />
                <Route path="/explore" element={<Explore />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
