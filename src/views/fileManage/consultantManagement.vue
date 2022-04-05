<template>
  <section>
    <div>
      <el-dialog
        title="添加咨询师"
        :visible.sync="dialogVisible"
        width="50%"
        :destroy-on-close="false"
        @closed="$reset('addForm')"
      >
        <el-tabs v-model="activeTab" type="card" :before-leave="beforeLeave">
          <el-tab-pane label="个人信息" name="personInfo">
            <el-form
              ref="addFormRef"
              :model="addForm"
              :rules="addRules"
              label-width="80px"
            >
              <el-row>
                <el-col :span="10">
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="addForm.name"
                      placeholder="请输入姓名"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="addForm.gender">
                      <el-radio label="1">男</el-radio>
                      <el-radio label="0">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="年龄" prop="age">
                    <el-input
                      v-model="addForm.age"
                      placeholder="请输入年龄"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="身份证号码" prop="idNumber">
                    <el-input
                      v-model="addForm.idNumber"
                      placeholder="请输入身份证号"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="电话" prop="phone">
                    <el-input
                      v-model="addForm.phone"
                      placeholder="请输入联系电话"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="邮箱" prop="email">
                    <el-input
                      v-model="addForm.email"
                      placeholder="请输入邮箱地址"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="绑定督导" prop="supervisor">
                    <el-select
                      v-model="addForm.supervisor"
                      placeholder="请选择督导"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="工作信息" name="jobInfo">
            <el-form ref="addFormRef" :model="addForm" label-width="80px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="用户名" prop="accountName">
                    <el-input
                      v-model="addForm.accountName"
                      placeholder="请输入用户名"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="addForm.password"
                      placeholder="请输入密码"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="工作单位" prop="workUnit">
                    <el-input
                      v-model="addForm.workUnit"
                      placeholder="请输入工作单位"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="职称" prop="title">
                    <el-input
                      v-model="addForm.title"
                      placeholder="请输入职称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogAddSure">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑咨询师"
        :visible.sync="dialogUpdateVisible"
        width="50%"
        :destroy-on-close="false"
      >
        <el-tabs v-model="activeTab" type="card" :before-leave="beforeLeave">
          <el-tab-pane label="个人信息" name="personInfo">
            <el-form
              ref="updateFormRef"
              :model="updateForm"
              :rules="editRules"
              label-width="80px"
            >
              <el-row>
                <el-col :span="10">
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="updateForm.name"
                      placeholder="请输入姓名"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="updateForm.gender">
                      <el-radio label="1">男</el-radio>
                      <el-radio label="0">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="年龄" prop="age">
                    <el-input
                      v-model="updateForm.age"
                      placeholder="请输入年龄"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="身份证号码" prop="idNumber">
                    <el-input
                      v-model="updateForm.idNumber"
                      placeholder="请输入身份证号"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="电话" prop="phone">
                    <el-input
                      v-model="updateForm.phone"
                      placeholder="请输入联系电话"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="邮箱" prop="email">
                    <el-input
                      v-model="updateForm.email"
                      placeholder="请输入邮箱地址"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="绑定督导" prop="supervisor">
                    <el-select
                      v-model="updateForm.supervisor"
                      placeholder="请选择督导"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="工作信息" name="jobInfo">
            <el-form ref="updateForm" :model="updateForm" label-width="80px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="用户名" prop="accountName">
                    <el-input
                      v-model="updateForm.accountName"
                      placeholder="请输入用户名"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="updateForm.password"
                      placeholder="请输入密码"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="工作单位" prop="workUnit">
                    <el-input
                      v-model="updateForm.workUnit"
                      placeholder="请输入工作单位"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="职称" prop="title">
                    <el-input
                      v-model="updateForm.title"
                      placeholder="请输入职称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogUpdateSure">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改咨询师排班"
        :visible.sync="dialogEditScheduleVisible"
        width="50%"
        :destroy-on-close="false"
        @closed="$reset('editScheduleForm')"
      >
        <el-tabs v-model="activeTab" type="card" :before-leave="beforeLeave">
            <el-form
              ref="editScheduleFormRef"
              :model="editScheduleForm"
              :rules="editScheduleRules"
              label-width="80px"
            >
                <el-col :span="10">
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="editScheduleForm.name"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="绑定督导" prop="supervisor">
                    <el-select
                      v-model="editScheduleForm.supervisor"
                      placeholder="请选择督导"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
                  <el-col :span="20">
                  <el-form-item label="周值班安排" prop="weekSchedule">
                  <el-radio-group v-model="editScheduleForm.weekSchedule"
                  @change="handleCheckedWeeksChange"
                  :max="7">
                  <el-radio-button v-for="week in weeks" :label="week.id"
                  :key="week.id">{{week.label}}</el-radio-button>
                  </el-radio-group>
                  </el-form-item>
                </el-col>
            </el-form>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditScheduleVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEditScheduleSure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="listQuery">
        <el-form-item>
          <el-input
            style="width: 300px"
            size="small"
            v-model="listQuery.searchCondition"
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
            @click="addClick"
            >新增咨询师</el-button
          >
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
        prop="counselorName"
        label="姓名"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column prop="identity" label="身份" width="160" align="center">
      </el-table-column>
      <el-table-column
        prop="supervisor"
        label="绑定督导"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="totalConsultNumber"
        label="总咨询数"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="totalConsultTime"
        label="咨询总时长"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="averageConsultGrade"
        label="平均咨询等级"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="schedule"
        label="周值班安排"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="240">
        <template slot-scope="scope">
          <el-button type="text" @click="editDetail(scope.row.id)"
            >修改</el-button
          >
          <el-button type="text" @click="editSchedule(scope.row.id)"
            >修改排班</el-button
          >
          <el-button type="text" @click="deleteClick(scope.row.id)"
            >删除</el-button
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
const weekOptions =[
  {id:1,label:'周一'},
  {id:2,label:'周二'},
  {id:3,label:'周三'},
  {id:4,label:'周四'},
  {id:5,label:'周五'},
  {id:6,label:'周六'},
  {id:7,label:'周日'},
];
import {
  AddCounselor,
  UpdateCounselor,
  DeleteCounselor,
  GetCounselorById,
  GetCounselorList,
} from "@/api/consultant";
import { AddUser, UpdateUser } from "@/api/users";
import axios from "axios";

