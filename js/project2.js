console.log("hy thsi");

//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display Construtor
function Display() {

}

//add method to display prototype
Display.prototype.add = function(book){
    console.log("add to UI");
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uiString;
}

//implement the clear function
Display.prototype.clear = function(){
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

//implement the validata function
Display.prototype.validate = function(book){
    if(book.name.length<2 || book.author.length<2)
    {
        return false;
    }
    else
    {
        return true;
    }
}

Display.prototype.show = function(type,displayMessage){
    let message = document.getElementById('message');
    let boldText;
    if(type==='success')
    {
        boldText = "success"
    }
    else
    {
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



// add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("you have submit form");
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
    console.log(book);

    let display = new Display();
    
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success','Your book has been successfully added');
    }
    else
    {
        display.show('danger','Sorry you can not add this book.');
    }
    e.preventDefault();
}