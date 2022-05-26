import { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import Spinner from '../components/Spinner';

async function saveUser(user) {
    const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(user)
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}
const validateForm = (username, password, password2) => {
    if (username.length < 3) {
        alert('Username must be at least 3 characters long')
        return false
    }
    if (password.length < 3) {
        alert('Password must be at least 3 characters long')
        return false
    }
    if (password !== password2) {
        alert('Passwords must match')
        return false
    }
    return true
}
const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
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
        if (password !== password2) {
            console.log(password)
            console.log(password2)
            alert('Passwords must match')
            setLoading(false)
            return false
        }
        try {
            await saveUser({ username: username, password: password })
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
                <h2 className="text-xl font-semibold border-b-2 w-fit pr-4">Sign up</h2>
                <fieldset disabled={loading} className="flex flex-col gap-1 mt-3">
                    <label>Username</label>
                    <Input type="text" onChange={e => setUsername(e.currentTarget.value)} />
                    <label>Password</label>
                    <Input type="password" onChange={e => setPassword(e.currentTarget.value)} />
                    <label>Repeat password</label>
                    <Input type="password" onChange={e => setPassword2(e.currentTarget.value)} />
                    <Button className="mt-3">{loading ? <Spinner /> : "Sign up"}</Button>
                </fieldset>
            </form>
        </main>
    );
}

export default Signup;