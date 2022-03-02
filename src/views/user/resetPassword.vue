<template>
  <section>
    <el-card class="box-card">
      <el-form label-position="left" label-width="150px" :model="editForm">
        <el-form-item label="旧密码">
          <el-input v-model="editForm.oldPassword" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="editForm.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="machine-btn" @click="saveData">保存</el-button>
    </el-card>
  </section>
</template>

<script>
import { EditPassword } from "@/api/users";
export default {
  data() {
    return {
      editForm: {
        oldPassword: "",
        newPassword: ""
      }
    };
  },
  methods: {
    saveData() {
      EditPassword(this.editForm.oldPassword, this.editForm.newPassword).then(
        res => {
          if (res.data.code === "000") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.editForm = {
              oldPassword: "",
              newPassword: ""
            };
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  padding: 50px;

  .text-item {
    line-height: 50px;
    font-size: 18px;
  }
}
</style>
