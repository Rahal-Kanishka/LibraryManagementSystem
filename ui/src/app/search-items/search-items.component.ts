///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from "../app.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder} from "@angular/forms";
import {Book} from "../models/book.model";
import {Dvd} from "../models/dvd.model";


export interface DialogData {
  borrowerName: string;

}

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent implements OnInit {

  public books: Book[] = [];
  public dvds: Dvd[] = [];
  selections = [{value: '1', viewValue: 'Book'},
    {value: '2', viewValue: 'Dvd'}
  ];
  selectedType: any;
  itemTitle: any;
  itemBorrowerName: String;
  private _snackBarMessage: string;

  constructor(public appService: AppService, public snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.books = this.appService.getbookStore();
    this.dvds = this.appService.getDVDStore();
    console.log("search Books in,", this.books);
    console.log("search DVD in,", this.dvds)
  }

  onSubmit() {

    if (this.appService.searchFormGroup.valid) {

    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }


  openDialog(type: String, title: String): void {
    console.log("Borrowing Item: ", type, title);
    const dialogRef = this.dialog.open(BorrowNameDialog, {
      width: '250px',
      data: {name: this.itemBorrowerName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. result: ', result);
      this.itemBorrowerName = result;

      if (this.itemBorrowerName != null) {
        if (type == 'Book') {
          this.appService.borrowBook(title, this.itemBorrowerName);
        } else {
          this.appService.borrowDVD(title, this.itemBorrowerName);
        }
        this._snackBarMessage = title + " borrowed by " + this.itemBorrowerName + " successfully";
        this.openSnackBar(this._snackBarMessage, "OK");
        //updating the component's values
        this.books = this.appService.getbookStore();
        this.dvds = this.appService.getDVDStore();
        console.log("search Books in,", this.books);
        console.log("search DVD in,", this.dvds);
      } else {
        console.log("Didn't provide any borrower's name")
        this._snackBarMessage = "Didn't provide any borrower's name";
        this.openSnackBar(this._snackBarMessage, "Okay");
      }

    });


  }

  /**
   * returning any given item
   *
   * @param {String} type
   * @param {String} title
   */
  returnItem(type: String, title: String) {


    if (type == 'Book') {
      this.appService.returnBook(title);
    } else {
      this.appService.returnDVD(title);
    }

    this._snackBarMessage = title + " Returned successfully";
    this.openSnackBar(this._snackBarMessage, "OK");
    //updating the component's values
    this.books = this.appService.getbookStore();
    this.dvds = this.appService.getDVDStore();
    console.log("search Books in,", this.books);
    console.log("search DVD in,", this.dvds);
  }

  /**
   *Deleting a given Item and updating the values
   *
   * @param {String} type
   * @param {String} title
   */
  deleteItem(type: String, title: String) {

    this.appService.deleteItem(type, title);

    this._snackBarMessage = title + " Deleted successfully";
    this.openSnackBar(this._snackBarMessage, "OK");
    //updating the component's values
    this.books = this.appService.getbookStore();
    this.dvds = this.appService.getDVDStore();
    console.log("search Books in,", this.books);
    console.log("search DVD in,", this.dvds);
  }

}


@Component({
  selector: 'borrow-item-name-input',
  templateUrl: 'borrow-item-name-input.html',
})
export class BorrowNameDialog {

  constructor(
    public dialogRef: MatDialogRef<BorrowNameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


