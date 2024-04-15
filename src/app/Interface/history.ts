export interface Transaction {
[x: string]: any;
transactionId: number;
  transactionType: string;
  fromAccount: string;
  toAccountNumber:String;
  amount: number;
  createdAt: Date;
  status: string;
}
