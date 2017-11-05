<template>
  <div class="contain">
    <transition name="fade">
      <div class="mask" v-if="showMe">
        <div class="prompt"></div>
      </div>
    </transition>
    <div class="slogan"></div>
    <div class="des">我们会尽快与您取得联系</div>
    <div class="name">尊敬的{{ name }}</div>
    <div class="content">
      您是第<span>{{ ranking }}</span>名申请参加<br>校长邦TOWER教育创新大会<br>暨第六届全球教育产业博览会的校长<br>10.29 上海不见不散<br><br>校长邦TOWER教育创新大会<br>今天就是未来<br>立足于教育机构运营现实的大会<br>立足于民办教育创业者的大会<br>TOWER是专注内容的大会<br>我们没有观点<br>我们只有干货和经验
    </div>
    <input class="btn" type="button" value="邀请好友参加" @click="showMask"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ranking: '',
      name: '',
      showMe: false
    }
  },
  beforeDestroy () {
    $('.btn').attr('disabled', false);
    $("html, body").css("overflow", "auto");
  },
  mounted () {
    var $this = this;
    this.getInfo();
    this.name = this.$route.query.userName;
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
              $this.$md.WXConfigInit(data.data, window.location.href.substring(0, window.location.href.lastIndexOf('#')), res.data.data.friend_title, res.data.data.title, res.data.data.content, res.data.data.img);
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
  methods: {
    getUrl(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2])
      };
      return null;
    },
    showMask () {
      this.showMe = !this.showMe;
      $('.btn').attr('disabled', true);
      $("html, body").css("overflow", "hidden");
    },
    getInfo () {
      const $this = this;
      $this.axios({
        url: '/2017tower/share/get_ranking',
        method: 'get',
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
          $this.ranking = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="less" scoped>
.contain {
  width: 100%;
  height: 14.51rem;
  background: url("../images/success_bg.jpg") 0 0 no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: #000;
    opacity: .85;
    &.fade-enter-active, .fade-leave-active {
      transition: opacity .5s linear;
    }
    &.fade-enter, .fade-leave-to {
      opacity: 0
    }
    .prompt {
      width: 4.49rem;
      height: 4.43rem;
      background: url("../images/info.png") 0 0 no-repeat;
      background-size: 100%;
      position: absolute;
      right: 1.1rem;
      top: .8rem;
    }
  }
  .slogan {
    width: 4.87rem;
    height: 1.23rem;
    background: url("../images/application_succuss.png") 0 0 no-repeat;
    background-size: 100%;
    margin-top: 2.68rem;
  }
  .des {
    font-size: .36rem;
    margin-top: .15rem;
  }
  .name {
    width: 6.58rem;
    height: .75rem;
    background: url("../images/yellow_bar.png") 0 0 no-repeat;
    background-size: 100%;
    line-height: .75rem;
    font-size: .36rem;
    color: #000;
    margin: .4rem 0 .3rem;
  }
  .content {
    font-size: .32rem;
    line-height: .5rem;
    span {
      font-weight: bold;
      font-size: .5rem;
      margin: 0 .1rem;
      color: #ffbe01;
    }
  }
  .btn {
    width: 6.2rem;
    height: .74rem;
    background: url("../images/join_btn.png") 0 0 no-repeat;
    background-size: 100%;
    border: none;
    color: #fff;
    line-height: .74rem;
    font-size: .36rem;
    outline: none;
    margin-top: .6rem;
  }
}
</style>
