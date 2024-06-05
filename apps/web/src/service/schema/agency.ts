import type { Address } from "./address";

export interface Agency {
  name: string;
  email: string;
  site?: string;
  cnpj: string;
  logoUrl?: string;
  layoutColor?: string;
  address?: Address;
}
