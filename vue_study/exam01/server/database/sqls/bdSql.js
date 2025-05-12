const bdsqlist = {
  selectbdList : "select * from t_board_board",
  selectbdListByNo : "select * from t_board_board where no = ?",
  insertInfo : "insert t_board_board (title,writer,content,created_dt) values (?,?,?,NOW())",
  updateInfo : "update t_board_board set ? where no = ?",
  deleteInfo : "delete from t_board_board where no = ?"
}

module.exports = bdsqlist;