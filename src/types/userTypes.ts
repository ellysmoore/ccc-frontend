export interface User {
  id?: string;
  name?: string;
  email: string;
  is_administrator: boolean;
  is_super_admin: boolean;
}