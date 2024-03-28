import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const buyLisence = async (req, res) => {
    try {
        const lisenceId = parseInt(req.params.id);
        const lisence = await prisma.lisence.findUnique({ where: { id: lisenceId } });
        if (!lisence) {
            return res.status(404).json({ msg: 'Lisence not found' });
        }

        const notEnoughMoney = user.money < lisence.price;
        if (notEnoughMoney) {
            return res.status(400).json({ msg: 'Not enough money to buy this lisence' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                money: user.money - lisence.price,
                lisences: {
                    connect: { id: lisenceId }
                }
            }
        });

        res.json({ msg: 'Lisence purchased successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const buyProduct = async (req, res) => {
    const { quantity } = req.body;
    try {
        const productId = parseInt(req.params.id);
        const userId = parseInt(req.session.userId);

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const totalAmount = product.price * quantity;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.money < totalAmount) {
            return res.status(400).json({ msg: 'Not enough money' });
        }

        const existingUserProduct = await prisma.userProduct.findFirst({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if (existingUserProduct) {
            await prisma.userProduct.update({
                where: { id: existingUserProduct.id },
                data: {
                    quantity: existingUserProduct.quantity + quantity
                }
            });
        } else {
            await prisma.userProduct.create({
                data: {
                    user: { connect: { id: userId } },
                    product: { connect: { id: productId } },
                    quantity: quantity
                }
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                money: user.money - totalAmount
            }
        });

        res.json({ msg: 'Product purchased successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
