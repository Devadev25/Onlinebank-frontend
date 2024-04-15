import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  constructor(private _router: Router,private auth:AuthService) {}

  // flagVar: boolean = false;
  // ngOnInit(): void {
  //   this.flag();
  // }
  // flag() {
  //   if (sessionStorage.length == 0) this.flagVar = true;
  // }
  // logout() {
  //   sessionStorage.clear();
  //   this.flag();
  //   this._router.navigate(['/login']);
  // }

  ngOnInit(): void{}
  
logout(){
  this.auth.clearAuthToken();
  this._router.navigate(['/login']);
}

}
