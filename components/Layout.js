import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <div className="flex text-gray-800">
            <Navbar />
            {children}
        </div>
    );
}

export default Layout;