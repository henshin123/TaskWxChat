function getNowTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  //if (month < 10) {
   // month = '0' + month;
  //};
 // if (day < 10) {
   // day = '0' + day;
  //};
  var formatDate = year + '-' + month + '-' + day;
  return formatDate;
} 
function getbeforeday(dateString)
{
  var sdate = dateString.toString().split('-');
  var date = new Date(sdate[0], sdate[1], sdate[2]); 
  var time = date.getTime() - 24 * 60 * 60 * 1000;
  var yesterday = new Date(time);
  var year = yesterday.getFullYear();
  var month = yesterday.getMonth();
  var day = yesterday.getDate();
  yesterday = year + '-' + month + '-' + day;
  return yesterday;
}

module.exports = {
  getNowTime: getNowTime,
  getbeforeday: getbeforeday
};