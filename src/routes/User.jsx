import {
    Routes,
    Route
} from "react-router-dom";
import UserOutlet from "../components/userOutlet/UserOutlet";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
function User() {
    return (
        <Routes>
            <Route path="/" element={
                <UserOutlet />
            } >
                <Route index element={
                    <Home />
                } />
            </Route>
            <Route path="/login" element={
                <Login />
            } />
        </Routes>
    )
}

export default User