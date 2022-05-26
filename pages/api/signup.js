import { prisma } from '../../prismaC'
export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
    }

    const userData = JSON.parse(req.body)
    const savedUser = await prisma.user.create({
        data: userData
    })

    res.json(savedUser)
}