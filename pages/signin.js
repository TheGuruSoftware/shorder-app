import { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { useAuth } from '../auth';
const Signin = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { user, signInUser } = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (username.length < 3) {
            alert('Username must be at least 3 characters long')
            setLoading(false)
            return false
        }
        if (password.length < 3) {
            alert('Password must be at least 3 characters long')
            setLoading(false)
            return false
        }
        try {
            await signInUser(username, password)
            e.target.reset()
            setLoading(false)
        } catch (err) {
            console.error(err)
            alert(err)
            setLoading(false)
        }
    }
    return (
        <main className="w-full">
            <form className="mx-auto max-w-xl mt-5 bg-gray-100 border rounded shadow p-3" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold border-b-2 w-fit pr-4">Sign in</h2>
                <fieldset disabled={loading} className="flex flex-col gap-1 mt-3">
                    <label>Username</label>
                    <Input type="text" onChange={e => setUsername(e.currentTarget.value)} />
                    <label>Password</label>
                    <Input type="password" onChange={e => setPassword(e.currentTarget.value)} />
                    <Button oclass="mt-3">{loading ? <Spinner /> : "Sign in"}</Button>
                </fieldset>
            </form>
        </main>
    );
}

export default Signin;