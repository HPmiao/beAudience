<template>
  <div style="flex: 1; overflow: auto">
    <el-table
      ref="multipleTable"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%; overflow: auto"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="sno" label="学号" min-width="120">
      </el-table-column>
      <el-table-column label="更新日期" min-width="110">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>
      <el-table-column
        prop="addNums"
        label="被观众次数"
        min-width="120"
      ></el-table-column>
      <el-table-column
        label="操作"
        min-width="150"
        v-if="authentication == 'admin'"
      >
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        > -->
          <ModifyInfo
            style="margin-right: 10px"
            :content="scope.row"
            :updateTable="updateTable"
          />
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="addButtom" v-if="authentication == 'admin'">
      <AddUser :addTable="addTable" />
    </div>
  </div>
</template>

<script>
import ModifyInfo from "./ModifyInfo.vue";
import AddUser from "./AddUser.vue";
import axios from "axios";
export default {
  name: "MyTable",
  components: { ModifyInfo, AddUser },
  data() {
    return {
      authentication: "",
      tableData: [],
      multipleSelection: [],
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //   console.log(this.multipleSelection);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(row) {
      // console.log(row);
      this.$confirm("是否删除" + row.name + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deletePost(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    updateTable(data) {
      this.updatePost(data);
      this.getTable();
    },
    addTable(data) {
      this.addPost(data);
      this.getTable();
    },
    deletePost(id) {
      axios
        .post(`${this.$store.state.global.url}/api/beParticipate/delete`, {
          id: [id],
        })
        .then((res) => {
          console.log(res.data.code);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
    },
    updatePost(data) {
      // console.log("post");
      axios
        .post(`${this.$store.state.global.url}/api/beParticipate/update`, {
          addNums: data.addNums,
          detail: data.detail,
          id: data.id,
          name: data.name,
          sno: data.sno,
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message.error("服务器错误/无权限");
          }
          // console.log(res.data);
        })
        .catch((err) => {
          this.$message.error("请求错误", err);
        });
    },
    getTable() {
      axios
        .get(`${this.$store.state.global.url}/api/beParticipate/list/page`, {
          params: {
            current: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
          this.tableData = res.data.data.records;
        })
        .catch(function (error) {
          alert(error);
        });
    },
    addPost(data) {
      axios
        .post(`${this.$store.state.global.url}/api/beParticipate/add`, {
          addNums: data.addNums,
          detail: data.detail,
          id: 0,
          name: data.name,
          sno: data.sno,
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
          } else {
            this.$message.error("添加失败，服务端错误/无权限");
          }
        })
        .catch((err) => {
          this.$message.error("请求错误", err);
        });
    },
  },
  mounted() {
    this.getTable();
    this.authentication = sessionStorage.getItem("authentication");
  },
};
</script>

<style scoped>
.addButtom {
  padding: 10px 0;
  text-align: center;
}
</style>