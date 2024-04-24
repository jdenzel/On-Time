import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

function isLoggedIn() {
    return !!localStorage.getItem(ACCESS_TOKEN);
}

function GuestRoute({children}) {
    return isLoggedIn() ? <Navigate to="/" /> : children;
}

export default GuestRoute