<template>
  <div class="leftBox">
    <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <div class="tableContent">
      <span @click="loginTip">
        <el-menu
          router
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="/table">
            <i class="el-icon-document"></i>
            <span slot="title">查看全部</span>
          </el-menu-item>
          <!-- <el-menu-item index="/login">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item> -->
          <el-menu-item index="/userInfo">
            <!-- disabled -->
            <i class="el-icon-user"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/set">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </span>

      <keep-alive>
        <transition name="slide-left" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import MyLogin from "./MyLogin.vue";
// import MyTable from "./MyTable.vue";
export default {
  name: "LeftNav",
  components: {},
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginTip() {
      if (sessionStorage.getItem("code") !== "0") {
        this.$message("请先登录");
      }
      // console.log(1);
    },
  },
};
</script>

<style scoped>
.leftBox {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 100%;
}
.tableContent {
  display: flex;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 139px;
  min-height: 0px;
}

.el-menu {
  border-top: 1px solid #dcdfe6;
}
.el-submenu .el-menu-item {
  min-width: 0;
}
.slide-left-enter {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-enter-active {
  transition: all 0.5s ease;
}
.slide-left-leave-to {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
.slide-left-leave-active {
  transition: all 0.5s ease;
}
</style>
