import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { transferService } from '../service/transaction.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {
  transferRequest: any = {
    sourceAccountNumber: '',
    destinationAccountNumber: '',
    amount: 0
  };
  errorMessage: string = '';
  transferForm!: FormGroup; // Initialize with '!' to indicate it will be defined in ngOnInit

  constructor(private fb: FormBuilder, private transferService: transferService,private toastr: ToastrService) {}

  ngOnInit(): void {
    // Initialize the transfer form using FormBuilder
    this.transferForm = this.fb.group({
      destinationAccountNumber: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onTransfer(): void {
    if (this.transferForm && this.transferForm.valid) {
      const transferRequest = {
        sourceAccountNumber: sessionStorage.getItem('accountNumber'),
        destinationAccountNumber: this.transferForm.value.destinationAccountNumber,
        amount: this.transferForm.value.amount,
      };
      this.transferService.transferMoney(transferRequest).subscribe(
        (response: any) => {
          console.log('Transfer successful:', response);
          this.toastr.success('Transfer successful');
          this.transferForm.reset(); 
        },
        (error: { error: { message: string } }) => {
          this.toastr.error("n error occurred during the transfer.")
        }
      );
    } else {
    //   this.errorMessage = 'Please fill in all required fields correctly.';
    this.toastr.error("Please fill in all required fields correctly.");
    }
  }
}
