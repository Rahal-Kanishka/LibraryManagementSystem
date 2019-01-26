import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent, ReportDialog} from './app.component';
import {RouteExampleComponent} from './route-example/route-example.component';

import {AppService} from './app.service';
import {AppHttpInterceptorService} from './http-interceptor.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatInputModule,
  MatTabsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
  MatGridListModule,
  MatDividerModule,
  MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatRadioModule, MatDialogModule
} from '@angular/material';
import {ViewItemsComponent} from './view-items/view-items.component';
import {AddItemsComponent} from './add-items/add-items.component';
import {BorrowNameDialog, SearchItemsComponent} from './search-items/search-items.component';


const routes: Routes = [
  {
    path: 'java',
    component: RouteExampleComponent,
    data: {technology: 'Java'}
  },
  {
    path: 'play',
    component: RouteExampleComponent,
    data: {technology: 'Play'}
  },
  {
    path: 'angular',
    component: RouteExampleComponent,
    data: {technology: 'Angular'}
  },
  {path: 'view', component: ViewItemsComponent},
  {path: 'searchItem', component: SearchItemsComponent},
  {path: 'addItem', component: AddItemsComponent},
  {
    path: '**',
    redirectTo: '/play',
    pathMatch: 'full'
  }


];

@NgModule({
  declarations: [
    AppComponent,
    RouteExampleComponent,
    ViewItemsComponent,
    AddItemsComponent,
    SearchItemsComponent,
    BorrowNameDialog,
    ReportDialog

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatToolbarModule, MatInputModule, MatTabsModule, MatFormFieldModule,
    MatSelectModule, MatCardModule, MatGridListModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule, MatRadioModule, MatDialogModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'Csrf-Token',
      headerName: 'Csrf-Token',
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AppService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [BorrowNameDialog,ReportDialog]
})
export class AppModule {
}
