<template>
  <span>
    <el-button @click="dialogVisible = true" type="primary" round
      >添加</el-button
    >
    <el-dialog
      title="添加用户"
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
        <el-form-item
          prop="name"
          label="姓名"
          :rules="{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="myFormData.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="sno"
          label="学号"
          :rules="{
            required: true,
            message: '学号不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model.number="myFormData.sno"></el-input>
        </el-form-item>
        <el-form-item
          prop="addNums"
          label="次数"
          :rules="{
            required: true,
            message: '次数不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model.number="myFormData.addNums"></el-input>
        </el-form-item>
        <el-form-item prop="detail" label="详情">
          <el-input type="textarea" v-model="myFormData.detail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>

<script>
import axios from "axios";
export default {
  props: ["addTable"],
  data() {
    return {
      labelPosition: "right",
      dialogVisible: false,
      myFormData: {
        addNums: 0,
        detail: "",
        id: 0,
        name: "测试1",
        sno: "202008764111",
      },
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
        message: "添加成功",
        type: "success",
      });
    },
    judge() {
      if (!this.myFormData.name.trim()) {
        // this.$message.error("姓名不可为空");
        return false;
      } else if (!this.myFormData.sno.trim()) {
        // this.$message.error("学号不可为空");
        return false;
      } else if (!this.myFormData.addNums && this.myFormData.addNums !== 0) {
        // this.$message.error("次数不可为空");
        return false;
      } else {
        return true;
      }
    },
    submitForm() {
      if (this.judge()) {
        this.addTable(this.myFormData);
      }
      this.dialogVisible = false;
      // console.log(this.myFormData);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {},
};
</script>
<style scoped>
.dialog-footer {
  text-align: center;
}
/* 普通IE浏览器 样式清除 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/* 火狐浏览器样式清除 */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>