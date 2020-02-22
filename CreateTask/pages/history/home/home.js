const app = getApp();
const db = wx.cloud.database();//去获取数据库
const util = require('../../../util/util.js');
const collections = db.collection('task');
const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACc0lEQVRYR+2WT2gTQRTGv7cJQtXiqRfpbqpiQT3pxSIe2ptJ8E+UQEWb3V6EHiwInryknounSsBDbDaKBSuK2mzsQRJBq57UUhRBSbtp0aMHaQ+y+2SSIDZ/NxuDgpnTMjPv+358M7xZwl8e5Nbfr5qTYPhYsmJPEruybnVcARzTcoMSezLClIFsWleG/h+AcHhpy/eu7hNEFAPQIxKQvLiYiitLblJwfAR+bXWA2BoDEAKou4pZjoGH29fpyuysvOEUxhFAMJI/z2RfB2hHSXgRTO8A+ysDB4hoP4A+sUagp8RQ55LymhOIhgCByMoEiKIlsQ8k4VJqWpkvFw+q5mUGJovztOixrVOPb/XlGkHUBfBHlg8SSc8BbAXzVSPpm6gneHJ0Tf5hW2aRAXeMhHKuNQDVnCFgGESvjYQ80EhMrAdGcocheV4VGJjHU0nfVL26mgkER5b3sSS9LxSzdNxI9s45AShA/Do2emPo8iFXAAHN1MCYFsWW1bVz/nbPF6cAQc0cZsYMgHVDV7a5AgiqZoyBMQbyaV1RnJoXE1jtB9kfxbfXS3sfxeVPteprHoFfNTMEDLpttQHVZGFqkzVU763oAHQS6CTw7yZQaKel0egRqtZkApF8VHQBW7KzrvpAM52vlb2bjiCorlxg0I1WBGu3XHqZ0uUj5eubAbSVMDPdbQeA0DR0peLOVUyIX+52ANS6Bw1/ycphkg/4MwNvy+cZWNBCdK1Z+KYB9Pt8E4TRCgAbR7Uz9KLtAPF7vNvrQRpA/29mU2qIxps1F/ubTkAURTPs3fMNZ22gV2IsRE7TMzfmrgHcmlWrc5XAnwT4CQ45KjCXvn2CAAAAAElFTkSuQmCC";
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true
  },
  lifetimes: {
    attached : function() {
      let list = [{}];
      var date = util.getNowTime();
      for (let i = 0; i < 30; i++) {
        if(i==0) 
        {
          list[i] = {};
          list[i].date = date;
          list[i].id = i;
        }
        else
        {
          list[i] = {};
          list[i].date = util.getbeforeday(list[i - 1].date);
          list[i].id = i;
        }

      }
      this.setData({
        list: list,
        modelDate: util.getNowTime()
      })
      this.setData({
        loadModal: true
      })
      collections.where({
        data: {
          releasedate: util.getNowTime(),
        }
      }).get().then(res => {
        this.setData({
          loadModal: false,
          modellist: res.data,
          imgbase64: img
        })
      })
    },
  },
  methods: {
    tabSelect(e) {
      this.setData({
        loadModal: true
      })
      collections.where({
        data: {
          releasedate: this.data.list[e.currentTarget.dataset.id].date,
        }
      }).get().then(res => {
        this.setData({
          loadModal: false,
          modellist: res.data,
        })
      })
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50,
        modelDate: this.data.list[e.currentTarget.dataset.id].date,
      })
    },
    change(e)
    {
      var id = e.currentTarget.dataset.id;//获取view中的药用currentTarget
      app.globalData.taskmodelid = id;
      wx.navigateTo({
        url: '/pages/history/change/change?id=' + id,
      })
    },
  },
})