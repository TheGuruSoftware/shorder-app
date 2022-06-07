const Input = ({ type, disableSpace, oclass, ...props }) => {
    return <input type={type} {...props} className={`px-1 shadow-sm border rounded focus:ring-1 focus:ring-green-400 focus:shadow outline-none transition-all text-gray-700 ${oclass}`} />
}

export default Input;