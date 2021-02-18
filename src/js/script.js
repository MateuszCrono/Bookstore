'use strict';

const select = {
  templateOf: {
    booksTemplate: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
    filters: '.filters',
    booksImage: '.book__image'
  },
};
const templates = {
  booksTemplate : Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
};


function DetermineRatingBgc(rating) {
  let background = ''
if (rating<6) {
  background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
}
if(rating >= 6 && rating <= 8) {
  background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
}
if(rating > 8 && rating <= 9) {
  background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
}
if (rating > 9 ) {
  background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
}
return background
}

function render() {
  for (let books of dataSource.books) {

    books.ratingBgc = DetermineRatingBgc(books.rating)
    books.ratingWidth = books.rating * 10;
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
const filteredBook = document.querySelector(select.containerOf.filters);

function initActions() {
  const booksContainer = document.querySelector(select.containerOf.booksList);
  const favouriteBooks = [];
  // const booksImage = booksContainer.querySelectorAll(select.containerOf.booksImage);
  booksContainer.addEventListener('dblclick', function(event) {
    event.preventDefault();
    if(event.target.offsetParent.classList.contains('book__image'))
    {
      const EventTargetID = event.target.offsetParent.getAttribute('data-id');

      if (event.target.offsetParent.classList.contains('favorite')) {

        event.target.offsetParent.classList.remove('favorite');
        const BookSplice = favouriteBooks.indexOf(EventTargetID);
        favouriteBooks.splice(BookSplice, 1);
      }
      else {
        event.target.offsetParent.classList.add('favorite');
        favouriteBooks.push(EventTargetID);
      }
    }

  });
  filteredBook.addEventListener('click', function(event) {

    if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter' ) {
      console.log(event.target.value);
    }
    if (event.target.checked == true) {
      filters.push(event.target.value);
      console.log(filters);
    }
    else {
      const checkedSplice = filters.indexOf(event.target.value);
      filters.splice(checkedSplice, 1);
      console.log(filters);
    }
    filterBook();
  });
}
initActions();


function filterBook() {
  for (let books of dataSource.books) {
    let shouldbeHidden = false;
    for (const filter of filters) {
      if(!books.details[filter]) {
        shouldbeHidden = true;
        break;
      }
    }
    if (shouldbeHidden = true ) {
      document.querySelector('.bookimage[data-id="' + books.id + '"]').classList.add('hidden');
    }
    else {
      document.querySelector('.bookimage[data-id="' + books.id + '"]').classList.remove('hidden');
    }
  }

}





