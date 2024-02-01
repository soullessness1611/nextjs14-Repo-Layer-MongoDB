export type IBook = {
  // ... (book properties)
};

export interface IBookService {
  searchBooks(
    filter: Partial<IBook>
  ): Promise<{ data: IBook[]; totalCount: number }>;
}
