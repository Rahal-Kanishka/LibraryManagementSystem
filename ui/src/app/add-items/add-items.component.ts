import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "../app.service";
import {Book} from "../models/book.model";
import {Dvd} from "../models/dvd.model";
import {logger} from "codelyzer/util/logger";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {

  itemForm: FormGroup;
  private book: Book;
  private dvd: Dvd;
  selectedValue: any;
  availability: any;
  private _snackBarMessage: string;
  public spaceCount: number;

  selections = [{value: '1', viewValue: 'Book'},
    {value: '2', viewValue: 'Dvd'}
  ];

  availabilityOptions = [{value: true, viewValue: 'Avaialable'},
    {value: false, viewValue: 'Unavailable'}
  ];

  selected: any;

  constructor(
    private formBuilder: FormBuilder, public appService: AppService, public snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required, Validators.minLength(6)],
      author: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.spaceCount = this.appService.getAvailableSpace();
    console.log("space count: ", this.spaceCount);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  onClear() {
    this.appService.formGroup.reset();
    this.appService.initializeFormGroup();
  }


  onSubmit() {
    this.appService.calculateAvailableSpace();
    this.spaceCount = this.appService.getAvailableSpace();

    if (this.appService.formGroup.valid && this.appService.getAvailableSpace() < 150) {
      console.log("value: ", this.appService.formGroup.controls['type'].value)
      if (this.appService.formGroup.controls['type'].value == "1") {

        if (this.appService.getBookAvailableSpace() < 100) {

          this.book = new Book();
          //book item
          this.book.title = this.appService.formGroup.controls["title"].value;
          this.book.pdate = this.appService.formGroup.controls["pdate"].value;
          this.book.reader = this.appService.formGroup.controls['reader'].value;
          this.book.authors = this.appService.formGroup.controls['author'].value;
          this.book.publisher = this.appService.formGroup.controls['publisher'].value;
          this.book.totalPages = this.appService.formGroup.controls['totalPages'].value;
          this.book.availability = this.appService.formGroup.controls['availability'].value;
          console.log("created book", this.book);
          this.appService.addBook(this.book);
        } else {

          this._snackBarMessage = "BOOK: " + this.appService.formGroup.controls['title'].value + " addition failed due to lack of space";
          this.openSnackBar(this._snackBarMessage, "Okay");
        }

      } else if (this.appService.getDVDAvailableSpace() < 50) {
        this.dvd = new Dvd();
        this.dvd.title = this.appService.formGroup.controls['title'].value;
        this.dvd.pdate = this.appService.formGroup.controls['pdate'].value;
        this.dvd.reader = this.appService.formGroup.controls['reader'].value;
        this.dvd.producer = this.appService.formGroup.controls['producer'].value;
        this.dvd.availability = this.appService.formGroup.controls['availability'].value;

        console.log("created dvd", this.dvd);
        this.appService.addDVD(this.dvd);

      } else {
        this._snackBarMessage = "DVD: " + this.appService.formGroup.controls['title'].value + " addition Failed!";
        this.openSnackBar(this._snackBarMessage, "Okay");
      }
      this._snackBarMessage = "Item: " + this.appService.formGroup.controls['title'].value + " added successfully";
      this.openSnackBar(this._snackBarMessage, "Okay");
    } else {
      this._snackBarMessage = "Item: " + this.appService.formGroup.controls['title'].value + " addition Failed!";
      this.openSnackBar(this._snackBarMessage, "Okay");
      console.log("invalid form. item space: ", this.appService.getAvailableSpace())
    }

    this.appService.calculateAvailableSpace();
    this.spaceCount = this.appService.getAvailableSpace();

  }

}
