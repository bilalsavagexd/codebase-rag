// Page to which the user will be redirected the moment they register an account
import React from 'react'
import { db } from '@/server/db'
import { notFound, redirect } from 'next/navigation'
import { auth, clerkClient } from '@clerk/nextjs/server'

const SyncUser = async () => {
    // get the userId of the registered user from clerk:
    const { userId } = await auth()
    if (!userId) {
        throw new Error ('User not Found')
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user.emailAddresses[0]?.emailAddress) {
        return notFound()
    }

    // upsert means if user exists, update, else create
    // db from prisma
    await db.user.upsert({
        where: { 
            emailAddress: user.emailAddresses[0]?.emailAddress ?? ""
        },
        update: {
            imageUrl: user.imageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        create: {
            id: userId, // clerk userId
            emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
            imageUrl: user.imageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    })
    // redirect to dashboard after user is synced
    return redirect('/dashboard')
}

export default SyncUser