<template>
  <div class="layout">
    <header>
      <img src="../assets/infibi_logo.png" height="100%">
      <div class="user">
        <!-- <img src="../assets/logo.png" height="100%"> -->
          <el-dropdown trigger="click">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item>Dashboard</el-dropdown-item>
              <el-dropdown-item>Empty</el-dropdown-item>
              <el-dropdown-item divided @click.native="presentLogout">Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
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
          <el-menu-item index="1" @click="() => { this.$router.push('DashBoard'); }">
              <i class="el-icon-menu"></i>
              <span slot="title">首頁</span>
          </el-menu-item>
          <el-submenu index="2">
              <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
              </template>
              <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
          </el-submenu>
          <el-menu-item index="3" v-on:click="presentForm">
              <i class="el-icon-setting"></i>
              <span slot="title">表格</span>
          </el-menu-item>
          <el-menu-item index="4" v-on:click="presentPermission">
              <i class="el-icon-setting"></i>
              <span slot="title">權限</span>
          </el-menu-item>
          <el-menu-item index="5" v-on:click="presentGridView">
              <i class="el-icon-setting"></i>
              <span slot="title">卡片</span>
          </el-menu-item>
          <el-menu-item index="6">
              <i class="el-icon-user"></i>
              <span slot="title">登出</span>
          </el-menu-item>
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
    document.getElementsByTagName("body")[0].setAttribute("style","background-color:#fff");
  },
  components: {
    
  },  
  data() {
    return {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    presentForm() {
      this.$router.push('/HomeView/second');
    },
    presentPermission() {
      this.$router.push('/HomeView/permission');
    },
    presentGridView() {
      this.$router.push('/HomeView/gridview')
    },  
    async presentLogout() {
      axios.post('/logout').then(res => {
        console.log(res)
        this.$store.commit("resetState");
        this.$router.replace('/');
      })
      
    }
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: calc(100vh - 60px);
  display: flex;
  // align-items: center;
  .title {
    width: 15%;
    height: 100%;
    // background-color: #cf4346;
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
</style>
