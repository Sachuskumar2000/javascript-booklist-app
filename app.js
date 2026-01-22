//Book Class:Represents a book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//Storage class:Handles storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

//UI Class:Handle UI Tasks
class UI{
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
      const list=document.querySelector("#book-list");
      const row=document.createElement('tr');
      row.innerHTML=`
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
      list.appendChild(row);
     
    }
    
    static deletebook(el){
        if (el.classList.contains('delete'))
            {
             el.parentElement.parentElement.remove();
            }
        
    }

    static clearfields()
    {
     document.getElementById('title').value=""
     document.getElementById('author').value=""
     document.getElementById('isbn').value=""
    }

    //Alert Designing
    static showAlert(message,classname){
        
        const div=document.createElement('div')
        div.appendChild(document.createTextNode(message))
        div.className= `alert alert-${classname}`;
        const container =document.querySelector('.container');
        const form =document.getElementById('book-form');
        container.insertBefore(div,form)

        //vanish in 3 seconds
        setTimeout(UI.removealert,2000);

    }


    static removealert()
    {
        document.querySelector('.alert').remove()
    }
}

//Event Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event Add Book

document.getElementById('book-form').addEventListener('submit',(e) =>
{
    //prevent default e
    e.preventDefault();

    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const isbn=document.getElementById('isbn').value;
    
    //Validate the datas
    if(title==='' || author==='' || isbn==='')
    {
        UI.showAlert("Please fill in the fields",'danger');
        return;
    }
    else{
        //Initiate a book
    const book=new Book(title,author,isbn);
    console.log(book);
    UI.addBookToList(book)
    Store.addBook(book);
    UI.showAlert("Booked Added",'success');
    }

    

    //clear field
    UI.clearfields()

})

//Event.remove a book
document.getElementById('book-list').addEventListener('click',(e) =>
{
    UI.deletebook(e.target);
    UI.showAlert("Book Removed",'info');
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})

