export interface User {
  id?: string;
  subscription_tier?: string; // placeholder
  payment_info?: string; // placeholder
  email: string;
  password: string;
  user_role: string;
}
