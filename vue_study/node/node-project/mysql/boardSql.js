const bdsqllist = {
  bdselectList : "select * from board",
  bdselectById : "select * from board where id = ?",
  bdInsertInfo : "insert board (title, writer, content, created_date) values (?,?,?,CURDATE())",
  bdUpdateInfo : "update board set ? where id = ?",
  bdDeleteInfo : "delete from board where id = ?",
}

module.exports = bdsqllist;