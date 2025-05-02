const sqllist = {
  selectList : "select * from customers",
  selectById : "select * from customers where id = ?",
  insertInfo : "insert customers (name,email,phone) values (?,?,?)",
  updateInfo : "update customers set ? where id = ?",
  deleteInfo : "delete from customers where id = ?",
}

module.exports = sqllist;