export default {
  data() {
    return {
      weeks:weekOptions,
      dialogVisible: false,
      dialogUpdateVisible: false,
      dialogEditScheduleVisible: false,
      activeTab: "personInfo",
      listQuery: {
        page: 1,
        size: 10,
        searchCondition: "",
      },
      total: 0,
      listLoading: false,
      list: [],
      updateId: "",
      editScheduleForm:{
        neme:"",
        supervisor:"",
        weekSchedule:[1],
      },
      updateForm: {
        name: "",
        gender: "",
        age: "",
        idNumber: "",
        phone: "",
        email: "",
        supervisor: "",
        accountName: "",
        password: "",
        workUnit: "",
        title: "",
      },
      resetForm: {
        name: "",
        gender: "",
        age: "",
        idNumber: "",
        phone: "",
        email: "",
        supervisor: "",
        accountName: "",
        password: "",
        workUnit: "",
        title: "",
      },
      addForm: {
        name: "",
        gender: "",
        age: "",
        idNumber: "",
        phone: "",
        email: "",
        supervisor: "",
        accountName: "",
        password: "",
        workUnit: "",
        title: "",
      },
      addRules: {
        name: [{ required: true, message: "请输入姓名", trigger: ["blur"] }],
        age: [{ required: true, message: "请输入年龄", trigger: ["blur"] }],
      },
      editRules: {
        name: [{ required: true, message: "请输入姓名", trigger: ["blur"] }],
      },
      editScheduleRules: {
        name: [{ required: true, message: "请输入姓名", trigger: ["blur"] }],
      },
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
      };
      GetCounselorList(para).then((res) => {
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
    deleteClick(id){
      console.log(id);
      DeleteCounselor(id).then((res) => {
        if (res.data.code === "000") {
            this.getList();
            this.$message({
              message: "删除咨询师成功",
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
    addClick() {
      this.dialogVisible = true;
      this.addForm = this.resetForm;
    },
    reset() {
      this.getList();
    },
    dialogAddSure() {
      const userPara = {
        loginName: this.addForm.accountName,
        password: this.addForm.password,
      };
      this.$refs["addFormRef"].validate((valid) => {
        if (valid) {
          AddUser(userPara).then((res) => {
            if (res.data.code === "000") {
              const counselor = {
                accountId: res.data.datas[0].id,
                counselorName: this.addForm.name,
                phoneNum: this.addForm.phone,
              };
              AddCounselor(counselor).then((res) => {
                if (res.data.code === "000") {
                  this.dialogVisible = false;
                  this.getList();
                  this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                }
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          });
        } else {
          this.$message.error("信息不完整！");
          return false;
        }
      });
    },
    handleCheckAllChange(val) {
        this.checkAll =  !!this.checkAll;
        let checked = weekOptions.map(function(item){return item.id;});
        this.editScheduleForm.weekSchedule = this.checkAll ? checked : [];
        this.isIndeterminate = false;
      },
    handleCheckedWeeksChange(value){
      let checkedCount = value.length;
        this.checkAll = checkedCount === this.weeks.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.weeks.length;
    },
    dialogEditScheduleSure(){

    },
    dialogUpdateSure(id) {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          const counselor = {
            id: this.updateId,
            counselorName: this.updateForm.name,
            phoneNum: this.updateForm.phone,
          };
          console.log(counselor);
          UpdateCounselor(counselor).then((res) => {
            console.log(res);
            if (res.data.code === "000") {
              this.dialogVisible = false;
              this.getList();
              this.$message({
                message: "修改成功",
                type: "success",
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          });
        } else {
          this.$message.error("信息不完整！");
          return false;
        }
      });
    },
    beforeLeave() {},
    editSchedule(row) {
      console.log(row);
      this.dialogEditScheduleVisible = true;
    },
    editDetail(row) {
      console.log(row);
      this.dialogUpdateVisible = true;
      this.updateId = row;
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