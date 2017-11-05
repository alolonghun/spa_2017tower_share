<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import './../node_modules/mint-ui/lib/style.css';
@import './styles/_reset.less';
@import './styles/reset.css';

#app {
  font-family: 'Microsoft Yahei UI', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: .24rem;
}
</style>
