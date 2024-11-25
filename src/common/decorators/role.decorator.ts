import { SetMetadata } from '@nestjs/common'
import { Roles } from '@prism/keysley/enums'
import { ROLES_KEY } from '@src/constants/decorator-keys.constant'

export const Role = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles)
