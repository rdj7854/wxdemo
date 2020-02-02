// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowpindao:false,
    
    height:100,
    channels:[
      {name:'推荐',id:'tuijian',data:[]},
      {name:'热点',id:'redian',data: [] },
      {name:'本地',id:'bendi',data: [] },
      {name:'社会',id:'shehui',data: [] },
      {name:'娱乐',id:'yule', data: [] },
      {name:'军事',id:'junshi', data: [] },
      {name:'科技',id:'keji', data: [] },
      {name:'汽车',id:'qiche', data: [] },
      {name:'体育',id:'tiyu', data: [] },
    ],
    otherchannels: [
      { name: '电影', id: 'dianying', data: [] },
      { name: '健身', id: 'jianshen', data: [] },
      { name: '教育', id: 'jiaoyu', data: [] },
      { name: '同城', id: 'tongcheng', data: [] },
      { name: '漫画', id: 'manhua', data: [] },
      { name: '广州', id: 'guangzhou', data: [] },
      { name: '深圳', id: 'shenzhen', data: [] },
      { name: '编不下', id: 'bianbuxia', data: [] },
      { name: '去了', id: 'qule', data: [] },
    ],
    activechannel:'tuijian',
  },


  showpindao:function(){
    this.setData({ isShowpindao:true})
     },

  hidepindao:function(){
    this.setData({ isShowpindao: false })
  },
  //点击切换频道
  clickchangechannel:function(e){
    
    //获取当前频道的ID
    var id=e.currentTarget.dataset.id;
   
    //设置当前频道的ID
    this.setData({ activechannel:id});
    

   //获取当前频道的下标
    var index = e.currentTarget.dataset.index;
    console.log(index);
    //检测当前频道是否有数据
    if(this.data.channels[index].data.length ==0){
      var that =this;
      //如果没有数据，请求数据
      wx.request({
        url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
        success(res) {
          console.log(res.data);
          var key = 'channels[' + index+'].data';
          that.setData({[key] : res.data.data})
        }
      })
    }

  },
   
   //滑动切换频道
  swiperchangechannel:function(e){
  //获取滑动频道的id
    var id =e.detail.currentItemId;
    //设置正在浏览的频道id
    this.setData({ activechannel:id})

    var itemid=e.detail.currentItemId;
    var index=0;
    //遍历所有的频道，获取当前频道的索引
    for(var i =0;i<this.data.channels.length;i++){
      if(this.data.channels[i].id == itemid){
        index=i;
      }
    }
    //检查当前的频道有没有数据
    if (this.data.channels[index].data.length == 0) {
      var that = this;
      //如果没有数据，请求数据
      wx.request({
        url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
        success(res) {
          console.log(res.data);
          var key = 'channels[' + index + '].data';
          that.setData({ [key]: res.data.data })
        }
      })
    }

  },


  //点击移除频道
  clickremovechannel:function(e){
     //获取当前频道的ID
    var id=e.currentTarget.dataset.id;
    //获取当前频道的下标
    var index = e.currentTarget.dataset.index;
   console.log(index)
    for(var i=0;i<this.data.channels.length;i++){
      if(this.data.channels[i]==index){
        channels.splice(index,1);
      }
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置屏幕高度
    var height = wx.getSystemInfoSync().windowHeight-45;
    this.setData({height:height});
    //接受this指向
    var that=this;
    //请求数据
    wx.request({
      url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
      success(res){
        console.log(res.data);
        that.setData({'channels[0].data':res.data.data})

      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})