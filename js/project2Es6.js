console.log("this is ES6 version of project 2");

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    //add books to UI
    add() {
        let bookName = localStorage.getItem("bookName")
        let bookAuthor = localStorage.getItem("bookAuther")
        let bookType = localStorage.getItem("bookType")
       
        let bookNameObj = [];
        let bookAuthorObj = [];
        let bookTypeObj = [];

        if (bookName == null || bookAuthor == null || bookType == null) {
            bookNameObj = [];
            bookAuthorObj = [];
            bookTypeObj = [];
        } else {
            bookNameObj = JSON.parse(bookName);
            bookAuthorObj = JSON.parse(bookAuthor);
            bookTypeObj = JSON.parse(bookType);
        }

        let uiString = "";
        bookTypeObj.forEach(function (element, index) {
            let tableBody = document.getElementById('tableBody');
            uiString += `<tr>
                                <td>${[index + 1]}</td>
                                <td>${bookNameObj[index]}</td>
                                <td>${bookAuthorObj[index]}</td>
                                <td>${bookTypeObj[index]}</td>
                                <td>  <button id="${index}" onClick="display.deleteBook(this.id)" class="btn btn-primary">Delete</button> </td>
                            </tr>`;
            tableBody.innerHTML = uiString;
        })

        let tableBody = document.getElementById('tableBody');
        if (bookNameObj.length != 0) {
            tableBody.innerHTML = uiString;
        }
        else {
            tableBody.innerHTML = `<h3>Nothing to show! use "Add a Book" section above to add Books.</h2>`;
        }
    }

    deleteBook(index){
    let bookName = localStorage.getItem("bookName")
    let bookAuthor = localStorage.getItem("bookAuther")
    let bookType = localStorage.getItem("bookType")

    let bookNameObj = [];
    let bookAuthorObj = [];
    let bookTypeObj = [];

    if (bookName == null || bookAuthor == null || bookType == null) {
        bookNameObj = [];
        bookAuthorObj = [];
        bookTypeObj = [];
    } else {
        bookNameObj = JSON.parse(bookName);
        bookAuthorObj = JSON.parse(bookAuthor);
        bookTypeObj = JSON.parse(bookType);
    }

    bookNameObj.splice(index, 1);
    bookAuthorObj.splice(index, 1);
    bookTypeObj.splice(index, 1);

    localStorage.setItem("bookName", JSON.stringify(bookNameObj));
    localStorage.setItem("bookAuther", JSON.stringify(bookAuthorObj));
    localStorage.setItem("bookType", JSON.stringify(bookTypeObj));

    display.add();
    console.log("delete");
    }

    saveBooktoLocalStorage(book){
    // my aproch is i create a 3 column in data base that is name auther and type and then i will push value to all the column
        let bookName = localStorage.getItem("bookName")
        let bookAuthor = localStorage.getItem("bookAuther")
        let bookType = localStorage.getItem("bookType")

        let bookNameObj = [];
        let bookAuthorObj = [];
        let bookTypeObj = [];

        if (bookName == null || bookAuthor == null || bookType == null) {
            bookNameObj = [];
            bookAuthorObj = [];
            bookTypeObj = [];
        } else {
            bookNameObj = JSON.parse(bookName);
            bookAuthorObj = JSON.parse(bookAuthor);
            bookTypeObj = JSON.parse(bookType);
        }
        bookNameObj.push(book.name);
        bookAuthorObj.push(book.author);
        bookTypeObj.push(book.type);

        localStorage.setItem("bookName", JSON.stringify(bookNameObj));
        localStorage.setItem("bookAuther", JSON.stringify(bookAuthorObj));
        localStorage.setItem("bookType", JSON.stringify(bookTypeObj));

        display.add();
    }
    // clear text field from UI
    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }
    //check the books is valid or not
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }
    // show message window the books is valid or not
    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = "success"
        }
        else {
            boldText = "Error"
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;
        setTimeout(() => {
            message.innerHTML = "";
        }, 4000);
    }
}


// here to void main function start

// create object to show books 
let display = new Display();
display.add();
// ***********************


// function to add books to local storage with Event Listener
let libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
   
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('auther').value;
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    let display = new Display();

   

    if (display.validate(book)) {
        display.saveBooktoLocalStorage(book);
        display.add();
        display.clear();
        display.show('success', 'Your book has been successfully added');
    }
    else {
        display.show('danger', 'Sorry you can not add this book.');
    }
    e.preventDefault();
}
