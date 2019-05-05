const express = require('express')
const app = express()
const port = 5000
const uuidv4 = require('uuid/v4');

var BOOKS = [
  {
    'id': uuidv4(),
    'title': 'Strategi Algoritma',
    'author': 'Dr. Rinaldi Munir',
    'read': true
  },
  {
    'id': uuidv4(),
    'title': 'Bahasa C++',
    'author': 'Hans Dulimarta',
    'read': false
  },
  {
    'id': uuidv4(),
    'title': 'Matematika Diskrit',
    'author': 'Dr. Rinaldi Munir',
    'read': true
  }
]

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())

app.get('/books', (req, res) => {
  var response_object = {
    'status': 'success',
    'books': BOOKS
  }
  res.send(JSON.stringify(response_object))
})

app.post('/books', (req, res) => {
  var response_object = {'status': 'success'}
  var post_data = req.body
  BOOKS.push({
    'id': uuidv4(),
    'title': post_data.title,
    'author': post_data.author,
    'read': post_data.read
  })
  response_object['message'] = 'Book added!'
  res.send(JSON.stringify(response_object))
})

app.put('/books/:book_id', (req, res) => {
  var response_object = {'status': 'success'}
  var post_data = req.body
  var book_id = req.params.book_id
  BOOKS[getIndex(book_id)] = {
    'id': uuidv4(),
    'title': post_data.title,
    'author': post_data.author,
    'read': post_data.read
  }
  response_object['message'] = 'Book updated!'
  res.send(JSON.stringify(response_object))
})

app.delete('/books/:book_id', (req, res) => {
  var response_object = {'status': 'success'}
  var book_id = req.params.book_id
  remove_book(book_id)
  response_object['message'] = 'Book removed!'
  res.send(JSON.stringify(response_object))
})

function getIndex(book_id) {
  var bookIndex = BOOKS.findIndex(function(book) {
    return book.id == book_id;
  })
  return bookIndex
}

function remove_book(book_id) {
  var bookIndex = getIndex(book_id)
  if (bookIndex >= 0) {
    BOOKS.splice(bookIndex, 1)
    return true
  }
  return false
}

app.listen(port, () => console.log(`Book manager app listening on port ${port}!`))