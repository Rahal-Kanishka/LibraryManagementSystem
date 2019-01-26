package LibraryImplementation;

import libraryApi.LibraryItem;


import java.util.ArrayList;
import java.util.List;

/**
 * Class for DVD
 */
public class DVD extends LibraryItem {

    private List<String> availableSubtitles;
    private List<String> availableLanguages;
    private String producer;
    private int totalPages;
    String type;

    public DVD(){

        setType("Dvd");
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    /**
     * Gets available subtitles.
     *
     * @return the available subtitles
     */
    public String getAvailableSubtitles() {

        StringBuilder resultBuilder = new StringBuilder();
        System.out.println("availableSubtitles size: " + availableSubtitles.size());
        for (String subtitle : this.availableSubtitles) {
            resultBuilder.append(subtitle).append(",");
        }
        String result = resultBuilder.toString();
        result = result.substring(0, result.length() - 1);

        return result;
    }

    /**
     * Sets available subtitles.
     *
     * @param availableSubtitles the available subtitles
     */
    public void setAvailableSubtitles(List<String> availableSubtitles) {
        this.availableSubtitles = availableSubtitles;
    }

    /**
     * Gets available languages.
     *
     * @return the available languages
     */
    public String getAvailableLanguages() {

        StringBuilder resultBuilder = new StringBuilder();
        System.out.println("availableLanguages size: " + availableLanguages.size());
        for (String language : this.availableLanguages) {
            resultBuilder.append(language).append(",");
        }
        String result = resultBuilder.toString();
        result = result.substring(0, result.length() - 1);

        return result;
    }

    /**
     * Sets available languages.
     *
     * @param availableLanguages the available languages
     */
    public void setAvailableLanguages(List<String> availableLanguages) {
        this.availableLanguages = availableLanguages;
    }

    /**
     * Gets producer.
     *
     * @return the producer
     */
    public String getProducer() {
        return producer;
    }

    /**
     * Sets producer.
     *
     * @param producer the producer
     */
    public void setProducer(String producer) {
        this.producer = producer;
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
