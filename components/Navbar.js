import Input from "./Input";
import Link from "./Link";
import Button from "./Button";
import { useAuth } from "../auth";
import { PlusIcon, LoginIcon, HomeIcon, LogoutIcon, UserIcon } from "@heroicons/react/solid"
import { useEffect } from 'react';
const Navbar = () => {
    const { user, logoutUser } = useAuth();
    return (
        <nav className="bg-gray-200 h-screen p-2 border-r shadow-inner flex flex-col gap-2">
            <h2 className="text-lg font-bold text-gray-700 px-2 text-center">Portal graficzny</h2>
            <div>
                <Input type="text" placeholder={user ? user.username : "Szukaj"} />
            </div>
            <div>
                <ul className="flex flex-col gap-1">
                    <li>
                        <Link href="/" icon={<HomeIcon className="w-5 h-5" />}>
                            Tablica
                        </Link>
                    </li>
                    <li>
                        <Link href="/add" icon={<PlusIcon className="w-5 h-5" />}>
                            Dodaj grafikę
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mt-auto">
                <ul className="flex flex-col gap-1">
                    {user ? (
                        <li>
                            <Link button onClick={() => logoutUser()} oclass="w-100" icon={<LogoutIcon className="w-5 h-5" />}>
                                Wyloguj się
                            </Link>
                        </li>
                    ) : (
                        <>

                            <li>
                                <Link href="/signin" icon={<UserIcon className="w-5 h-5" />}>
                                    Logowanie
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" icon={<LoginIcon className="w-5 h-5" />}>
                                    Rejestracja
                                </Link>
                            </li>
                        </>
                    )
                    }
                </ul >
            </div >
        </nav >
    )
}

export default Navbar;