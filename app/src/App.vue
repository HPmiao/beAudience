<template>
  <div id="app">
    <LeftNav />
  </div>
</template>

<script>
import LeftNav from "./components/LeftNav.vue";
// import MyLogin from "./components/MyLogin.vue";
export default {
  name: "App",
  components: {
    LeftNav,
    // MyLogin,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  margin: auto;
  margin-top: 20px;
  /* width: 90%; */
  display: flex;
}

/* .theLeftNav {
  width: 200px;
} */
</style>