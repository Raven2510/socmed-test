import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const createUser = async () => {
    const prisma = new PrismaClient()

    const user1 = await prisma.user.create({
        data: 
            {
                username: "rrraaveennn",
                firstname: "John Ray Ben",
                lastname: "Dela Rama",
                email: "rrraaveenn@gmail.com",
                password: "password",
                role: "ADMIN"
            },
    })

    const user2 = await prisma.user.create({
        data: {
            username: "hannipham",
            firstname: "Hanni",
            lastname: "Pham",
            email: "hanni@newjeans.com",
            password: "password",
            role: "USER",
        }
    })

    return [user1, user2]
}

export async function POST() {
    const user = await createUser()

    return NextResponse.json({
        ...user
    })
}