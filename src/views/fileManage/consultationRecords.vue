<template>
  <section>
    <!--工具条-->
    <el-dialog
      title="咨询记录详情"
      :visible.sync="dialogDetailVisible"
      width="50%"
      :destroy-on-close="false"
      @closed="$reset('detailForm')"
    >
      <el-tabs v-model="activeTab" type="card" :before-leave="beforeLeave">
        <el-form ref="detailFormRef" :model="detailForm" label-width="120px">
          <el-col :span="16">
            <el-form-item label="咨询师ID" prop="counselorId">
              <el-input v-model="detailForm.counselorId" disabled></el-input>
            </el-form-item>
            <el-form-item label="访客ID" prop="customerId">
              <el-input v-model="detailForm.customerId" disabled></el-input>
            </el-form-item>
            <el-form-item label="咨询时长" prop="duration">
              <el-input v-model="detailForm.duration" disabled></el-input>
            </el-form-item>
            <el-form-item label="咨询开始时间" prop="startTime">
              <el-input v-model="detailForm.startTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="咨询结束时间" prop="endTime">
              <el-input v-model="detailForm.endTime" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false">关闭详情</el-button>
      </span>
    </el-dialog>
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
        <el-form-item>
          <el-date-picker
            size="small"
            style="width: 300px"
            v-model="listQuery.timeSearch"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择日期时间"
          >
          </el-date-picker>
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
        label="咨询人"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="duration"
        label="咨询时长"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="date" label="咨询日期" width="160" align="center">
      </el-table-column>
      <el-table-column
        prop="evaluateId"
        label="咨询评级"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="evaluateInfo"
        label="咨询评价"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="240">
        <template slot-scope="scope">
          <el-button type="text" @click="seeDetail(scope.row)"
            >查看详情</el-button
          >
          <el-button type="text" @click="exportRecorder(scope.row.id)"
            >导出记录</el-button
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
  AddCounsel,
  UpdateCounsel,
  DeleteCounsel,
  GetCounselById,
  GetCounselList,
} from "@/api/consultation";
import axios from "axios";
import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";

export default {
  data() {
    return {
      options: {
        SDKAppID: 1400638027,
      },
      listQuery: {
        page: 1,
        size: 10,
        nameSearch: "",
        timeSearch: "",
      },
      total: 0,
      dialogDetailVisible: false,
      listLoading: false,
      list: [],
      detailForm: {
        counselorId: 0,
        customerId: 0,
        duration: 0,
        endTime: "",
        evaluateId: 0,
        evaluateInfo: "",
        historyMessage: "",
        startTime: "",
      },
      activeTab: "",
      user: {},
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    let tim = TIM.create(this.options);
    tim.setLogLevel(0);
    tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });
    this.getList();
    let promise = tim.login({ userID: this.user.loginName, userSig: this.genTestUserSig(this.user.loginName).userSig});
    promise
      .then(function (imResponse) {
        console.log(imResponse.data); // 登录成功
        if (imResponse.data.repeatLogin === true) {
          // 标识帐号已登录，本次登录操作为重复登录。v2.5.1 起支持
          console.log(imResponse.data.errorInfo);
        }
      })
      .catch(function (imError) {
        console.warn("login error:", imError); // 登录失败的相关信息
      });
  },
  methods: {
    login() {
      this.loading = true;
      this.tim
        .login({
          userID: this.user.loginName,
          userSig: window.genTestUserSig(this.user.loginName).userSig,
        })
        .then(() => {
          this.loading = false;
          this.$store.commit("toggleIsLogin", true);
          this.$store.commit("startComputeCurrent");
          this.$store.commit("showMessage", {
            type: "success",
            message: "登录成功",
          });
          this.$store.commit({
            type: "GET_USER_INFO",
            userID: this.user.loginName,
            userSig: window.genTestUserSig(this.user.loginName).userSig,
            sdkAppID: window.genTestUserSig("").SDKAppID,
          });
          this.$store.commit("showMessage", {
            type: "success",
            message: "登录成功",
          });
        })
        .catch((error) => {
          this.loading = false;
          this.$store.commit("showMessage", {
            message: "登录失败：" + error.message,
            type: "error",
          });
        });
    },
    genTestUserSig(userID) {
  /**
   * 腾讯云 SDKAppId，需要替换为您自己账号下的 SDKAppId。
   *
   * 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav ) 创建应用，即可看到 SDKAppId，
   * 它是腾讯云用于区分客户的唯一标识。
   */
  var SDKAPPID = 1400638027;

  /**
   * 签名过期时间，建议不要设置的过短
   * <p>
   * 时间单位：秒
   * 默认时间：7 x 24 x 60 x 60 = 604800 = 7 天
   */
  var EXPIRETIME = 604800;

  /**
   * 计算签名用的加密密钥，获取步骤如下：
   *
   * step1. 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav )，如果还没有应用就创建一个，
   * step2. 单击“应用配置”进入基础配置页面，并进一步找到“帐号体系集成”部分。
   * step3. 点击“查看密钥”按钮，就可以看到计算 UserSig 使用的加密的密钥了，请将其拷贝并复制到如下的变量中
   *
   * 注意：该方案仅适用于调试Demo，正式上线前请将 UserSig 计算代码和密钥迁移到您的后台服务器上，以避免加密密钥泄露导致的流量盗用。
   * 文档：https://cloud.tencent.com/document/product/647/17275#Server
   */
  var SECRETKEY = 'eeba4e888bcf8971927a2931c93326fc7fd116957ac2db131835bac3c40319c7';

  var generator = new window.LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  var userSig = generator.genTestUserSig(userID);
  return {
    SDKAppID: SDKAPPID,
    userSig: userSig
  };
},
    getList() {
      const that = this;
      const para = {
        //...this.listQuery,
        page: this.listQuery.page - 1,
        size: this.listQuery.size,
      };
      GetCounselList(para).then((res) => {
        //console.log(res);
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
    seeDetail(row) {
      this.dialogDetailVisible = true;
      GetCounselById(row.id).then((res) => {
        console.log(res);
        if (res.data.code === "000") {
          this.detailForm.counselorId = res.data.datas[0].counselorId;
          this.detailForm.customerId = res.data.datas[0].customerId;
          this.detailForm.duration = res.data.datas[0].duration;
          this.detailForm.startTime = res.data.datas[0].startTime;
          this.detailForm.endTime = res.data.datas[0].endTime;
        }
      });
    },
    exportRecorder(id) {},
    beforeLeave() {},
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