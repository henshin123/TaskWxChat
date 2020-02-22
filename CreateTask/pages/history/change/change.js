const app = getApp();
const db = wx.cloud.database();//去获取数据库
const collections = db.collection('task');
const util = require('../../../util/util.js');
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
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
        _id: id,
      }).get().then(res => {
        this.setData({
          loadModal: false,
          model: res.data[0].data,
          date: res.data[0].data.releasedate,
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
    DateChange(e) {
      this.setData({
        date: e.detail.value,
      })
      this.data.tastmodel.releasedate = this.data.date;
    },
    //表单输入
    formSubmit: function (e) {
      this.setData({
        loadModal: true
      })
      this.data.tastmodel = e.detail.value;
      console.log(this.data.tastmodel);
      collections.doc(app.globalData.taskmodelid).update({
        data: {
          data: this.data.tastmodel,
        }
      }).then(res => {
        this.setData({
          loadModal: false,
          modalName: null
        })
      })
    },
  }
})
