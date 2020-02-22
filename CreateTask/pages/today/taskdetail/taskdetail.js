const app = getApp();
const db = wx.cloud.database();//去获取数据库
const collections = db.collection('task');
const util = require('../../../util/util.js');
Component({
  options: {
    addGlobalClass: true,
  },
  data:{
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  lifetimes: {
    attached: function () {
      this.setData({
        loadModal: true
      })
      var id = app.globalData.taskmodelid;
      collections.where({
        _id:id,
      }).get().then(res => {
        this.setData({
          loadModal: false,
          model: res.data[0].data,
        })
      })
    }
  },
  methods: {
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
    changeModel(e){
      this.setData({
        loadModal: true
      })
      collections.doc(app.globalData.taskmodelid).update({
        data: {
          data: {
            isfinish:true
          }
        },
        success: res => {
          this.setData({
            loadModal: false
          })
          wx.redirectTo({
            url: '../../../pages/index/index'
          })
        }, fail: err => {
          console.log(err);
        }
      })
    }
  }
})
