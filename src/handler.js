// melakukan import nanoid dan books dari books.js
const { nanoid } = require('nanoid');
const books = require('./books');

// melakukan penentuan fungsi addBookHandler yang menerima request dan h sebagai parameter
const addBookHandler = (request, h) => {
  // melakukan destructure nilai
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // melakukan validasi untuk memastikan nama buku tidak kosong
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // melakukan validasi untuk memastikan nilai readPage tidak lebih besar dari nilai pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // melakukan pembuatan id acak menggunakan nanoid
  const id = nanoid(16);
  // melakukan penetapan nilai finished berdasarkan nilai pageCount dan nilai readPage yang sama
  const finished = pageCount === readPage;
  // melakukan penetapan nilai insertedAt ke waktu saat ini
  const insertedAt = new Date().toISOString();
  // melakukan penetapan nilai updateAt dengan pengaturan yang sama dengan insertedAt
  const updatedAt = insertedAt;

  // melakukan pembuatan newBook dengan menggunakan nilai yang ter-destructure
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // melakukan penambahan objek newBook ke dalam books
  books.push(newBook);

  // melakukan pemeriksaan newBook berhasil ditambahkan dengan memfilter berdasarkan Id
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // melakukan pengiriman respons apakah buku berhasil ditambahkan atau tidak
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// melakukan penetapan fungsi getAllBooksHandler yang menerima request dan h sebagai parameter
const getAllBooksHandler = (request, h) => {
  // melakukan destructure nilai dari request query
  const {
    name,
    reading,
    finished,
  } = request.query;
  // melakukan respons array books kosong jika array books kosong
  if (books.length === 0) {
    const response = h.response({
      status: 'success',
      data: {
        books: [],
      },
    });
    response.code(200);
    return response;
  }

  // melakukan inisialisasi variabel filterBook dengan seluruh data buku
  let filterBook = books;

  // melakukan filter data berdasarkan name yang dicari apabila name dikirimkan
  if (typeof name !== 'undefined') {
    filterBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  // melakukan filter data berdasarkan status reading apabila data reading dikirimkan
  if (typeof reading !== 'undefined') {
    filterBook = books.filter((book) => Number(book.reading) === Number(reading));
  }

  // melakukan filter data berdasarkan status finished apabila data finished dikirimkan
  if (typeof finished !== 'undefined') {
    filterBook = books.filter((book) => Number(book.finished) === Number(finished));
  }

  // melakukan deklarasi listBook berdasarkan map filterBook
  const listBook = filterBook.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  // melakukan deklarasi respons berdasarkan status dan data yang berisi listBook
  const response = h.response({
    status: 'success',
    data: {
      books: listBook,
    },
  });
  response.code(200);
  return response;
};

// melakukan penetapan fungsi getBookByIdHandler yang menerima request dan h sebagai parameter
const getBookByIdHandler = (request, h) => {
  // melakukan deklarasi id dari request
  const { id } = request.params;

  // melakukan pencarian data buku berdasarkan Id
  const book = books.filter((b) => b.id === id)[0];

  // melakukan pengembalian respons status dan data objek buku apabila data buku ditemukan
  if (typeof book !== 'undefined') {
    const response = h.response({
      status: 'success',
      data: { book },
    });
    response.code(200);
    return response;
  }

  // melakukan pengembalian respons fail dan pesan error apabila data buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// melakukan penetapan fungsi editBookByIdHandler yang menerima request dan h sebagai parameter
const editBookByIdHandler = (request, h) => {
  // melakukan deklarasi id dari request
  const { id } = request.params;

  // melakukan destructure nilai
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // melakukan inisialisasi updateAt dengan waktu saat ini
  const updatedAt = new Date().toISOString();

  // melakukan inisialisasi index buku dengan findIndex
  const index = books.findIndex((book) => book.id === id);

  // melakukan validasi untuk memastikan nama buku tidak kosong
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // melakukan validasi untuk memastikan nilai readPage tidak lebih besar dari nilai pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // melakukan pengembalian respons sukses dan pesan berhasil apabila index buku ditemukan
  if (index !== -1) {
    // melakukan inisialisasi finished berdasarkan apabila pageCount dan readPage bernilai sama
    const finished = pageCount === readPage;

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // melakukan pengembalian respons fail dan pesan eror apabila index buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// melakukan penetapan fungsi deleteBookByIdHandler yang menerima request dan h sebagai parameter
const deleteBookByIdHandler = (request, h) => {
  // melakukan deklarasi id dari request
  const { id } = request.params;

  // melakukan inisialisasi index buku dengan findIndex
  const index = books.findIndex((book) => book.id === id);

  // melakukan delete book dan mengembalikan respons success apabila index buku ditemukan
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // melakukan pengembalian respons fail dan pesan error apabila index buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// melakukan export beberapa objek dibawah ini agar dapat diakses oleh berkas lain
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
