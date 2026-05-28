import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export interface TokenPayload {
  userId: number
  email: string
}

export function generateToken(
  payload: TokenPayload
): string {
  return jwt.sign(
    payload,
    config.jwtSecret!,
    {
      expiresIn: '7d'
    }
  )
}

export function verifyToken(
  token: string
): TokenPayload {
  return jwt.verify(
    token,
    config.jwtSecret!
  ) as TokenPayload
}