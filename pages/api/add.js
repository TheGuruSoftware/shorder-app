import { prisma } from '../../prismaC'
import moment from "moment"
export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
    }

    const data = JSON.parse(req.body)
    const q = await prisma.image.create({
        data: {
            url: data.url,
            userId: data.userId,
            added: moment().format('YYYY-MM-DD HH:mm:ss'),
            likes: ""
        }
    })

    res.json(q)
}