export class Bill {
  id: number;
  date: string;
  note: string;
  opened: boolean;
  products: string[];
  productCodes: number[];
  productsPrices: number[];
  amountPaid: number;
}