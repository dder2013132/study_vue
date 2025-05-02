const cmsqllist = {
  cmselectList : "select * from comment",
  cmselectById : "select * from comment where bid = ?",
  cmInsertInfo : "insert comment (writer, content, created_date, bid) values (?,?,?,CURDATE(),?)",
  cmUpdateInfo : "update comment set ? where id = ?",
  cmDeleteInfo : "delete from comment where id = ?",
}

module.exports = cmsqllist;