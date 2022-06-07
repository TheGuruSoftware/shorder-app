import Input from "./Input";
import Link from "./Link";
import { useAuth } from "../auth";
import { PlusIcon, LoginIcon, HomeIcon, LogoutIcon, UserIcon } from "@heroicons/react/solid"
const Navbar = () => {
    const { user, logoutUser } = useAuth();
    return (
        <nav className="bg-gray-200 p-2 border-r shadow-inner flex flex-col gap-2 h-fit sm:h-screen min-w-max">
            <h2 className="text-lg font-bold text-gray-700 px-2 text-center">Portal graficzny</h2>
            {user &&
                <div className="bg-gray-300 rounded shadow px-1 font-semibold text-center">
                    {user.username}
                </div>
            }
            {/*<Input type="text" placeholder={user ? user.username : "Szukaj"} oclass="w-full" />*/}
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
                            <Link button onClick={() => logoutUser()} oclass="w-full sm:mb-5" icon={<LogoutIcon className="w-5 h-5" />}>
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