import { getUserFromUsername } from "../../sb"
export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }
    const data = JSON.parse(req.body)
    const user = await getUserFromUsername(data.username)
    if (user.length > 0) {
        if (user[0].password !== data.password) {
            res.status(400).json({ message: 'Wrong password' })
            return
        }
        res.status(200).json({ user: user[0] })
        return
    }
    res.status(400).json({ message: 'User does not exist' })
}