import { Roles } from '@prism/keysley/enums'

export type tokenData = {
    id: number
    first_name: string
    last_name: string
    role: Roles[]
    status: boolean
    iat: number
    exp: number
}
