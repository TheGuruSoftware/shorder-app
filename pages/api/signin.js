import { prisma } from '../../prismaC'
export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
    }

    const userData = JSON.parse(req.body)
    const user = await prisma.user.findFirst({
        where: {
            username: userData.username,
            password: userData.password
        }
    })
    if (user) {
        res.status(200).json(user)
        return
    }
    res.status(400).json({ message: 'User not found' })
}