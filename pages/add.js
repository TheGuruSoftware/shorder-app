import { useState } from 'react'
import { useAuth } from '../auth';
import Input from '../components/Input';
import Button from '../components/Button';
import Spinner from '../components/Spinner'
import { useRouter } from 'next/router'
import moment from 'moment'


export default function Add() {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');

    const router = useRouter()
    const { user } = useAuth()

    const addNewImage = async (url, id) => {
        const res = await fetch('/api/add', {
            method: 'POST',
            body: JSON.stringify({ url: url, userId: id })
        })

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const added = await res.json()
        if (added) {
            router.reload(window.location.pathname)
            alert("Dodano")
        } else {
            alert("Błąd")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return
        setLoading(true);
        if (url.length < 5) {
            alert('URL jest zbyt krótki')
            setLoading(false)
            return false
        }
        try {
            await addNewImage(url, user.id)
            e.target.reset()
            setLoading(false)
        } catch (err) {
            alert(err)
            setLoading(false)
        }
    }
    return (
        <main className="w-full">
            <form className="mx-auto max-w-xl mt-5 bg-gray-100 border rounded shadow p-3" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold border-b-2 w-fit pr-4">Dodaj grafikę</h2>
                <fieldset disabled={loading} className="flex flex-col gap-1 mt-3">
                    <label>URL</label>
                    <Input type="text" onChange={e => setUrl(e.currentTarget.value)} />
                    <Button oclass="mt-3">{loading ? <Spinner /> : "Dodaj"}</Button>
                </fieldset>
            </form>
        </main>
    )
}
