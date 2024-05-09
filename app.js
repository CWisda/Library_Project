console.log("THIS IS MY\n==========\n");

// PROJECT Section
console.log("LIBRARY PROJECT:\n==========\n");

const books = [
 
];

class Book {
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  constructor(books) {
    this.bookCount = books.length;
    this.books = books;
  }

  addBook() {
    // select the inputs form the form - title, author, and read
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const read = document.getElementById("read");

    this.nextId++;
    //create an instance from my book with the input values
    let newBook = new Book(
      this.nextId,
      title.value,
      author.value,
      read.checked
    );

    //push the new book instance into the books array
    this.books.push(newBook);

    //select the table body
    // create new table row
    // create three new table data cells
    //append the tr to the tbody

    const tbody = document.getElementById("tableBody");
    const newTr = document.createElement("tr");
    newTr.classList.add(newBook.id);
    newTr.addEventListener("dblclick", (event) => {
      this.removeBook(newBook.id);
    });
    const newTitle = document.createElement("td");
    const newAuthor = document.createElement("td");
    const newRead = document.createElement("td");

    //
    newTitle.textContent = title.value;
    newAuthor.textContent = author.value;
    const newCheckBox = document.createElement("input");
    newCheckBox.classList.add(newBook.id);
    newCheckBox.type = "checkbox";
    newCheckBox.checked = read.checked;
    newCheckBox.disabled = read.checked;
    newCheckBox.addEventListener("click", (event) => {
      this.markRead(event.target, newBook.id);
    });
    newRead.appendChild(newCheckBox);

    newTr.appendChild(newTitle);
    newTr.appendChild(newAuthor);
    newTr.appendChild(newRead);
    tbody.appendChild(newTr);
  }

  markRead(checkbox, id) {
    this.books.forEach((book) => {
      if (id === book.id) {
        book.read = true;
        checkbox.disabled = true;
      }
    });
  }

  removeBook(bookId) {
    //Reassign the books array filtering out to remove book
    this.books = this.books.filter(({ id }) => bookId !== id);
    //remove the book from the DOM
    const tbody = document.getElementById("tableBody");
    tbody.removeChild(document.getElementsByClassName(bookId)[0]);
  }
}

const library = new Library(books);
if (books.length > 0) {
  library.books.forEach((book) => {
    library.addBook(book);
  });
}
const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  library.addBook();
});

const removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the parent row (tr) of the clicked button
    const row = button.closest("tr");
    // Check if the row is the first row in the table body
    if (
      row.parentElement.tagName === "TBODY" &&
      row.parentElement.rows[0] === row
    ) {
      // Remove the row from the DOM
      row.remove();
    }
  });
});
