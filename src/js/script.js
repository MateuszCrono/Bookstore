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


const templates =  Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML);

class BooksList {
  constructor() {
    const thisBook = this;
    thisBook.initData();
    thisBook.getElements();
    thisBook.render();
    thisBook.filterBook();
    thisBook.initActions();
  }

  initData() {
    const thisBook = this;
    thisBook.data = dataSource.books;
  }

  getElements() {
    const thisBook = this;
    thisBook.filters = [];
    thisBook.favouriteBooks = [];
    thisBook.filteredBook = document.querySelector(select.containerOf.filters);
    thisBook.booksContainer = document.querySelector(select.containerOf.booksList);

  }

  render() {
    const thisBook = this;
    for (let books of thisBook.data) {
      books.ratingBgc = thisBook.DetermineRatingBgc(books.rating);
      books.ratingWidth = books.rating * 10;
      //generate HTML based on template //
      const generatedHTML = templates(books);
      //Create element using utils.createElementfromHTML //
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      // find menu container //
      // const booksContainer = document.querySelector(select.containerOf.booksList);
      //add element to menu //
      thisBook.booksContainer.appendChild(bookElement);
    }
  }

  initActions() {
    const thisBook = this;
    thisBook.booksContainer.addEventListener('dblclick', function(event) {
      event.preventDefault();
      if(event.target.offsetParent.classList.contains('book__image'))
      {
        const EventTargetID = event.target.offsetParent.getAttribute('data-id');
        if (event.target.offsetParent.classList.contains('favorite')) {
          event.target.offsetParent.classList.remove('favorite');
          const BookSplice = thisBook.favouriteBooks.indexOf(EventTargetID);
          thisBook.favouriteBooks.splice(BookSplice, 1);
        }
        else {
          event.target.offsetParent.classList.add('favorite');
          thisBook.favouriteBooks.push(EventTargetID);
        }
      }
    });
    thisBook.filteredBook.addEventListener('click', function(event) {
      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter' ) {
        console.log(event.target.value);
      }
      if (event.target.checked == true) {
        thisBook.filters.push(event.target.value);
      }
      else {
        const checkedSplice = thisBook.filters.indexOf(event.target.value);
        thisBook.filters.splice(checkedSplice, 1);
      }
    });
  }
  filterBook() {
    const thisBook = this;
    for (let books of dataSource.books) {
      let shouldbeHidden = false;
      for (const filter of thisBook.filters) {
        if(!books.details[filter]) {
          shouldbeHidden = true;
          break;
        }
      }
      if (shouldbeHidden = true ) {
        document.querySelector('.book__image[data-id="' + books.id + '"]').classList.add('hidden');
      }
      else {
        document.querySelector('.book__image[data-id="' + books.id + '"]').classList.remove('hidden');
      }
    }
  }

  DetermineRatingBgc(rating) {
    let background = '';
    if (rating<6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    else if(rating >= 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    }
    else if(rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    else if (rating > 9 ) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }

}

const app = {
  init: function(){
    new BooksList();
  }
};
app.init();







