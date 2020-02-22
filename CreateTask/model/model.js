class tastmodel 
{
  constructor()
  {
    this.title = "";
    this.owner = "";
    this.releasedate = "";
    this.taskdetails = "";
    this.remarks = "";
    this.isfinish = false;
  }
  Setreleasedate(date)
  {
    this.releasedate = date;
  }
  IsFinish(data)
  {
    this.isfinish = data;
  }
}
module.exports = {
  tastmodel: tastmodel,
};