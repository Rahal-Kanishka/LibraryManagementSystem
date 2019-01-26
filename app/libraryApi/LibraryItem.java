package libraryApi;

import LibraryImplementation.Reader;

import java.util.Date;

/**
 * abstract class for LibraryItem
 */
public abstract class LibraryItem {

    private String ISBN;
    private String title;
    private Date publicationDate;
    private Date borrowedTime;
    private Date borrowedDate;
    private Reader currentReader;
    private boolean availability;

    /**
     * Is availability boolean.
     *
     * @return the boolean
     */
    public boolean isAvailability() {
        return availability;
    }

    /**
     * Sets availability.
     *
     * @param availability the availability
     */
    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    /**
     * Gets isbn.
     *
     * @return the isbn
     */
    public String getISBN() {
        return ISBN;
    }

    /**
     * Sets isbn.
     *
     * @param ISBN the isbn
     */
    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    /**
     * Gets title.
     *
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets title.
     *
     * @param title the title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets publication date.
     *
     * @return the publication date
     */
    public Date getPublicationDate() {
        return publicationDate;
    }

    /**
     * Sets publication date.
     *
     * @param publicationDate the publication date
     */
    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    /**
     * Gets borrowed time.
     *
     * @return the borrowed time
     */
    public Date getBorrowedTime() {
        return borrowedTime;
    }

    /**
     * Sets borrowed time.
     *
     * @param borrowedTime the borrowed time
     */
    public void setBorrowedTime(Date borrowedTime) {
        this.borrowedTime = borrowedTime;
    }

    /**
     * Gets borrowed date.
     *
     * @return the borrowed date
     */
    public Date getBorrowedDate() {
        return borrowedDate;
    }

    /**
     * Sets borrowed date.
     *
     * @param borrowedDate the borrowed date
     */
    public void setBorrowedDate(Date borrowedDate) {
        this.borrowedDate = borrowedDate;
    }

    /**
     * Gets current reader.
     *
     * @return the current reader
     */
    public Reader getCurrentReader() {
        return currentReader;
    }

    /**
     * Sets current reader.
     *
     * @param currentReader the current reader
     */
    public void setCurrentReader(Reader currentReader) {
        this.currentReader = currentReader;
    }
}
