package LibraryImplementation;

import libraryApi.LibraryItem;

import java.util.ArrayList;
import java.util.List;

/**
 * Class for BookModel
 */
public class Book extends LibraryItem {

    private List<String> authors = new ArrayList<>();
    private String publisher = null;
    private int totalPages;
    private String type;

    public Book(){
       setType("Book");
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    /**
     * Gets authors.
     *
     * @return the authors
     */
    public String getAuthors() {

        StringBuilder resultBuilder = new StringBuilder();
        System.out.println("authors size: " + authors.size());
        for (String author : this.authors) {
            resultBuilder.append(author).append(",");
        }
        String result = resultBuilder.toString();
        result = result.substring(0, result.length() - 1);
        //removing the last comma
        return result;
    }

    /**
     * Sets authors.
     *
     * @param authors the authors
     */
    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }

    /**
     * Gets publisher.
     *
     * @return the publisher
     */
    public String getPublisher() {
        return publisher;
    }

    /**
     * Sets publisher.
     *
     * @param publisher the publisher
     */
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    /**
     * Gets total pages.
     *
     * @return the total pages
     */
    public int getTotalPages() {
        return totalPages;
    }

    /**
     * Sets total pages.
     *
     * @param totalPages the total pages
     */
    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
