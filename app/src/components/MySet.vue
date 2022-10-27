<template>
  <div class="setBox">
    <el-button type="primary" round @click="getOut" size="medium"
      >退出登录</el-button
    >
    <el-button type="primary" round @click="switchUser" size="medium"
      >切换用户</el-button
    >
  </div>
</template>

<script>
export default {
  name: "MySet",
  methods: {
    getOut() {
      sessionStorage.setItem("code", 1);
      this.$router.push("/login");
    },
    switchUser() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.setBox {
  padding-left: 20px;
  padding-top: 20px;
}
</style>