import Input from "./Input";
import Link from "./Link";
import { ClipboardListIcon, LoginIcon, HomeIcon, BriefcaseIcon, CashIcon, ArchiveIcon, UserIcon } from "@heroicons/react/solid"
const Navbar = () => {
    return (
        <nav className="bg-gray-200 min-h-screen p-2 border-r shadow-inner flex flex-col gap-2">
            <h2 className="text-lg font-bold text-gray-700 px-2 text-center">Shorder</h2>
            <div>
                <Input type="text" placeholder="Search..." />
            </div>
            <div>
                <ul className="flex flex-col gap-1">
                    <li>
                        <Link href="/" icon={<HomeIcon className="w-5 h-5" />}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/orders" icon={<ClipboardListIcon className="w-5 h-5" />}>
                            Orders
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mt-auto">
                <ul className="flex flex-col gap-1">
                    <li>
                        <Link href="/signin" icon={<UserIcon className="w-5 h-5" />}>
                            Sign in
                        </Link>
                    </li>
                    <li>
                        <Link href="/signup" icon={<LoginIcon className="w-5 h-5" />}>
                            Sign up
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;