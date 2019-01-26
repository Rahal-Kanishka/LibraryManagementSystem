import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup, FormControl, Validators} from "@angular/forms";

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {Item} from "./models/item.model";
import {Dvd} from "./models/dvd.model";
import {Book} from "./models/book.model";
import {Reader} from "./models/reader.model";

/**
 * Class representing application service.
 *
 * @class AppService.
 */
@Injectable()
export class AppService {

  private serviceUrl = '/api/summary';
  private dataPostTestUrl = '/api/postTest';
  private getLibraryItemsUrl = '/api/items';
  public itemStore: Observable<Item[]>;

  public dataItems: any[];
  public books: Book [] = [];
  public dvds: Dvd [] = [];
  public availableSpaces: number = 0;
  public bookAvailableSpaces: number;
  public dvdAvailableSpaces: number;
  public currentReader: Reader;

  constructor(private http: HttpClient) {
  }


  formGroup: FormGroup = new FormGroup({

    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    author: new FormControl(''),
    reader: new FormControl(''),
    type: new FormControl(0, Validators.required),
    pdate: new FormControl('', Validators.required),
    availability: new FormControl(''),
    producer: new FormControl(''),
    publisher: new FormControl(''),
    description: new FormControl(''),
    totalPages: new FormControl('')
  });

  searchFormGroup: FormGroup = new FormGroup({

    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    author: new FormControl(''),
    reader: new FormControl(''),
    type: new FormControl(0, Validators.required),
    pdate: new FormControl('', Validators.required),
    availability: new FormControl(''),
    producer: new FormControl(''),
    publisher: new FormControl(''),
    description: new FormControl(''),
    totalPages: new FormControl('')
  });

  /**
   * to use it to clear and reinitialize the values for the form
   */
  initializeFormGroup() {
    this.formGroup.setValue({
      $key: null,
      title: '',
      author: '',
      reader: '',
      type: 0,
      pdate: '',
      availability: '',
      producer: '',
      publisher: '',
      description: '',
      totalPages: ''

    });
  }

  initializeSearchoup() {
    this.searchFormGroup.setValue({
      $key: null,
      title: '',
      author: '',
      reader: '',
      type: 0,
      pdate: '',
      availability: '',
      producer: '',
      publisher: '',
      description: '',
      totalPages: ''

    });
  }

  calculateAvailableSpace() {
    if ((this.books != null) || (this.dvds != null)) {
      this.availableSpaces = 0;
      this.availableSpaces = this.availableSpaces + this.books.length;
      this.availableSpaces = this.availableSpaces + this.dvds.length;
    }
    console.log("spaces filled: ", this.availableSpaces);
  }

  getAvailableSpace(): number {
    return this.availableSpaces;
  }

  getBookAvailableSpace(): number {
    return this.books.length;
  }

  getDVDAvailableSpace(): number {
    return this.dvds.length;
  }


  /**
   * Makes a http get request to retrieve the welcome message from the backend service.
   */
  public getWelcomeMessage() {
    return this.http.get(this.serviceUrl).pipe(
      map(response => response)
    );
  }


  public getLibraryItems(): Observable<Item[]> {
    this.itemStore = this.http.get<Item[]>(this.getLibraryItemsUrl);
    return this.itemStore;
  }

  /**
   * Makes a http post request to send some data to backend & get response.
   */
  public sendData(): Observable<any> {
    return this.http.post(this.dataPostTestUrl, {});
  }

  /**
   * fill the Books and DVD store
   */
  public initializeStores() {

    this.getLibraryItems().subscribe((data: any) => {
      this.dataItems = data;

      this.dataItems.forEach(item => {

        if (item != null) {
          console.log(item.type);

          if (item.type == "Book") {
            this.books.push(item);
          } else if (item.type == "Dvd") {
            this.dvds.push(item);
          }
        }

      });

      console.log("bookStore: ", this.books);
      console.log("dvdStore: ", this.dvds);
      this.calculateAvailableSpace();
    });


  }

  public getbookStore(): Book[] {
    return this.books;
  }

  public getDVDStore(): Dvd[] {
    return this.dvds;
  }

  public addBook(book: Book) {
    this.books.push(book);
  }

  public addDVD(dvd: Dvd) {
    this.dvds.push(dvd);
  }

  /**
   * borrowing a book
   *
   * @param {String} title
   * @param {String} borrowersName
   */
  public borrowBook(title: String, borrowersName: String) {
    if (this.books != null) {
      this.books.forEach(book => {
        if (book.title == title && book.availability == true) {

          this.currentReader = new Reader();
          this.currentReader.name = borrowersName;
          book.currentReader = this.currentReader;
          book.availability = false;
          console.log("book ", book.title, " updated");
        }
      });
    } else {
      console.log("Couldn't borrow Book, since Book's unavailable");
    }
  }

  /**
   * borrowing a book
   *
   * @param {String} title
   * @param {String} borrowersName
   */
  public borrowDVD(title: String, borrowersName: String) {

    if (this.dvds != null) {
      this.dvds.forEach(dvd => {
        if (dvd.title == title && dvd.availability == true) {
          this.currentReader = new Reader();
          this.currentReader.name = borrowersName;
          dvd.currentReader = this.currentReader;
          dvd.availability = false;
          console.log("dvd ", dvd.title, " updated,reader: ", dvd.currentReader);
        }
      });
    } else {
      console.log("Couldn't borrow DVD, since DVD's unavailable.");
    }
  }

  /**
   * Returning a book
   *
   * @param {String} title
   * @param {String} borrowersName
   */
  public returnBook(title: String) {
    if (this.books != null) {
      this.books.forEach(book => {
        if (book.title == title && book.availability == false) {

          book.currentReader = null;
          book.availability = true;
          console.log("book ", book.title, " updated, availability: ", book.availability);
        }
      });
    } else {
      console.log("Couldn't Return Book, since Book's unavailable");
    }
  }


  /**
   * Returning a book
   *
   * @param {String} title
   * @param {String} borrowersName
   */
  public returnDVD(title: String) {

    if (this.dvds != null) {
      this.dvds.forEach(dvd => {
        if (dvd.title == title && dvd.availability == false) {
          this.currentReader = new Reader();

          dvd.currentReader = null; //removing the current reader since it's returning
          dvd.availability = true;
          console.log("dvd ", dvd.title, " updated,availability: ", dvd.availability);
        }
      });
    } else {
      console.log("Couldn't Return DVD, since DVD's unavailable.");
    }
  }

  /**
   * delete item for given type
   *
   * @param {String} type
   * @param {String} title
   */
  public deleteItem(type: String, title: String) {

    if (type == "Book") {
      const index = this.books.findIndex(book => book.title == title);
      this.books.splice(index, 1);
      console.log("After Book removed: ", this.books);

    } else if (type == "Dvd") {
      const index = this.dvds.findIndex(book => book.title == title);
      this.dvds.splice(index, 1);
      console.log("After Dvd removed: ", this.dvds);
    }
  }

}
