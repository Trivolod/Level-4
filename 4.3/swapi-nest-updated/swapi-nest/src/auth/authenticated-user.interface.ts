import { UserRole } from '../users/entities/user-role.enum';

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}
