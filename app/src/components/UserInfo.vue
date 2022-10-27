<template>
  <div class="userInfoBox">
    <el-descriptions title="用户信息" :column="2">
      <el-descriptions-item label="用户名">{{
        info.name
      }}</el-descriptions-item>
      <el-descriptions-item label="学号">{{ info.sno }}</el-descriptions-item>
      <br />
      <el-descriptions-item label="被观众次数">{{
        info.addNums
      }}</el-descriptions-item>
      <el-descriptions-item label="修改时间">
        <!-- <el-tag size="small">学校</el-tag> -->
        {{ info.updateTime }}
      </el-descriptions-item>
      <el-descriptions-item label="权限" v-if="authentication == 'admin'">
        <el-tag size="small">管理员</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="详情">{{
        info.detail
      }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TheUser",
  data() {
    return {
      authentication: "",
      info: "",
    };
  },
  methods: {
    getInfo() {
      // console.log("get");
      axios
        .get(`${this.$store.state.global.url}/api/beParticipate/list/page`, {
          params: {
            current: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
          // console.log(res.data.data.records, sessionStorage.getItem("sno"));
          let Myinfo;
          Myinfo = res.data.data.records.filter((info) => {
            return info.sno == sessionStorage.getItem("sno");
          });
          this.info = Myinfo[0];
          // console.log(this.info);
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },
  mounted() {
    this.getInfo();
    this.authentication = sessionStorage.getItem("authentication");
  },
};
</script>

<style  scoped>
.userInfoBox {
  flex: 1;
  padding-top: 10px;
  padding-left: 10px;
}
</style>