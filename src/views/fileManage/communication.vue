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
import { GetSupervisorById } from "@/api/supervisor";
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
      user: {},
      supervisorName: ""
    };
  },
  mounted() {
    //this.getList();
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user.roleType === "counselor") {
      var supervisorId = this.user.counselorInfo.supervisorIds[0]
      GetSupervisorById(supervisorId).then((res) => {
        if(res.data.code === "000") {
          this.supervisorName = res.data.datas[0].supervisorName
          this.TimSrc = `http://47.101.185.1:5210/?userID=${this.user.loginName}&password=123456&supervisorId=${supervisorId}&supervisorName=${this.supervisorName}`
        }
      })
    } else {
      this.TimSrc = `http://47.101.185.1:5210/?userID=${this.user.loginName}&password=123456`
    }
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
    getSupervisorName(id) {
      GetSupervisorById(id).then((res) => {
        if(res.data.code === "000") {
          this.supervisorName = res.data.datas[0].supervisorName
          console.log(this.supervisorName)
        }
      })
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