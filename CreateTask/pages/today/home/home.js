const app = getApp();
const db = wx.cloud.database();//去获取数据库
const collections = db.collection('task');
const util = require('../../../util/util.js');
const imgf = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACxUlEQVRYR8WXS2gTQRjH/7NJ+kqaGJq6aBU3qQapNA9bI1Qq9FCbBAUPgk09eItCjdiCZxW8KbZNQW2vYlYPRUGbRosXi1LFFvHipZroqT3oRREv7sguacxjNzuJhZ3rfPP9f99jXgQGD2KwPmoCcKdPH5OIaZCA9gHgCQEvB0ApNgBsQKKLxIQX2fCDJdbAmACE9EgcoHEQ9DA5plgByGwumprVs68K4M6MhKhEbzMLl6spILiei4qPtUA0ATzPzhyXJOmJXgRM8wRjubA4qWarCiBkYpdAMcHknNGI47gTn4fuPy03rwAQ0rGTIHjE6LcmM0LI4Ww49bZ4kRrAu7prrodDsZKLir2aAEq3Ezqj54d1vsXUhF9/fpeaU3KueHeUZEBIx7Yseq9tN651ncW9r4tIr7/5B1GWhQKAOzPcTyl5yRpdNbsuu4Ck/wI6rTsx+n6qFAAAodJQNvrwueyjACDMD18FR678L4DP4UHSn8CeFh6Ta3OYWpurcElBbn6JpC6XAizEXgGQj9i6x8Ft+xTxjmaXpnje+etcRDxSDrAGoLNY3WpuQrfdjeXvH3WhQs79SAYS4BudeuKyr0+5iLi3BMCdif2gFLZipVMdR3Gj+7yuw762A0rkbQ12XVtFlOBnNiy26gJ4bbtwJzgGj3WHpuN+lw/T/gQcFiuTuCaAsBCrKIFsLJdAhlCr60B7UBGXS6XVcBq1qyyBUKUJe51eBcLV4CgIDW7vwXTgIho5S63iMpNKE+psQ7nOd4PjaDU3Y359GWE+BBPh6hGH6jZkOYgG2gOYCY7DwpmVzNaY9kI1VA8ieZblKA7zhzDhG8XStw+Ir97S3Z4qp1DJhVR2F2ztZaRKV+0yYs1C7WHnV+hdx3kAYx8kCoSRT7LN9Br6KN2EMPRZXtxohn1MyrvdsK9Z3duOYSHT35DBT90mfwGypzUwWpFTpgAAAABJRU5ErkJggg==";
const imgunf = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADBElEQVRYR8WXS8hNURTHf9+E+kLU55VHykSIAROUR8gjkcRAlIFHKUKMMfZMKI+BIsoICXlTMvAoRAaKUJ5FXoUB/W9r39a3v3POPufewV116u691+O/1l57rXXbaDG1tdg+VQD0AiYAU+zrD+gTfbDvFqDvLvCtjHNlAawAtgLDyigFXgHbgWMp/hSAPsBuQABi+gS8sc0hQN8MHgHYBHzJA1IEYBxwHhjghB8AJ4CTwMdIaT9gKbAMkGyg98A8QLJdKA+APHrtuJ8A+4HDqZDa+WpgPTDK8Q91EatvZwFoB247Ly4Di4AfJY0HtoHAFQdCEZgM/PJ6sgAcAVYak7xeV9FwzH4DmGqbR4FVRQCmA1eN4SEwEfjdJIAO0znW9MwArgWdcQTOAvPtcLklXJP2a+JKzOOm6BywIAvASOCpHVwC5jRouaflzz3gp9NxEZgN/LEC9lVnPgLbrNhofwuwswEAcuK0Jd5mYJfTofUOWy8EzsQA7tida18ZrPdbhbxxyakmnHIKVE/e2VrOyclOEXgBDAdU4VRUYpJnIkXqWXQYG1cZFl9M/2xDT3tWDOA70ANQ9vtKFpS8tF6gPFniQJQ1Lj0BgJpXrcL6HEgBWGz3K7kAQr/Dnet3nufBiUIAqSuQkhiE9kK5VcgFoIgKr8Anofp83GyCYg8i7JUxrrxS6EWZSbgWOGAMG4G9Ba54EKmwBzUbgD22UMW9HueAnp4Srbu1zvGJcIb6fjPBF47vW3LrlQ0C/sYAtD4EqJWK1lRovykM0indIrV06a5R3Av0/IRUpEyf6YpHykjeefxMFdn6cJLVjn0UBGJ0o5aB2Hgn77MiEGw9AsbYQnespPtcEUhs/DEQWnJdVdFMGN6smAXoYIWcyBrJMm2lpuILUVvW3Wnm15TzHHhrrgwGRgDT7L+DL+Vqw3PzopcCIDk/olW8BbqMYLGCMgAko8KhKVcDRbcECg0cGmj2+dGrmQh42d42YE6yJA1JpRxRkqmcK2lr004ZKhuBMroa4mk5gP+wJpohmjF7VAAAAABJRU5ErkJggg==";
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
      collections.where({
        data: {
          releasedate: util.getNowTime(),
        }
      }).get().then(res => {
        this.setData({
          loadModal: false,
          tastmodel: res.data,
          imgfinish : imgf,
          imgunfinish : imgunf
        })
      })
    }
  },
  methods: {
    onlineClick: function (e) {
      var id =  e.currentTarget.dataset.id;
      app.globalData.taskmodelid = id;
      wx.navigateTo({//navigateToke加入堆栈，redirectTo只有一个
        url: "/pages/today/taskdetail/taskdetail?id=" +id,
      })
    }
  }
  
})