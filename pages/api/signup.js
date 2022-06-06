import { createUser, getUserFromUsername } from "../../sb"
export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }
    const data = JSON.parse(req.body)
    const user = await getUserFromUsername(data.username)
    if (user.length > 0) {
        res.status(400).json({ message: 'User already exists' })
        return
    }
    const created = await createUser(data.username, data.password)

    res.status(200).json({ message: 'User created', newUser: created })
}