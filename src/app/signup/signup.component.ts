import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
@Injectable({ providedIn: 'root' })
export class SignupComponent {
  reactiveForms: FormGroup;
  isSubmitting = false;
  showPassword = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.reactiveForms = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z]*$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z]*$'),
        ],
      ],
      otherName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$'
          ),
        ],
      ],
      gender: ['', Validators.required],
      address: ['', Validators.required], 
      stateOfOrigin: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^\\d{10}$'),
        ],
      ],
      alternativePhoneNumber: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^\\d{10}$'),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.reactiveForms.markAllAsTouched();
    if (this.reactiveForms.invalid) {
      Swal.fire('validation Error', 'Please enter a valid details', 'error');
      this.isSubmitting = false;
      return;
    }

    this.http
      .post<any>('http://localhost:8080/api/', this.reactiveForms.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.responseCode === 'Account has been successfully created') {
            this.toastr.success('Account created successfully');
            this.router.navigateByUrl('/login');
          } else {
            alert(res.responseCode);
            alert(res.responseMessage);
          }
        },
        error: (err: any) => {
          console.error('An error occurred:', err);
          this.toastr.error('An error occurred. Please try again later.');
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
