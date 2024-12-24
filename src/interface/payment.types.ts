import type { User } from "./users.types";
import type { PaymentType } from "./paymentType.types";

export interface Payment {
  id?: number;
  amount?: number;
  paymentType?: PaymentType;
  paymentTypeId?: number;
  user?: User;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
