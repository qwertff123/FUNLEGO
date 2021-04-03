<template>
  <div id="app">
    <div class="aside">
      <aside-bar></aside-bar>
    </div>
    <div class="nav">
      <nav-bar></nav-bar>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
//引入左侧菜单栏组件
import asideBar from "@/components/aside";
//引入导航栏组件
import navBar from "@/components/nav";
export default {
  data(){
    return {
      
    }
  },
  components : {
    asideBar,
    navBar
  },
  methods : {
    edit(){
      console.log("修改了")
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/assets/css/iconfont.css";
#app{
  background-color:rgb(248,249,254);
  height:100vh;
  position: relative;
}
#app .aside{
  position:fixed;
  width:30vh;
  height:100%;
  background-color:#fff;
  margin-right:15px;
  font-size:16px;
}
#app .nav{
  height:60px;
  width:calc(99% - 30vh);
  background-color:white;
  float:right;
}
#app .main{
  width:calc(99% - 30vh);
  height:calc(100% - 60px);
  /* background-color:rgb(228, 246, 247); */
  position:absolute;
  right:0px;
  padding:0 15px;
  padding-top:20px;
  box-sizing: border-box;
  bottom:0;
}
</style>
