import { getUserFromUsername } from "../../sb"
export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }
    const data = JSON.parse(req.body)
    const user = await getUserFromUsername(data.username)
    if (user) {
        if (user.password != data.password) {
            res.status(400).json({ message: 'Wrong password' })
            return
        }
        res.status(200).json({ user: user })
        return
    }
    res.status(400).json({ message: 'User does not exist' })
}