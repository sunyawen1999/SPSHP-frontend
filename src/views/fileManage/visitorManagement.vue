<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="listQuery">
        <el-form-item>
          <el-input
            style="width: 300px"
            size="small"
            v-model="listQuery.nameSearch"
            placeholder="请输入姓名进行搜索"
          >
            <!-- <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              style="cursor: pointer"
              @click="searchClick"
            >
            </i> -->
          </el-input>
        </el-form-item>
        <el-form-item class="float">
          <el-button
            class="btn_color"
            type="primary"
            size="small"
            @click="searchClick"
            >搜索</el-button
          >
        </el-form-item>
        
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="list" style="width: 100%">
      <el-table-column
        prop="customerInfo.customerName"
        label="姓名"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="customerInfo.customerGender"
        label="性别"
        width="160"
        align="center"
      >
      <template slot-scope="scope">
          <span v-show="scope.row.customerInfo.customerGender === 'male'">男</span>
          <span v-show="scope.row.customerInfo.customerGender === 'female'">女</span>
      </template>
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="用户名"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="customerInfo.phoneNum"
        label="联系电话"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="customerInfo.emergencyName"
        label="紧急联系人"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="customerInfo.emergencyPhone"
        label="紧急联系电话"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="roleType"
        label="身份"
        width="160"
        align="center"
      >
          <span>访客</span>
      </el-table-column>
      <el-table-column
        label="账户状态"
        width="160"
        align="center"
      >
      <template slot-scope="scope">
          <span v-show="scope.row.isBaned === true">禁用</span>
          <span v-show="scope.row.isBaned === false">启用</span>
      </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="240">
        <template slot-scope="scope">
          <el-button type="text" @click="stopAccount(scope.row.id)" v-show="scope.row.isBaned === false"
            >禁用</el-button
          >
          <el-button type="text" @click="enAccount(scope.row.id)" v-show="scope.row.isBaned === true"
            >启用</el-button
          >
          <!-- <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="删除"
            icon="el-icon-info"
            iconColor="red"
            title="是否确认删除？"
            @onConfirm="deleteGraph(scope.row.id)"
          >
            <el-button type="text" slot="reference" class="btn-text-red mx-5"
              >删除</el-button
            >
          </el-popconfirm> -->
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="getList"
        :page-size="listQuery.size"
        :current-page.sync="listQuery.page"
        :total="total"
        style="float: right"
      ></el-pagination>
    </el-col>
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
import {
  GetUsersList
} from "@/api/users"
import { setBan } from "@/api/users";
import axios from "axios";

export default {
  data() {
    return {
      isBaned:true,
      listQuery: {
        page: 1,
        size: 10,
        nameSearch: "",
        timeSearch: ""
      },
      total: 0,
      listLoading: false,
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const that = this;
      const para = {
        //...this.listQuery,
        page: this.listQuery.page - 1,
        size: this.listQuery.size,
        roleType: "customer"
      };
      GetUsersList(para).then((res) => {
        console.log(res.data);
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
    stopAccount(id) {
      //console.log(id);
      this.isBaned = true
      setBan(id,this.isBaned).then((res) => {
        if (res.data.code === "000") {
            this.getList();
            this.$message({
              message: "禁用账户成功",
              type: "success",
            });
        }else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
      })
    },
    enAccount(id) {
      //console.log(id);
      this.isBaned = false
      setBan(id,this.isBaned).then((res) => {
        if (res.data.code === "000") {
            this.getList();
            this.$message({
              message: "启用账户成功",
              type: "success",
            });
        }else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
      })
    },
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