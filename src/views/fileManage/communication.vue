<template>
  <section>
      <iframe :src="TimSrc" scrolling="auto"
              frameborder="0"
              style="width: 100%; height: 850px"></iframe>
  </section>
</template>

<script>
import {
  AddCustomer,
  UpdateCustomer,
  DeleteCustomer,
  GetCustomerById,
  GetCustomerList,
} from "@/api/visitor";
import { AddUser, UpdateUser } from "@/api/users";
import axios from "axios";

export default {
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        nameSearch: "",
        timeSearch: ""
      },
      total: 0,
      listLoading: false,
      list: [],
      TimSrc: "",
      user: {}
    };
  },
  mounted() {
    //this.getList();
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.TimSrc = `http://47.101.185.1:5210/?userID=${this.user.loginName}&password=123456`
  },
  methods: {
    getList() {
      const that = this;
      const para = {
        //...this.listQuery,
        page: this.listQuery.page - 1,
        size: this.listQuery.size
      };
      GetCustomerList(para).then((res) => {
        if (res.data.code === "000") {
          this.list = res.data.datas[0].content;
          this.total = res.data.datas[0].totalElements;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    searchClick() {
      const that = this;
      const para = {
        ...this.listQuery,
        page: this.listQuery.page - 1,
      };
      /* GetGraphListBySearchCondition(para).then((res) => {
        if (res.data.code === "000") {
          this.list = res.data.datas[0].content;
          this.total = res.data.datas[0].totalElements;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      }); */
    },
    stopAccount(id) {},
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 0;
}
.toolbar {
  background: #ffffff;
  padding: 20px 0;
}
</style>