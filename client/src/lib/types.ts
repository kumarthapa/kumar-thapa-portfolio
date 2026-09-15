export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  priceCents: number;
  currency: string;
  image: string;
  delivery: string;
}
export interface CartItem {
  service: Service;
  quantity: number;
}
export interface Quote {
  lines: {
    id: string;
    name: string;
    quantity: number;
    unitPriceCents: number;
    totalCents: number;
  }[];
  currency: string;
  subtotalCents: number;
  totalCents: number;
  mock: boolean;
  notice: string;
}
