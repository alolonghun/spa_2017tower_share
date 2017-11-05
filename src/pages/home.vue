<template>
  <div>
    <div class="head_img">
      <img :src="headImg">
    </div>
    <div class="temp_top">
      <div class="intro">{{ introText }}</div>
      <div class="dianji" @click="dropDown">
        <span class="font" v-if="click.showFont">点击展开了解大会议程</span>
        <span class="font" v-else>点击收起了解大会议程</span>
        <span class="icon" v-if="click.showIcon"></span>
        <span class="icon_two" v-else></span>
      </div>
    </div>
    <div class="temp_center" v-if="click.showTemp">
      <div class="content" v-html="tempContent"></div>
    </div>
    <div class="temp_bottom">
      <div class="jion_us"></div>
      <div class="check_form">
        <label class="check">
          <input class="checking check_name" type="text" placeholder="您的姓名" v-model="name" autofocus>
        </label>
        <label class="check">
          <input class="checking check_phone" type="text" placeholder="您的手机号" v-model="phone">
        </label>
        <!--<label class="check">-->
          <!--<input class="checking check_code" type="text" placeholder="验证码" v-model="code">-->
          <!--<span></span>-->
          <!--<input class="btn_code" type="button" :value="codeText" @click="getCode" :disabled="checkable">-->
        <!--</label>-->
        <button class="btn" @click="allSubmit">立即加入</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data () {
    return {
      time: 60,
      nowTime: 0,
      checkable: false,
      name: '',
      phone: '',
      click: {
        showTemp: false,
        showFont: true,
        showIcon: true
      },
      headImg: '',
      introText: '',
      tempContent: ''
    }
  },
  mounted () {
    var $this = this;
    this.getInfo();
    $this.axios({
        url: '/2017tower/share/get_share_mini_info',
        method: 'post',
        data: {
          id: parseInt($this.getUrl('id'))
        },
        transformRequest: [function(data) {
          let ret = '';
          for (let i in data) {
            ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
          }
          return ret;
        }]
      })
      .then(function(res) {
        console.log(res.data.data);
        //微信初始化
        $this.axios({
            url: '/xzdd/getUrlConfig',
            method: 'get',
            dataType: 'json',
            params: {
              url: window.location.href.substring(0, window.location.href.lastIndexOf('#'))
            }
          }).then(function(data) {
            if (data && !data.code) {
              $this.$md.WXConfigInit(data.data, window.location.href, res.data.data.friend_title, res.data.data.title, res.data.data.content, res.data.data.img);
            } else {
              console.log(data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  computed: {
    codeText () {
      return this.nowTime > 0 ? this.nowTime + "秒" : "获取验证码";
    },
    errors () {
      return this.$vuerify.$errors;
    }
  },
  vuerify: {
    phone: {
      test: /^1(3|4|5|7|8)\d{9}$/,
      message: '请填写正确的手机号'
    }
  },
  methods: {
    getInfo () {
      var $this = this;
      $this.axios({
        url: '/2017tower/share/get_share_info',
        method: 'post',
        data: {
          id: parseInt($this.getUrl('id'))
          // id: 1
        },
        transformRequest: [function(data) {
          let ret = '';
          for (let i in data) {
            ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
          }
          return ret;
        }]
      })
        .then(function(res) {
          $this.headImg = res.data.data.img;
          $this.introText = res.data.data.text;
          $this.tempContent = res.data.data.content;
        })
        .catch(function(err) {
          console.log(err);
        });      
    },
    dropDown () {
      this.click.showTemp = !this.click.showTemp;
      this.click.showFont = !this.click.showFont;
      this.click.showIcon = !this.click.showIcon;
    },
    getCode () {
      const $this = this;
      if(this.$vuerify.check()) {
        this.nowTime = this.time;
        this.checkable = !this.checkable;
        this.getTime();
      } else {
        Toast({
          message: $this.errors.phone,
          duration: 2000,
          iconClass: 'mint-toast-icon mintui mintui-field-warning'
        });
      }
    },
    getTime () {
      const $this = this;
      if($this.nowTime > 0) {
        $this.nowTime--;
        setTimeout(() => {
          $this.getTime();
        }, 1000)
      } else {
        this.checkable = !this.checkable;
      }
    },
    allSubmit () {
      var $this = this;
      if($this.name != '' && $this.$vuerify.check()) {
        $this.axios({
          url: '/2017tower/share/bao_ming',
          method: 'post',
          data: {
            cid: parseInt($this.getUrl('id')),
            name: $this.name,
            mobile: $this.phone
          },
          transformRequest: [function(data) {
            let ret = '';
            for (let i in data) {
              ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
          }]
        })
          .then(function(res) {
            console.log(res);
            $this.$router.push({
              name:'success',
              query:{
                userName: $this.name
              }
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        console.log($this.$vuerify);
        console.log($this.name);
        Toast({
          message: '请填写完整信息',
          duration: 2000,
          iconClass: 'mint-toast-icon mintui mintui-field-warning'
        });
      }
    },
    getUrl (name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null) {
        return unescape(r[2])
      }; 
      return null;
    }
  }
}
</script>

<style lang="less" scoped>
.head_img {
  width: 100%;
  img {
    width: 100%;
  }
}
.temp_top {
  width: 100%;
  background: url("../images/temp_top_bg.jpg") 0 0 no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  .intro {
    width: 6.2rem;
    text-align: justify;
    margin-top: .4rem;
    line-height: .42rem;
    padding: 0 .05rem .3rem;
    border-bottom: 1px solid #ccc;
  }
  .dianji {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: .3rem;
    .font {
      padding: .3rem 0;
      font-size: .3rem;
    }
    .icon, .icon_two {
      width: .59rem;
      height: .76rem;
      animation: run 1.1s linear infinite;
      &.icon {
        background: url("../images/icon/down_arrow.png") 0 0 no-repeat;
        background-size: 100%;
      }
      &.icon_two {
        background: url("../images/icon/top_arrow.png") 0 0 no-repeat;
        background-size: 100%;
      }
    }
    @keyframes run {
      0% { transform: translateY(0); }
      50% { transform: translateY(.2rem); }
      100% { transform: translateY(0); }
    }
  }
}
.temp_center {
  width: 100%;
  background: url("../images/temp_center_bg.jpg") 0 0 repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  .content {
    width: 90%;
  }
}
.temp_bottom {
  width: 100%;
  height: 6.74rem;
  background: url("../images/temp_bottom_bg.jpg") 0 0 no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .jion_us {
    width: 3.17rem;
    height: .79rem;
    background: url("../images/join_us.png") 0 0 no-repeat;
    background-size: 100%;
    margin-top: .5rem;
  }
  .check_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: .6rem;
    .check {
      width: 5.2rem;
      height: .74rem;
      background: #fff;
      border-radius: 20px;
      padding: 0 .45rem;
      overflow: hidden;
      margin-bottom: .4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .checking {
        width: 100%;
        height: 100%;
        border: none;
        font-size: .3rem;
        &::-webkit-input-placeholder {
          line-height: normal;
          color: #666;
        }
        &.check_code {
          width: 3rem;
        }
      }
      span {
        width: 1px;
        height: .54rem;
        background: #ccc;
      }
      .btn_code {
        width: 1.5rem;
        height: 100%;
        border: none;
        background: #fff;
        color: #666;
      }
    }
    .btn {
      width: 6.2rem;
      height: .74rem;
      background: url("../images/join_btn.png") 0 0 no-repeat;
      background-size: 100%;
      border: none;
      color: #fff;
      text-align: center;
      line-height: .74rem;
      font-size: .36rem;
      outline: none;
    }
  }
}
</style>
