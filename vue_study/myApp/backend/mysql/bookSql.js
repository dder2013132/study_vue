const sqllist = {
  selectList : "select * from books",
  selectById : "select * from books where id = ?",
  selectByTitle : "select * from books where title = ?",
  selectByAuthor : "select * from books where author = ?",
  selectByPublisher : "select * from books where publisher = ?",
  selectByIsbn : "select * from books where isbn = ?",
  InsertInfo : "insert books (author, description, id, image_url, isbn, publisher, title) values (?,?,?,?,?,?,?)",
  UpdateInfo : "update books set ? where id = ?",
  DeleteInfo : "delete from books where id = ?",
}

module.exports = sqllist;