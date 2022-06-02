import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isUser = JSON.parse(localStorage.getItem('user'))
            if (isUser) {
                setUser(isUser)
            }
        }
    }, [])

    async function signInUser(username, password) {
        const res = await fetch('/api/signin', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password })
        })

        const newUser = await res.json()

        if (!res.ok) {
            throw new Error(await newUser.message || "Błąd")
        }

        if (newUser) {
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            router.push('/')
        }
    }

    async function signUpUser(username, password) {
        const res = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password })
        })

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const newUser = await res.json()
        if (newUser) {
            router.push("/signin")
            alert("Konto utworzone. Możesz się zalogować")
        }
    }

    function logoutUser() {
        setUser(false)
        localStorage.removeItem('user')
        router.push('/')
    }

    const value = {
        user,
        signInUser,
        signUpUser,
        logoutUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}