const model = require('../../../model/model.js');
const util  = require('../../../util/util.js');
const app = getApp();
const db = wx.cloud.database();//去获取数据库
const collections = db.collection('task');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    tastmodel: new model.tastmodel(),
    date: util.getNowTime(),
  },
  //表单输入
  formSubmit: function (e) {
    this.setData({
      loadModal: true
    })
    this.data.tastmodel = e.detail.value;
    this.data.tastmodel.isfinish = false ;
    collections.add({
      data: {
        data: this.data.tastmodel,
        time: util.getNowTime()
      }
    }).then(res => {
      this.setData({
        loadModal: false,
        modalName: null
      })
      this.reload() 
    })
  },
  reload:function()
  {
    wx.redirectTo({
      url:'../../pages/index/index'
    })
  },
  DateChange(e) {
    this.setData({
      date : e.detail.value,
    })
    this.data.tastmodel.releasedate = this.data.date;
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})