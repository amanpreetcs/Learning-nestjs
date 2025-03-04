import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const Roles = (...Roles: [Role, ...Role[]]) =>
  SetMetadata('role', Roles);
