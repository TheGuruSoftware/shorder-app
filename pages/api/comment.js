import { getImageFromId, updateComments } from "../../sb"

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
    }

    const data = JSON.parse(req.body)
    const old = await getImageFromId(data.id)
    if (!old) {
        res.status(404).json({ message: 'Image not found' })
    }

    let newComments = old.comments

    newComments.push({ author: data.author, text: data.text, createdAt: new Date() })

    const updated = await updateComments(data.id, newComments)
    res.status(200).json(updated)
}