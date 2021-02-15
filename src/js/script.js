'use strict';

const select = {
templateOf: {
  booksTemplate: "#template-book",
},
containerOf: {
  booksList: ".books-list",
  filters: ".filters"
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
const filters = [];

function initActions() {
  const booksContainer = document.querySelector(select.containerOf.booksList);
  const booksImage = booksContainer.querySelectorAll('.book__image')
  // for (let image of bookImage) {
    booksImage.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      const BookData = clickedElement.getAttribute('data-id')
      if (!clickedElement.classList.contains('favorite')) {
        clickedElement.classList.add('favorite');
        favouriteBooks.push(BookData);
      }
      else {
        clickedElement.classList.remove('favorite');
        favouriteBooks.splice(indexOF(BookData), 1);
      }
      });
    }



initActions();
console.log('favouriteBooks', favouriteBooks);

