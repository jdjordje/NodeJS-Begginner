import { fileURLToPath } from "node:url";
import path from "node:path";
import { Book } from "./src/book.model.js";

export const createPath = pathFragments => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
  
    return path.join(__dirname, ...pathFragments);
  };
  
export const bookDataValidation = (title,author,publicationYear,quantity) =>{
  if (typeof title === "string" && typeof author === "string" && typeof publicationYear === "number" && typeof quantity === "number") {
    return new Book(title, author, publicationYear, quantity)
    
  }
  return `Please insert valid data formats!`;
};
