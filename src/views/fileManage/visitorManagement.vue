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
        prop="name"
        label="姓名"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="accountName"
        label="用户名"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="emergencyContact"
        label="紧急联系人"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="emergencyContactPhone"
        label="紧急联系电话"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="identity"
        label="身份"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="accountStatus"
        label="账户状态"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="240">
        <template slot-scope="scope">
          <el-button type="text" @click="stopAccount(scope.row.id)"
            >禁用</el-button
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
/* import {
  GetFactoryAll,
  GetDeviceByFactory,
  BindUserDevice,
  GetBindUserIdByDevice,
} from "@/api/getData";
import {
  DeleteDevice
} from "@/api/deviceInfo"; */
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
    };
  },
  mounted() {
    //this.getList();
  },
  methods: {
    getList() {
      const that = this;
      const para = {
        ...this.listQueryGraph,
        page: this.listQueryGraph.page - 1,
      };
      /* GetGraphList(para).then((res) => {
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