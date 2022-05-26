const Button = ({ icon, children, oclass, ...props }) => {
    return (
        <button {...props} className={`flex items-center justify-center shadow rounded bg-white p-1 text-gray-600 hover:bg-gray-100 hover:shadow-md focus:ring-1 focus:ring-green-400 outline-none transition-all select-none border-green-400 ${oclass}`} >
            {icon && icon}
            <div className="font-medium">
                {children}
            </div>
        </button>
    );
}

export default Button;