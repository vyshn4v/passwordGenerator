import {
    Routes,
    Route
} from "react-router-dom";
import UserOutlet from "../components/userOutlet/UserOutlet";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Signup from "../pages/Signup/Signup";
import ProtectedRouter from "../util/ProtectedRouter";
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
                <ProtectedRouter>
                    <Login />
                </ProtectedRouter>
            } />
            <Route path="/signup" element={
                <ProtectedRouter>
                    <Signup />
                </ProtectedRouter>
            } />
        </Routes>
    )
}

export default User