package controllers;

import LibraryImplementation.Book;
import LibraryImplementation.DVD;
import LibraryImplementation.Reader;
import com.fasterxml.jackson.databind.JsonNode;
import libraryApi.WestminsterLibraryManager;
import play.libs.Json;
import play.mvc.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class AppSummary {
    private String content;


    AppSummary(String content) {
        this.content = content;


    }


    AppSummary() {

    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


}

public class HomeController extends Controller {

    static WestminsterLibraryManager manager = null;
    AppSummary appSummary = new AppSummary();

    public WestminsterLibraryManager getLibarayManager() {
        return this.manager;
    }

    public Result appSummary() {
        JsonNode jsonNode = Json.toJson(new AppSummary("Library System"));
        return ok(jsonNode).as("application/json");
    }

    public Result postTest() {
        JsonNode jsonNode = Json.toJson(new AppSummary("Post Request Test => Data Sending Success"));
        return ok(jsonNode).as("application/json");
    }

    /**
     * getting the available library items and sending as a json
     *
     * @return
     */
    public Result getAvailableItems() {
        //if there is no any managers available create a instance and instantiate data
        if (manager == null) {
            this.manager = new WestminsterLibraryManager();

            Reader reader = new Reader();
            reader.setName("Rahal Reader");

            Reader reader2 = new Reader();
            reader2.setName("Ravindu Reader");

            Book book = new Book();
            book.setTitle("Mother");
            book.setPublisher("rahal");
            book.setTotalPages(100);
            book.setISBN("isbn100");
            book.setAuthors(Arrays.asList("maxim gorky"));
            book.setCurrentReader(reader);
            book.setAvailability(false);
            manager.addItem(book);

            Book book2 = new Book();
            book2.setTitle("Men are from Mars");
            book2.setPublisher("HarperCollins");
            book2.setTotalPages(100);
            book2.setISBN("isbn100");
            book2.setAuthors(Arrays.asList("John Gray"));
            book2.setCurrentReader(reader2);
            book2.setAvailability(false);
            manager.addItem(book2);

            DVD dvd = new DVD();
            dvd.setProducer("James Cameron");
            dvd.setTitle("Avatar");
//            dvd.setCurrentReader(reader);
            dvd.setAvailableLanguages(Arrays.asList("English", "Sinhala", "Tamil"));
            dvd.setAvailableSubtitles(Arrays.asList("English", "Sinhala", "Tamil"));
            dvd.setAvailability(true);

            manager.addItem(dvd);

            DVD dvd2 = new DVD();
            dvd2.setProducer("John Woo");
            dvd2.setTitle("Mission Impossible");
            dvd2.setCurrentReader(reader);
            dvd2.setAvailableLanguages(Arrays.asList("English"));
            dvd2.setAvailableSubtitles(Arrays.asList("English", "Sinhala", "Tamil"));
            dvd2.setAvailability(false);
            manager.addItem(dvd2);
        }


        JsonNode jsonNode = Json.toJson(this.getLibarayManager().getItemList());
        return ok(jsonNode).as("application/json");
    }

    public Result addItem() {

        JsonNode jsonNode = Json.toJson(this.getLibarayManager().getAvailableItems());
        return ok(jsonNode).as("application/json");
    }

    public Result searchByTitle() {
        JsonNode jsonNode = Json.toJson(this.getLibarayManager().getAvailableItems());
        return ok(jsonNode).as("application/json");
    }
}
