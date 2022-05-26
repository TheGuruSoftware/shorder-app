import { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import Spinner from '../components/Spinner';
const Signup = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    }
    return (
        <main className="w-full">
            <form className="mx-auto max-w-xl mt-5 bg-gray-100 border rounded shadow p-3" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold border-b-2 w-fit pr-4">Sign up</h2>
                <fieldset disabled={loading} className="flex flex-col gap-1 mt-3">
                    <label>Username</label>
                    <Input type="text" />
                    <label>Password</label>
                    <Input type="password" />
                    <label>Repeat password</label>
                    <Input type="password" />
                    <Button oclass="mt-3">{loading ? <Spinner /> : "Sign up"}</Button>
                </fieldset>
            </form>
        </main>
    );
}

export default Signup;