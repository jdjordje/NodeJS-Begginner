import { createPath, bookDataValidation } from "./utils.js";
import { DataService } from "./src/data.service.js";
import { Book } from "./src/book.model.js";
import { logger } from "./src/log.service.js";

const BOOK_PATH = createPath([`data`, `books.json`]);

//Get all books

const getBooks = async () => {
  const books = await DataService.readJSONFile(BOOK_PATH);

  return books;
};

//Save a book

const saveBook = async (book) => {
  const books = await DataService.saveJSONFile(BOOK_PATH, book);
};

//Add new book

const addBook = async (title, author, publicationYear, quantity) => {
  const books = await getBooks();

  const newBook = bookDataValidation(title, author, publicationYear, quantity);

  const updatedBook = [...books, newBook];

  await saveBook(updatedBook);
  //logger.emit("book-added", newBook);
};

//Listing books

const listBook = async () => {
  const books = await getBooks();
  const list = books.map((book) => `${book.title} by ${book.author} is available in ${book.quantity} copies`).join(",");
  console.log(`At this moement we have the fololowing books:`, list);
};

//Book data edit

const bookDataEdit = async (bookId, newTitle, newAuthor, newPublicationYear, newQuantity) => {
  const books = await getBooks();

  const findId = books.find((book) => book.id === bookId);

  if (!findId) throw new Error(`Book not found in our database!`);

  const updatedBook = books.map((book) => {
    if (book.id === bookId) {
      return { ...book, title: newTitle, author: newAuthor, publicationYear: newPublicationYear, quantity: newQuantity };
    } else {
      return book;
    }
  });
  await saveBook(updatedBook);
//logger.emit("book-edited", bookId);
};

//Delete book by Id

const deleteBook = async (bookId) => {
  const books = await getBooks();

  const findId = books.find((book) => book.id === bookId);

  if (!findId) throw new Error(`Book not found in our database!`);

  const newList = books.filter((book) => book.id !== bookId);

  if (newList.length === books.length) throw new Error(`Book not found in our database!`);

  await saveBook(newList);
  //logger.emit("book-deleted", bookId);
};

const app = async () => {
  try {
   //await addBook("STRIssdNG", "STRING", 13234, 12);
    //   const books = await getBooks();
    //   console.log(books)
    await bookDataEdit('db0131d7-cd49-42ed-b56f-7b3510832b55', `Lord of the Rings`, `asdasdad`, 2222, 2);
    // await deleteBook(`286ed3b3-ae1c-44b7-bcb1-0d2b3f3c2b42`);
    const getAll = await getBooks();
    console.log(getAll);
  } catch (error) {
    console.error(error);
  }
};

app();
