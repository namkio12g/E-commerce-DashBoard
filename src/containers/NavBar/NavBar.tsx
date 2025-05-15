import React from "react";
import MLogo from "../../assets/meetup.png";
import { Link } from "react-router";
import { ShoppingCartIcon, LogOutIcon } from "lucide-react";
import "./NavBar.scss";
import { LoginDialog } from "@/components/Dialogs/LoginDialogs";
import { useBoundStore } from "@/stores";
import { UserLoginType } from "@/types/commonTypes";
import { toast } from "sonner";

const NavBar: React.FC = () => {
    const onClose = useBoundStore.use.toggleCart();
    const handleLogoutUser = useBoundStore.use.Logout();
    const userInfo: UserLoginType | undefined =
        useBoundStore.use.UserInfo?.() ?? undefined;

    const handleLogout = () => {
        handleLogoutUser();
        toast.success("Logged out successfully");
    };

    return (
        <nav className="navbar flex place-content-center py-5  w-full rounded-sm shadow-lg place-items-center bg-secondary-bg z-2">
            <div className="flex justify-between md:flex-row xs:flex-col w-9/12">
                <div className="">
                    <img
                        src={MLogo}
                        alt=""
                        className="h-12 w-12 inline-block mr-3"
                    />
                    <Link
                        to="/"
                        className="navbar-title inline-block mr-10 font-comic text-2xl font-bold text-theme-text-primary"
                    >
                        MightShops
                    </Link>
                </div>
                <ul className="navbar-links flex flex-row justify-center items-center">
                    <li className="link  mr-7 text-xl rounded-md p-2">
                        <Link to="/">Products</Link>
                    </li>
                    <li className="link mr-7 text-xl text-theme-text-primary">
                        <Link to="/dash-board">Dash Board</Link>
                    </li>
                </ul>
                <div className="place-content-center place-items-center">
                    <ul className="navbar-links flex flex-row">
                        <li
                            className="link flex place-items-center place-content-center mr-7
                         text-xl rounded-md cursor-pointer"
                            onClick={() => onClose(true)}
                        >
                            <ShoppingCartIcon className="h-6 w-6 text-theme-text-primary" />
                        </li>
                        {userInfo ? (
                            <li
                                className="link inline-block mr-7 text-xl rounded-md p-2 cursor-pointer"
                                onClick={() => handleLogout()}
                            >
                                <LogOutIcon className="h-6 w-6 text-theme-text-primary" />
                            </li>
                        ) : (
                            <li className="link inline-block mr-7 text-xl rounded-md p-2 cursor-pointer">
                                <LoginDialog />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
