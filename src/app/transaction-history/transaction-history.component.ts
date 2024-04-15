import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../service/history.service';
import { Transaction } from '../Interface/history';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  transactions: Transaction[] = [];
  accountNumber: string = '';
  amount:string = '';
  startDate: string = '';
  endDate: string = '';
  successMessage: string="";
  errorMessage: string=" ";

  constructor(private transactionService: HistoryService,private toastr: ToastrService) {}

  ngOnInit(): void {
    const accountNumberFromStorage = sessionStorage.getItem('accountNumber');
    if (accountNumberFromStorage !== null) {
      this.accountNumber = accountNumberFromStorage;
    } else {
      this.accountNumber = ''; // or any other default value
    }
  }

  fetchTransactions(): void {
    this.transactions = []; // Clear transactions array


    if (this.accountNumber && this.startDate && this.endDate) {
      this.transactionService
        .getTransactionsByDateRange(
          this.accountNumber,
          this.startDate,
          this.endDate,
          this.amount
        )
        .subscribe(
          (data: Transaction[]) => {
            this.transactions = data.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            this.toastr.success('Transactions generated successfully. please check your mail');
          },
          (error: any) => {
            console.error('Error fetching transactions:', error);
            this.toastr.error('Error generating transactions. Please try again.');
          }
        );
    }
  }

}
