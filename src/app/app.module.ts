import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorProviders } from './service/token-interceptor.service';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransactionviewComponent } from './transactionview/transactionview.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './logout/logout.component';
import { PageloaderComponent } from './pageloader/pageloader.component';
import { LoadingInterceptor } from './loading.interceptor';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    HomeComponent,
    TransferMoneyComponent,
    AccountComponent,
    TransactionHistoryComponent,
    TransactionviewComponent,
    LogoutComponent,
    PageloaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ChartModule
  ],
  providers: [
    AuthGuard,
    TokenInterceptorProviders,
    ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
