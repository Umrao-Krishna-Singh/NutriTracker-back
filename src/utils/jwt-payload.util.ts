import { Roles } from '@prism/keysley/enums'

export type tokenData = {
    id: number
    first_name: string
    last_name: string
    role: Roles[]
    is_verified: number
    status: number
    iat: number
    exp: number
}
