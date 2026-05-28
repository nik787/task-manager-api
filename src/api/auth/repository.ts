import { prisma } from "../../lib/prisma.js"

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  })
}

export const createUser = (email: string, passwordHash: string) => {
  return prisma.user.create({
    data: {
      email,
      passwordHash
    }
  })
}