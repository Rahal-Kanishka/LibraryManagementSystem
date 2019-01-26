import {Component, Inject} from '@angular/core';
import {Item} from './models/item.model';

import {AppService} from './app.service';
import {Book} from "./models/book.model";
import {Dvd} from "./models/dvd.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {BorrowNameDialog, DialogData} from "./search-items/search-items.component";

export interface DialogData {
  books: Book [];
  dvds: Dvd [];

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  public items: Item [];

  public books: Book [] = [];
  public dvds: Dvd [] = [];
  postRequestResponse: string;


  navLinks = [
    {path: 'view', label: 'ViewItems'},
    {path: 'searchItem', label: 'searchItem'},
    {path: 'addItem', label: 'AddItem'}

  ]

  constructor(private appService: AppService, public dialog: MatDialog) {
    this.appService.getWelcomeMessage().subscribe((data: any) => {
      this.title = data.content;
    });

    this.appService.initializeStores();


  }

  /**
   * This method is used to test the post request
   */
  public postData(): void {
    this.appService.sendData().subscribe((data: any) => {
      this.postRequestResponse = data.content;
    });
  }

  /**
   * Generate the report
   */
  public getReport() {
    //updating the component's values
    this.books = this.appService.getbookStore();
    this.dvds = this.appService.getDVDStore();
    console.log("search Books in,", this.books);
    console.log("search DVD in,", this.dvds);


    const dialogRef = this.dialog.open(ReportDialog, {
      width: '600px',
      height: '450px',
      data: {books: this.books, dvds: this.dvds}
    });
  }
}

@Component({
  selector: 'view-report',
  templateUrl: 'view-report.html',
})
export class ReportDialog {

  constructor(
    public dialogRef: MatDialogRef<ReportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
