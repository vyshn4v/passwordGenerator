import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRouter({ children }) {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(location.pathname);
    if (user) {
        if (location.pathname === "/signup" || location.pathname === "/login") {
            return <Navigate to={'/'} />
        } else {
            return children
        }
    } else {
        return children
    }
}

export default ProtectedRouter