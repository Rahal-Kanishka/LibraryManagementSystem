package libraryApi;

import java.util.List;

/**
 * Interface for Library Manager
 */
public interface LibraryManager {

    public List<LibraryItem> getAvailableItems();

    public void addItem(LibraryItem item);

    public void removeByItem(LibraryItem item);

    public void removeByIndex(int index);




}
