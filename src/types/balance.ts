import { z } from "zod"
import { TDealer } from "./dealer";
import { TUser } from "./usersType";

 export const balaceSchema = z.object({
    dealer: z.string({message:"Dealer is Required"}),
    amount: z
    .string()
    .transform((value) => parseFloat(value)) 
    .refine((value) => !isNaN(value) && value > 0, { message: 'Amount must be a positive number.' }),
    transactionNo: z.string().min(1, 'Transaction number is required.'),
    receivedBank: z.string().min(1, 'Received bank is required.'),
    senderBank: z.string().min(1, 'Sender bank is required.'),
  })


  export type TBalace = {
    _id: string;
    dealer: TDealer;
    amount: number;
    transactionNo: string;
    receivedBank: string;
    senderBank: string;
    addedBy: TUser;
  }