import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  data: any;
  responsedata: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      EmailId: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/),
        ],
      ],
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.auth.userLogin(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        if (res.responseCode === 'Login Success') {
          this.responsedata = res.responseMessage;
          sessionStorage.setItem('token', this.responsedata);
          sessionStorage.setItem('accountNumber', res.accountInfo.accountNumber);
          console.log(this.responsedata);
          this.toastr.success('Login success');
          this.router.navigate(['/home']);
        } else {
          Swal.fire('Error', 'Invalid Credentials', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Please fill in all required fields correctly.', 'error'); 
    }
  }
}
