<template>
  <div class="layout">
    <header>
      <img src="../assets/infibi-logo.svg" height="100%">
      <div class="user" v-on:click="() => {}">
        <img src="../assets/logo.png" height="100%">
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
          <!-- <el-submenu index="2">
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
          </el-submenu> -->
          <el-menu-item index="3" v-on:click="presentForm">
              <i class="el-icon-setting"></i>
              <span slot="title">表格</span>
          </el-menu-item>
          <el-menu-item index="4" v-on:click="presentPermission">
              <i class="el-icon-setting"></i>
              <span slot="title">權限</span>
          </el-menu-item>
          </el-menu>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>

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
  right: 0;
  top: 0;

}
</style>
