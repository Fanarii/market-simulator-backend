import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getUsers = async (req, res) => {
    try {
        const response = await prisma.user.findMany({
            select: {
                name: true,
                money: true,
                lisences: true
            }
        })
        res.json(response)

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await prisma.user.findUnique({
            where: {id: req.params.id}
        })
        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}