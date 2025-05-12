const cmsqllist = {
  selectcmList : "select * from t_comment_board where bno = ?",
  countcmList : "select count(*) from t_comment_board where bno = ?"
}

module.exports = cmsqllist;