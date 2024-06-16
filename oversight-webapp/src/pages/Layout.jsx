import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import './Layout.css';

export default function Layout() {

    return (
        <nav className="layout">
            <Header />

            <Outlet />
        </nav>
    )
}