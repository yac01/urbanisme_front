import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BannerModule } from './banner/banner.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './security/auth.interceptor';
import { PaginationIntl } from './shared/pagination-intls';
import { MatPaginatorIntl } from '@angular/material';
import { IssueModule } from './issue/issue.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    BannerModule,
    SharedModule,
    AdminModule,
    LoginModule,
    IssueModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: MatPaginatorIntl, useClass: PaginationIntl }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
