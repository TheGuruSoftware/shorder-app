import { createImage } from "../../sb"
export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }
    const data = JSON.parse(req.body)
    const created = await createImage(data.userId, data.url, data.description)

    res.status(200).json({ message: 'User created' })
}