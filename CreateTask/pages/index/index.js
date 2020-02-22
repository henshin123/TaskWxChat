const app = getApp();
Page({
  data: {
    PageCur: 'today'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: '今日任务',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})