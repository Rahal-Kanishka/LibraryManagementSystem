import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";
import {Book} from "../models/book.model";
import {Dvd} from "../models/dvd.model";
import {Item} from "../models/item.model";

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  public books: Book[] = [];
  public dvds: Dvd[] = [];
  public items: Item[];
  public dataItems: any[];
  private selected: any;


  constructor(private appService: AppService) {
  }

  ngOnInit() {
    /*  this.appService.getLibraryItems().subscribe((data: any) => {

        console.log(data[1]);
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

        console.log("book: ", this.books);
        console.log("dvd: ", this.dvds);
      });
    }*/
    if (this.appService.getbookStore() != null) {

      this.books = this.appService.getbookStore();
      this.dvds = this.appService.getDVDStore();
      console.log("book: ", this.books);
      console.log("dvd: ", this.dvds);
    } else {
      console.log("Bookstore is empty")
    }
  }

}
