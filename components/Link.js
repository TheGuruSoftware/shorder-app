import NextLink from "next/link";
import { useRouter } from 'next/router'
const Link = ({ href, icon, button, children, ...props }) => {
    const router = useRouter()
    const isActive = router.pathname === href
    if (button) {
        return (
            <button {...props} className={`w-full flex align-middle gap-1 shadow rounded bg-gray-50 px-1 text-gray-600 hover:bg-gray-100 hover:shadow-md focus:ring-1 focus:ring-green-400 outline-none transition-all select-none hover:border-r-8 border-green-400`} >
                <div className="my-auto">
                    {icon && icon}
                </div>
                <div className="font-medium w-full text-left">
                    {children}
                </div>
            </button>
        )
    }
    return (
        <NextLink href={href}>
            <a {...props} className={`flex align-middle gap-1 shadow rounded bg-gray-50 px-1 text-gray-600 hover:bg-gray-100 hover:shadow-md focus:ring-1 focus:ring-green-400 outline-none transition-all select-none hover:border-r-8 border-green-400 ${isActive && "border-l-8"}`} >
                <div className="my-auto">
                    {icon && icon}
                </div>
                <div className="font-medium w-full">
                    {children}
                </div>
            </a>
        </NextLink >
    );
}

export default Link;