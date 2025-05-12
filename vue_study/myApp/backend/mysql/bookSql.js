const sqllist = {
  selectList : "select * from books",
  selectById : "select * from books where id = ?",
  selectByTitle : "select * from books where title LIKE ?",
  selectByAuthor : "select * from books where author LIKE ?",
  selectByPublisher : "select * from books where publisher LIKE ?",
  selectByIsbn : "select * from books where isbn LIKE ?",
  InsertInfo : "insert books (author, description, image_url, isbn, publisher, title) values (?,?,?,?,?,?)",
  UpdateInfo : "update books set ? where id = ?",
  DeleteInfo : "delete from books where id = ?",
}

module.exports = sqllist;