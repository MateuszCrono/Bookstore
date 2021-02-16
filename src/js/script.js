'use strict';

const select = {
  templateOf: {
    booksTemplate: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
    filters: '.filters'
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

const filters = [];
const favouriteBooks = [];

  function initActions() {
    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage = booksContainer.querySelectorAll('.book__image');
    for (let image of booksImage) {
      image.addEventListener('dblclick', function(event) {
        if (!image.classList.contains('favorite')) {
        event.preventDefault();
        image.classList.add('favorite')
        const bookData = image.getAttribute('data-id')
        console.log(bookData);
        favouriteBooks.push(bookData) }
        else {
          event.preventDefault();
          image.classList.remove('favorite')
          const bookData = image.getAttribute('data-id')

          const BookSplice = favouriteBooks.indexOf(bookData)
          favouriteBooks.splice(BookSplice, 1);
          console.log('favouriteBooks', favouriteBooks);
        }
      });
    }

  }
initActions();


