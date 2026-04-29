export interface IOrderCreatedMessage {
  orderId: string;
  amount: number;
  customer: {
    id: string;
  };
}
