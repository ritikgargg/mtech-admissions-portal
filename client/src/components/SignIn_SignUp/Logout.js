import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { removeUserSession } from './Sessions'

export default function Logout() {
    const navigate = useNavigate();

    const signout = () => {
        removeUserSession();
        navigate("/");
    };

    useEffect(() => {
        signout();
    })    

    return (
        <></>
    )
}