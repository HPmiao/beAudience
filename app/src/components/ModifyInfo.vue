<template>
  <span>
    <el-button @click="(dialogVisible = true), shuChu()" size="mini"
      >修改</el-button
    >
    <el-dialog
      title="修改信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="myFormData"
        ref="myFormData"
        class="demo-ruleForm"
        hide-required-asterisk
        label-width="40px"
        :label-position="labelPosition"
      >
        <!-- label-width="100px" -->
        <el-form-item prop="name" label="姓名">
          <el-input v-model="myFormData.name"></el-input>
        </el-form-item>
        <el-form-item prop="sno" label="学号">
          <el-input v-model="myFormData.sno"></el-input>
        </el-form-item>
        <el-form-item prop="addNums" label="次数">
          <el-input v-model="myFormData.addNums"></el-input>
        </el-form-item>
        <el-form-item prop="detail" label="详情">
          <el-input type="textarea" v-model="myFormData.detail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('myFormData')"
            >提交</el-button
          >
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>

<script>
import axios from "axios";
export default {
  props: ["content", "updateTable"],
  data() {
    return {
      labelPosition: "right",
      dialogVisible: false,
      myFormData: {},
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    success() {
      this.$message({
        message: "修改成功",
        type: "success",
      });
    },
    shuChu() {
      // console.log("个人信息", this.myFormData);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log("进入");
          this.updateTable(this.myFormData);
          // console.log(this.myFormData);
          // this.$router.push("/table");
          this.dialogVisible = false;
        } else {
          this.$message.error("未知错误");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.myFormData = {
      addNums: this.content.addNums,
      detail: this.content.detail,
      id: this.content.id,
      name: this.content.name,
      sno: this.content.sno,
    };
  },
};
</script>
<style scoped>
.dialog-footer {
  text-align: center;
}
</style>