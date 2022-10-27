<template>
  <div>
    <button @click="login">登录</button>
    <button @click="login1">用户登录</button>
    <button @click="print">输出</button>
    <el-form
      :model="myFormData"
      ref="myFormData"
      label-width="100px"
      class="demo-ruleForm"
      hide-required-asterisk
    >
      <el-form-item
        prop="sno"
        label="学号"
        :rules="{ required: true, message: '请输入学号', trigger: 'blur' }"
      >
        <el-input v-model="myFormData.sno" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码"
        :rules="{
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        }"
      >
        <el-input
          type="password"
          v-model="myFormData.password"
          autocomplete="on"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('myFormData')"
          >提交</el-button
        >
        <el-button @click="resetForm('myFormData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
// import router from "@/router";
export default {
  name: "MyLogin",
  data() {
    return {
      myFormData: {
        sno: "",
        password: "",
      },
    };
  },
  methods: {
    login(sno, password) {
      axios
        .post(`${this.$store.state.global.url}/api/user/login`, {
          sno: 202008764101,
          password: 123456,
          // password: password,
          // sno: sno,
        })
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("code", res.data.code);
          sessionStorage.setItem("sno", res.data.data.sno);
          sessionStorage.setItem(
            "authentication",
            res.data.data.authentication
          );
          this.$router.push("/table");
        });
    },
    login1(sno, password) {
      axios
        .post(`${this.$store.state.global.url}/api/user/login`, {
          sno: 202008764111,
          password: 123456,
          // password: password,
          // sno: sno,
        })
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("code", res.data.code);
          sessionStorage.setItem("sno", res.data.data.sno);
          sessionStorage.setItem(
            "authentication",
            res.data.data.authentication
          );
          this.$router.push("/table");
        });
    },
    print() {
      axios
        .get(`${this.$store.state.global.url}/api/beParticipate/list/page`, {
          params: {
            current: 1,
            pageSize: 50,
            sortField: "",
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.myFormData);
          this.login(this.myFormData.sno, this.myFormData.password);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    if (sessionStorage.getItem("code") !== "0") {
      this.$message("请登录");
    }
  },
};
</script>

<style scoped>
</style>