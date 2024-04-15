import { Component, OnInit } from '@angular/core';
import { Transaction } from '../Interface/history';
import { TransactionviewService } from '../service/transactionview.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transactionview',
  templateUrl: './transactionview.component.html',
  styleUrls: ['./transactionview.component.css'],
})
export class TransactionviewComponent implements OnInit {
  transactions: Transaction[] = [];
  accountNumber: string = '';
  startDate: string = '';
  endDate: string = '';


  constructor(private transactionService: TransactionviewService,private toastr: ToastrService) {}

  ngOnInit(): void {
    const accountNumberFromStorage = sessionStorage.getItem('accountNumber');
    if (accountNumberFromStorage !== null) {
      this.accountNumber = accountNumberFromStorage;
    } else {
      this.accountNumber = ''; // or any other default value
    }
  }

  fetchTransactions(): void {
    if (this.accountNumber && this.startDate && this.endDate) {
      this.transactionService
        .getTransactionsByDateRange(
          this.accountNumber,
          this.startDate,
          this.endDate
        )
        .subscribe(
          (data: Transaction[]) => {
            this.transactions = data.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            this,this.toastr.success("Transactions fetched successfully");
          },
          (error: any) => {
            console.error('Error fetching transactions:', error);
            this.toastr.error('Error fetching transactions:', error);
          }
        );
    }
  }
}
