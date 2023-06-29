// melakukan import fungsi dari handler.js
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

// melakukan deklarasi array routes
const routes = [
  // melakukan perintah POST pada /books dengan addBookHandler
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,

  },
  // melakukan perintah GET pada /books dengan getAllBookHandler
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // melakukan perintah GET pada /books dengan getBookByIdHandler
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  // melakukan perintah PUT pada /books dengan editBookByIdHandler
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  // melakukan perintah DELETE pada /books dengan deleteBookByIdHandler
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

// melakukan exports routes agar dapat digunakan oleh berkas lain
module.exports = routes;
