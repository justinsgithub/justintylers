import { type NextApiRequest, type NextApiResponse } from 'next'

import { prisma } from '@/server/db/client'

const guest = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).send('Method not allowed')
    }

    const new_guest = await prisma.guest.create({data:{}})

    console.log('NEW GUEST', new_guest)

    res.status(201).json(new_guest)
}

export default guest
