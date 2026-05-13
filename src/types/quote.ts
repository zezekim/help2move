export interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

export interface QuoteFormData {
  fromAddress: Address;
  toAddress: Address;
  movingDate: string;
  homeType: "apartment" | "house" | "studio" | "other";
  surfaceArea: string;
  extraServices: string[];
  name: string;
  email: string;
  phone: string;
}

export type QuoteStep = 1 | 2 | 3 | 4;
