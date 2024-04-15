import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';

import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { AuthGuard } from './guard/auth.guard';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransactionviewComponent } from './transactionview/transactionview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transactionhistory',
    component: TransactionHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transfermoney',
    component: TransferMoneyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transferview',
    component: TransactionviewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
