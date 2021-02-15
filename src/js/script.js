'use strict';

const select = {
templateOf: {
  booksTemplate: "#template-book",
},
containerOf: {
  booksList: ".books-list"
},
};
const templates = {
  booksTemplate : Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
};
function render() {
  for (let books of dataSource.books) {

    //generate HTML based on template //
  const generatedHTML = templates.booksTemplate(books);
  //Create element using utils.createElementfromHTML //
  const bookElement = utils.createDOMFromHTML(generatedHTML);
  // find menu container //
  const booksContainer = document.querySelector(select.containerOf.booksList);
  //add element to menu //
    booksContainer.appendChild(bookElement);

  }
}

render();

const favouriteBooks = [];

function initActions() {
  const booksContainer = document.querySelector(select.containerOf.booksList);
  const bookImage = booksContainer.querySelectorAll('.book__image')
  for (let image of bookImage) {
    image.addEventListener('dblclick', function(event) {
      event.preventDefault();
      if(!image.classList.contains('favorite')) {
      image.classList.add('favorite')
      const bookData = image.getAttribute('data-id')
      favouriteBooks.push(bookData)
      console.log('test')
      }
      else {
      image.classList.remove('favorite')
      const bookData = image.getAttribute('data-id')
      const bookID = favouriteBooks.indexOf(bookData)
      favouriteBooks.splice(bookID, 1);
      }
    });
    }
  }


initActions();
console.log('favouriteBooks', favouriteBooks);
