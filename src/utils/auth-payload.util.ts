import { Roles } from '@prism/keysley/enums'
import { FastifyRequest } from 'fastify'

export type TokenData = {
    id: number
    first_name: string
    last_name: string
    role: Roles[]
    status: boolean
    type: 'auth' | 'refresh'
    iat: number
    exp: number
}
export type UserInfo = {
    id: number
    first_name: string
    last_name: string
    status: boolean
    role: Roles
}[]

export type ModFasReq = FastifyRequest & { user?: TokenData } & { userInfo?: UserInfo }
