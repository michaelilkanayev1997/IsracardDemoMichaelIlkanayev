import { Book } from "@/types/Book";
import { SortOption } from "@/components/SortMenu";

export type FilterMode = "title" | "title+description";

export const filterBooks = (
  books: Book[],
  debounced: string,
  mode: FilterMode = "title+description"
): Book[] => {
  if (!books?.length) return [];
  const query = debounced.toLowerCase().trim();
  if (!query) return books;

  switch (mode) {
    case "title":
      return books.filter((book) => book.title.toLowerCase().includes(query));
    case "title+description":
    default:
      return books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query)
      );
  }
};

export const sortBooks = (books: Book[], sortBy: SortOption): Book[] => {
  if (!books?.length) return [];

  return [...books].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "pages":
        return a.pages - b.pages;
      case "date":
        return (
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
      default:
        return 0;
    }
  });
};
