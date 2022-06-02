import { prisma } from '../../prismaC'
export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
    }

    const data = JSON.parse(req.body)
    const old = await prisma.image.findUnique({
        where: {
            id: data.id
        }
    })
    if (!old) {
        res.status(404).json({ message: 'Image not found' })
    }

    let newLikes = JSON.parse(old.likes || "{}")
    if (data.like != 0) {
        newLikes[data.userId] = data.like
    } else {
        delete newLikes[data.userId]
    }
    const updated = await prisma.image.update({
        where: {
            id: data.id
        },
        data: {
            likes: JSON.stringify(newLikes)
        }
    })
    res.json(newLikes)
}