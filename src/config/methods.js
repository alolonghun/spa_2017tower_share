export default {
  WXConfigInit: function(weixinObj, url, friendTitle, title, desc, imgUrl) {
    console.log(JSON.stringify(weixinObj));
    wx.config({
      debug: false, // 开启调试模式
      appId: weixinObj.data.appId, // 必填，公众号的唯一标识
      timestamp: weixinObj.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: weixinObj.data.noncestr, // 必填，生成签名的随机串
      signature: weixinObj.data.signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem']
    });
    wx.ready(function() {
      console.log("微信回调成功");
      wx.hideMenuItems({
        menuList: [
          "menuItem:editTag",
          "menuItem:copyUrl",
          "menuItem:readMode",
          "menuItem:openWithSafari",
          "menuItem:share:email",
          "menuItem:share:qq",
          "menuItem:share:QZone"
        ]
      });
      // wx.showMenuItems({
      //   menuList: [
      //     "menuItem:copyUrl"
      //   ]
      // });
      wx.onMenuShareTimeline({
        title: friendTitle || '校长邦嘉宾分享',
        link: url,
        imgUrl: imgUrl || '',
        success: function() {
        },
        cancel: function() {
        }
      });

      wx.onMenuShareAppMessage({
        title: title || '校长邦嘉宾分享', // 分享标题
        desc: desc || '描述', // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl || '', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          Toast({
            message: "分享成功",
            duration: 1500,
            iconClass: 'mint-toast-icon mintui mintui-success'
          });
        },
        cancel: function() {
          Toast({
            message: '分享取消',
            duration: 1500,
            iconClass: 'mint-toast-icon mintui mintui-field-error'
          });
        }
      });
    });
  }
}
