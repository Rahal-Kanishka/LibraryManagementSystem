package libraryApi;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import LibraryImplementation.Book;
import LibraryImplementation.DVD;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import play.libs.Json;
import scala.util.parsing.json.JSONArray;

public class WestminsterLibraryManager implements LibraryManager {

    private List<LibraryItem> itemList = new ArrayList<LibraryItem>();

    public List<LibraryItem> getItemList() {
        return itemList;
    }

    /**
     * get the available items in the library
     *
     * @return the item list
     */
    @Override
    public List<LibraryItem> getAvailableItems() {

        ArrayList<LibraryItem> books = new ArrayList();
        ArrayList<LibraryItem> dvds = new ArrayList<>();

        for (LibraryItem item : this.itemList) {
            if (item instanceof Book) {

                Book bookItem = (Book) item;
//                ObjectNode book = Json.newObject();
//                book.put("title", bookItem.getTitle());
//                book.put("isbn", bookItem.getISBN());
//                book.put("reader", bookItem.getCurrentReader().getName());
//                book.put("authors", bookItem.getAuthors());
//                book.put("publisher", bookItem.getPublisher());
//                book.put("pages", bookItem.getTotalPages());
//                book.put("pdate", new Date().toString());

                books.add(bookItem);
                System.out.println("book instance added");
            } else if (item instanceof DVD) {

                DVD dvdItem = (DVD) item;
//                ObjectNode dvd = Json.newObject();
//                dvd.put("title", dvdItem.getTitle());
//                dvd.put("producer", dvdItem.getProducer());
//                dvd.put("pdate", new Date().toString());
//                dvd.put("reader", dvdItem.getCurrentReader().getName());
//                dvd.put("subtitles", dvdItem.getAvailableSubtitles());
//                dvd.put("languages", dvdItem.getAvailableLanguages());

                dvds.add(dvdItem);
                System.out.println("dvd instance added");
            }
        }

//        ObjectNode libraryItems = Json.newObject();
//        libraryItems.putArray("books").addAll(books);
//        libraryItems.putArray("dvds").addAll(dvds);
//        String result = libraryItems.toString();

//        JsonObject jobj = new JsonObject();
//        jobj.add("books", new Gson().toJsonTree(books));
//        jobj.add("dvds", new Gson().toJsonTree(dvds));

// merge Map firstObject and secondObject as you want, see this post

//        String resultJson = new Gson().toJson(resultMap);
//        String json = gson.toJson(this.itemList);
//        String json = jobj.toString();


        //  System.out.println("items: " + json);

//        return json;
        return books;
    }

    /**
     * Add item to available Item List
     *
     * @param item
     */
    @Override
    public void addItem(LibraryItem item) {

        this.itemList.add(item);

    }

    /**
     * remove the item using item object instance
     *
     * @param item
     */
    @Override
    public void removeByItem(LibraryItem item) {

        this.itemList.remove(item);
    }

    /**
     * remove the item using item index value
     *
     * @param index
     */
    @Override
    public void removeByIndex(int index) {
        this.itemList.remove(index);
    }
}
