<template>
  <div class="layout">
    <header>
      <img src="../assets/infibi_logo.png" height="100%" style="padding-left: 20px;">
      <div class="user">
        <!-- 通知圖示 -->
        <!-- <img src="../assets/logo.png" height="100%"> -->
          <!-- <el-badge :value="this.getBadgeNum()" class="badge" :max="30" :hidden="false"> -->
            <!-- <el-dropdown trigger="click"> -->
              <!-- <el-avatar icon="el-icon-bell" @click.native="clickNotice"></el-avatar> -->
              <!-- <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>通知</el-dropdown-item>
                <el-dropdown-item v-for="(notice, index) in fakeNotification" :key="index" @click.native="clickNotice(index)">{{ notice.company_name }}/{{ notice.id }}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown> -->
          <!-- </el-badge> -->

          <el-dropdown trigger="click">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item>Dashboard</el-dropdown-item>
              <!-- <el-dropdown-item>Empty</el-dropdown-item> -->
              <el-dropdown-item divided @click.native="presentLogout">Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>

      <!-- 通知列表 -->
      <!-- <div class="notificationBlock"  v-show="showNotice">
        <div class="notificationHead">
          <h3>通知<i class="el-icon-bell"></i></h3>
        </div>
        <div class="notificationListContainer">
          <div class="notificationContentItem" @click="checkItem(notice)" v-bind:class="{ notificationContentItemCheck : notice.isCheck }" v-for="(notice, index) in fakeNotification" :key="index">
            <div class="notificationContentTitle">
              <h3>{{ notice.company_name }}</h3>
            </div>
            <div>{{ notice.id }}</div>
            <span>2023-01-23 10:34{{ notice.isCheck }}</span>
          </div>
        </div>
      </div> -->

    </header>
    <div class="page">
      <div class="title">
          <el-menu
          default-active="1"
          class="sidebar"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" v-on:click="presentForm">
              <i class="el-icon-menu"></i>
              <span slot="title">客戶管理</span>
          </el-menu-item>
          <el-submenu index="2" class="myItem">
              <template slot="title">
              <i class="el-icon-location"></i>
              <span>權限相關</span>
              </template>
              <el-menu-item-group>
              <template slot="title">權限相關</template>
              <el-menu-item class="myItem" index="1-1" v-on:click="presentAccess">權限管理</el-menu-item>
              <el-menu-item class="myItem" index="1-2" v-on:click="presentPermission">權限設定</el-menu-item>
              </el-menu-item-group>
              <!-- <el-menu-item-group title="分组2">
              <el-menu-item class="myItem" index="1-3">选项3</el-menu-item>
              </el-menu-item-group> -->
          </el-submenu>
          <!-- <el-menu-item index="3" v-on:click="presentForm">
              <i class="el-icon-setting"></i>
              <span slot="title">客戶管理</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="4" v-on:click="presentPermission">
              <i class="el-icon-setting"></i>
              <span slot="title">權限設定</span>
          </el-menu-item> -->
          <el-menu-item index="3" v-on:click="presentHumanRes">
              <i class="el-icon-setting"></i>
              <span slot="title">人員管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="6" v-on:click="presentAccess">
              <i class="el-icon-setting"></i>
              <span slot="title">權限管理</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="4">
              <i class="el-icon-user"></i>
              <span slot="title">登出</span>
          </el-menu-item> -->
          </el-menu>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "HomeView",
  beforeCreate: function() {
    // document.getElementsByTagName("body")[0].setAttribute("style","background-color:#fff");
  },
  components: {
    
  },
  data() {
    return {
      fakeNotification:[],
      showNotice: false,
    }
  },
  mounted() {
    this.getGoodList();
    this.alertBrower();
    // document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    // document.addEventListener('click', this.handleClickOutside);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    presentForm() {
      this.$router.push('/HomeView/CustomerTable');
    },
    presentPermission() {
      this.$router.push('/HomeView/permission');
    },
    presentGridView() {
      this.$router.push('/HomeView/gridview')
    }, 
    presentAccess() {
      this.$router.push('/HomeView/access')
    },
    presentHumanRes() {
      this.$router.push('/HomeView/humanResource')
    },
    async getGoodList(){
      const { data: res } = await this.$http.get('/api/goodslist')
      this.fakeNotification = res.data;
    },
    clickNotice(item) {
      console.log(item)
      // console.log(this.fakeNotification.splice(item,1))
      this.showNotice = !this.showNotice;
    },
    getBadgeNum() {
      let numbers = 0;
      for(let i = 0; i< this.fakeNotification.length; i++){
        if(this.fakeNotification[i].isCheck == false){
          numbers++
        }
      }
      return numbers;
    }, 
    async presentLogout() {
      axios.post('/logout').then(res => {
        this.$store.commit("resetState");
        this.$router.replace('/');
      })
    },
    checkItem(notice) {
      notice.isCheck = true;
    },
    // handleClickOutside(event) {
    //   console.log(this.$el.contains(event.target))
    //   if(!(this.$el.contains(event.target) || this.$el == event.target)){
    //     this.showNotice = false
    //   }
    // },
    getBroswer(){
      var sys = {};
      var ua = navigator.userAgent.toLowerCase();
      // console.log(ua)
      var s;
      (s = ua.match(/edg\/([\d.]+)/)) ? sys.edg = s[1] :
      (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
      (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
      (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
      (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
      (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
      (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
      // console.log(sys)

      if (sys.edg) return { broswer : "Edge", version : sys.edg };
      if (sys.ie) return { broswer : "IE", version : sys.ie };
      if (sys.firefox) return { broswer : "Firefox", version : sys.firefox };
      if (sys.chrome) return { broswer : "Chrome", version : sys.chrome };
      if (sys.opera) return { broswer : "Opera", version : sys.opera };
      if (sys.safari) return { broswer : "Safari", version : sys.safari };
      
      return { broswer : "", version : "0" };
    },
    alertBrower() {
      var tmp = this.getBroswer();
      console.log(tmp)
      // alert("broswer:" + tmp.broswer +"_"+ "version:" + tmp.version )
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
}
.page {
  // height: calc(100vh - 60px);
  display: flex;
  .title {
    width: 150px;
    height: 100%;
    p {
      font-size: 50px;
      color: #510a0a;
    }
  }
}
.sidebar {
  width: 100%;
  min-height: calc(100vh - 60px);
  border-right: none ;
}

header {
  display: flex;
  height: 60px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

.user{
  position: absolute;
  height: inherit;
  right: 5px;
  top: 10px;
}
.myItem{
  min-width: 150px;
  padding: 0;
}
.badge {
  // top: 10px;
  position: absolute;
  right: 60px;
}
.notificationBlock {
  display: block;
  position: absolute;
  height: auto;
  top: 70px;
  width: 300px;
  background-color: white;
  right: 60px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  z-index: 999;
}
.notificationHead {
  padding: 18px 19px 17px 19px;
  vertical-align: middle;
  min-height: 15px;
  border-bottom: 1px solid #dddfe7;

}
.notificationListContainer {
  max-height: 424px;
  overflow-y: auto;
  overflow-x: hidden;
  cursor: pointer;
}
.notificationContentItem {
  display: flex;
  flex-direction: column;
  // align-items: center;
  background-color: rgba(14, 134, 254, 0.05);
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
}
.notificationContentTitle {
  color: #43434B;
  font-size: 14px;
  line-height: 20px;
  width: 255px;
  display: block;
}
.notificationContentItemCheck {
  background-color: white;
}
</style>
