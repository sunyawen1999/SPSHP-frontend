<template>
  <section>
    <div>
        <el-dialog
        title="修改督导排班"
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
              label-width="120px"
            >
                <el-col :span="16">
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="editScheduleForm.name"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                  <el-col :span="20">
                  <el-form-item label="周值班安排" prop="weekSchedule">
                  <el-checkbox-group v-model="editScheduleForm.weekSchedule"
                  @change="handleCheckedWeeksChange">
                  <el-checkbox-button v-for="week in weeks" :label="week.id" border
                  :key="week.id">{{week.label}}</el-checkbox-button>
                  </el-checkbox-group>
                  </el-form-item>
                </el-col>
            </el-form>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditScheduleVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEditScheduleSure">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改督导"
        :visible.sync="dialogUpdateVisible"
        width="50%"
        :destroy-on-close="false"
      >
        <el-tabs v-model="activeTab" type="card" :before-leave="beforeLeave">
          <el-tab-pane label="个人信息" name="personInfo">
            <el-form
              ref="updateForm"
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
                      <el-radio label="male">男</el-radio>
                      <el-radio label="female">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="年龄" prop="age">
                    <el-input
                      v-model.number="updateForm.age"
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
                <!-- <el-col :span="20">
                  <el-form-item label="绑定督导" prop="aupervisor">
                    <el-select
                      v-model="addForm.supervisor"
                      placeholder="请选择督导"
                    >
                    </el-select>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="工作信息" name="jobInfo">
            <el-form ref="updateForm" :model="updateForm" :rules="editRules" label-width="80px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="用户名" prop="accountName">
                    <el-input
                      v-model="updateForm.accountName"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                </el-col>
                <el-col :span="10">
                  <el-form-item label="督导资质" prop="credit">
                    <el-input
                      v-model="updateForm.credit"
                      placeholder="请输入督导资质"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="资质编号" prop="creditNumber">
                    <el-input
                      v-model="updateForm.creditNumber"
                      placeholder="请输入资质编号"
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
        title="添加督导"
        :visible.sync="dialogVisible"
        width="50%"
        :destroy-on-close="false"
        @closed="$reset('addForm')"
      >
        <el-tabs v-model="activeTab" type="card" :before-leave="beforeLeave">
          <el-tab-pane label="个人信息" name="personInfo">
            <el-form
              ref="addformRef"
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
                      <el-radio label="male">男</el-radio>
                      <el-radio label="female">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="年龄" prop="age">
                    <el-input
                      v-model.number="addForm.age"
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
                <!-- <el-col :span="20">
                  <el-form-item label="绑定督导" prop="aupervisor">
                    <el-select
                      v-model="addForm.supervisor"
                      placeholder="请选择督导"
                    >
                    </el-select>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="工作信息" name="jobInfo">
            <el-form ref="addformRef" :model="addForm" :rules="addRules" label-width="80px">
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
                  <el-form-item label="督导资质" prop="credit">
                    <el-input
                      v-model="addForm.credit"
                      placeholder="请输入督导资质"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="资质编号" prop="creditNumber">
                    <el-input
                      v-model="addForm.creditNumber"
                      placeholder="请输入资质编号"
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
    </div>
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
            @click="addClick"
            >新增督导</el-button
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
        prop="supervisorName"
        label="姓名"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column prop="identity" label="身份" width="160" align="center">
        <span>督导</span>
      </el-table-column>
      <el-table-column
        prop="counselorIds"
        label="绑定咨询师"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="totalCounselNum"
        label="总督导次数"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="totalSuperviseTime"
        label="督导总时长"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="weekSchedule"
        label="周值班安排"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="240">
        <template slot-scope="scope">
          <el-button type="text" @click="editDetail(scope.row)"
            >修改</el-button
          >
          <el-button type="text" @click="editSchedule(scope.row)"
            >更新排班</el-button
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
  {id:"MON",label:'周一'},
  {id:"TUE",label:'周二'},
  {id:"WED",label:'周三'},
  {id:"THU",label:'周四'},
  {id:"FRI",label:'周五'},
  {id:"SAT",label:'周六'},
  {id:"SUN",label:'周日'},
];
import {
  AddSupervisor,
  UpdateSupervisor,
  DeleteSupervisor,
  GetSupervisorById,
  GetSupervisorList,
} from "@/api/supervisor";
import { AddUser, UpdateUser, GetUserById } from "@/api/users";
import {GetSupervisorScheduleById,UpdateDefaultSchedule }from"@/api/schedule";
import axios from "axios";

export default {
  data() {
        // 手机号：
	var validateMobilePhone = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('手机号不可为空'));
	        } else {
	          if (value !== '') { 
	            var reg=/^1[3456789]\d{9}$/;
	            if(!reg.test(value)){
	              callback(new Error('请输入有效的手机号码'));
	            }
	          }
	          callback();
	        }
	      };
// 邮箱：
	var validateEmail = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请正确填写邮箱'));
	        } else {
	          if (value !== '') { 
	            var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	            if(!reg.test(value)){
	              callback(new Error('请输入有效的邮箱'));
	            }
	          }
	          callback();
	        }
	      };
// 密码：
	var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('密码格式不正确'));
	        } else if(value.length < 6){
	          callback(new Error('密码长度最小6位'))
	        }else{
	          callback();
	        }
	      };
//用户姓名：

var validateUsername = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('用户名不能为空'));
	        }else{
	          var reg=/^([\u4e00-\u9fa5])(\s*[\u4e00-\u9fa5])*$|^[a-zA-Z0-9]+\s*[\.·\-()a-zA-Z]*[a-zA-Z]+$/;
	          if(!reg.test(value)){
	            callback(new Error('请输入正确的用户名'));
	          }else{
	            callback();
	          }
	        } 
	      };
//用户名：
	var validateAccountname = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('用户名不能为空'));
	        }else{
	          var reg= /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
	          if(!reg.test(value)){
	            callback(new Error('请输入正确的用户名'));
	          }else{
	            callback();
	          }
	        } 
	      };
//身份证号：
	var  validateIDCard=(rule, value, callback)=>{
	    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
	      callback(new Error('身份证号码不规范'));
	    } else {
	      callback()
	    }
	  }
  //年龄
	var validateIntegerP=(rule, value, callback)=> {
	    if (value && !(/^[1-9]\d*$/).test(value)) {
	      callback(new Error('只能填写正整数'));
	    } else {
	      callback()
	    }
	  }

    return {
      activeTab: "personInfo",
      dialogVisible: false,
      weeks:weekOptions,
      dialogEditScheduleVisible:false,
      dialogUpdateVisible:false,
      listQuery: {
        page: 1,
        size: 10,
        searchCondition: "",
      },
      total: 0,
      listLoading: false,
      list: [],
      scheduleList:[],
      updateId:"",
      editScheduleForm:{
        name:"",
        id:"",
        supervisor:[],
        weekSchedule:[],
        weekScheduleString:[],
      },
      updateForm: {
        name: "",
        gender: "",
        age: 0,
        idNumber: "",
        phone: "",
        email: "",
        accountName: "",
        password: "",
        workUnit: "",
        title: "",
        credit: "",
        creditNumber: "",
      },
      resetForm: {
        name: "",
        gender: "",
        age: 0,
        idNumber: "",
        phone: "",
        email: "",
        accountName: "",
        password: "",
        workUnit: "",
        title: "",
        credit: "",
        creditNumber: "",
      },
      addForm: {
        name: "",
        gender: "",
        age: 0,
        idNumber: "",
        phone: "",
        email: "",
        accountName: "",
        password: "",
        workUnit: "",
        title: "",
        credit: "",
        creditNumber: "",
      },
      addRules: {
        name: [{ required: true, message: "请输入姓名",trigger: ["blur"] },
               {validator:validateUsername,trigger: ["blur"] }],
        age: [{ required: true,message: "请输入年龄", trigger: ["blur"] },
              { validator:validateIntegerP, trigger: ["blur"]}],
        phone: [{ required: true, message: "请输入手机号", trigger: ["blur"] },
                { validator:validateMobilePhone, trigger: ["blur"]}],
        idNumber: [{ required: true, message: "请输入身份证号",trigger: ["blur"] },
                   { validator:validateIDCard, trigger: ["blur"]}], 
        email:[{ required: true, message: "请输入邮箱", trigger: ["blur"] },
                   { validator:validateEmail, trigger: ["blur"]}], 
        password:[{ required: true, message: "请输入密码", trigger: ["blur"] },
                   { validator:validatePass, trigger: ["blur"]}], 
        gender:[{ required: true, message: "请选择性别", trigger: ["blur"] }],
        accountName:[{ required: true, message: "请输入用户名", trigger: ["blur"] }],
        credit:[{ required: true, message: "请输入督导资质", trigger: ["blur"] }],
        creditNumber:[{ required: true, message: "请输入资质编号", trigger: ["blur"] }],
      },
      editRules: {
        name: [{ required: true, message: "请输入姓名",trigger: ["blur"] },
               {validator:validateUsername,trigger: ["blur"] }],
        age: [{ required: true,message: "请输入年龄", trigger: ["blur"] },
              { validator:validateIntegerP, trigger: ["blur"]}],
        phone: [{ required: true, message: "请输入手机号", trigger: ["blur"] },
                { validator:validateMobilePhone, trigger: ["blur"]}],
        idNumber: [{ required: true, message: "请输入身份证号",trigger: ["blur"] },
                   { validator:validateIDCard, trigger: ["blur"]}], 
        email:[{ required: true, message: "请输入邮箱", trigger: ["blur"] },
                   { validator:validateEmail, trigger: ["blur"]}], 
        gender:[{ required: true, message: "请选择性别", trigger: ["blur"] }],
        accountName:[{ required: true, message: "请输入用户名", trigger: ["blur"] }],
        credit:[{ required: true, message: "请输入督导资质", trigger: ["blur"] }],
        creditNumber:[{ required: true, message: "请输入资质编号", trigger: ["blur"] }],
     },
     editScheduleRules: {
        name: [{ required: true, message: "请输入姓名", trigger: ["blur"] }],
     }
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
        size: this.listQuery.size
      };
      GetSupervisorList(para).then((res) => {
        console.log(res.data.datas[0]);
        if (res.data.code === "000") {
          this.list = res.data.datas[0].content;
          this.total = res.data.datas[0].totalElements;
          for(let i =0;i<res.data.datas[0].content.length;i++){
          this.list[i].totalSuperviseTime = this.formatSeconds(res.data.datas[0].content[i].totalCounselTime);
          GetSupervisorScheduleById(this.list[i].id).then((res)=>{
             if (res.data.code === "000") {
               this.scheduleList = res.data.datas;
               console.log(this.scheduleList);
             this.list[i].schedule= this.scheduleList[0];
             }else {
              this.$message({
              message: res.data.msg,
              type: "error",
             });
             }
          })}
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
    deleteClick(id){
      console.log(id);
      DeleteSupervisor(id).then((res) => {
        if (res.data.code === "000") {
            this.getList();
            this.$message({
              message: "删除督导成功",
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
      editSchedule(row) {
      GetSupervisorById(row.id).then((res)=>{
        console.log(res);
        if (res.data.code === "000"){
          this.editScheduleForm.name = res.data.datas[0].supervisorName;
          this.editScheduleForm.id =   res.data.datas[0].id;
        }else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
      });
      this.dialogEditScheduleVisible = true;
    },
    dialogEditScheduleSure(){
      const schedule = {
        id:this.editScheduleForm.id,
        isCounselor: false,
        weekDaysList:this.editScheduleForm.weekScheduleString,
      };
      console.log(schedule);
      UpdateDefaultSchedule(schedule).then((res)=>{
      if (res.data.code === "000") {
            console.log(res.data);
            this.getList();
            this.$message({
              message: "修改排班成功",
              type: "success",
            });
        }else {
              this.$message({
                message: res.data.msg,
                type: "error",
          });
        }
      });
      this.dialogEditScheduleVisible = false;
    },
    editDetail(row) {
      console.log(row);
      this.dialogUpdateVisible = true;
      this.updateId = row.id;
      GetSupervisorById(row.id).then((res)=>{
        console.log(res);
        if (res.data.code === "000"){
          this.updateForm.name = res.data.datas[0].supervisorName; 
          this.updateForm.gender = res.data.datas[0].gender;
          this.updateForm.phone = res.data.datas[0].phoneNum;
          this.updateForm.email = res.data.datas[0].email;
          this.updateForm.idNumber = res.data.datas[0].idCardNum;
          this.updateForm.credit = res.data.datas[0].qualification;
          this.updateForm.creditNumber = res.data.datas[0].qualificationNum;
          var accountId = res.data.datas[0].accountId;
          console.log(accountId);
          GetUserById(accountId).then((res)=>{
            console.log(res);
            if (res.data.code === "000"){
              this.updateForm.accountName = res.data.datas[0].loginName;
            }
          });
        }else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
      });
    },
    handleCheckedWeeksChange(value){
      this.editScheduleForm.weekScheduleString = value;
    },
    formatSeconds(value) {
				var secondTime = parseInt(value) // 秒
				var minuteTime = 0 // 分
				var hourTime = 0 // 小时
				if (secondTime >= 60) {
					minuteTime = parseInt(secondTime / 60)
					secondTime = parseInt(secondTime % 60)
					if (minuteTime >= 60) {
						hourTime = parseInt(minuteTime / 60)
						minuteTime = parseInt(minuteTime % 60)
					}
				}
				var result ="" +(parseInt(secondTime) < 10? "0" + parseInt(secondTime): parseInt(secondTime))

				// if (minuteTime > 0) {
					result ="" + (parseInt(minuteTime) < 10? "0" + parseInt(minuteTime) : parseInt(minuteTime)) + ":" + result
				// }
				// if (hourTime > 0) {
					result ="" + (parseInt(hourTime) < 10 ? "0" + parseInt(hourTime): parseInt(hourTime)) +":" + result
				// }
				return result
		},
    dialogUpdateSure(id) {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          const supervisor = {
            id: this.updateId,
            supervisorName: this.updateForm.name,
            phoneNum: this.updateForm.phone,
            gender:this.updateForm.gender,
            idCardNum:this.updateForm.idNumber,
            qualification:this.updateForm.credit,
            qualificationNum:this.updateForm.creditNumber,
            email:this.updateForm.email,
          };
          console.log(supervisor);
          UpdateSupervisor(supervisor).then((res) => {
            console.log(res);
            if (res.data.code === "000") {
              this.dialogUpdateVisible = false;
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
    dialogAddSure() {
      const userPara = {
        loginName: this.addForm.accountName,
        password: this.addForm.password
      };
      this.$refs["addformRef"].validate((valid) => {
        if (valid) {
          AddUser(userPara).then((res) => {
            if (res.data.code === "000") {
              const supervisor = {
                accountId: res.data.datas[0].id,
                supervisorName: this.addForm.name,
                phoneNum: this.addForm.phone,
                gender:this.addForm.gender,
                idCardNum:this.addForm.idNumber,
                qualification:this.addForm.credit,
                qualificationNum:this.addForm.creditNumber,
                email:this.addForm.email,
              };
              AddSupervisor(supervisor).then((res) => {
                if (res.data.code === "000") {
                  this.dialogVisible = false
                  this.getList()
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
    reset() {
      this.getList();
    },
    addClick() {
      this.dialogVisible = true;
      this.addForm = this.resetForm;
    },
  },
};
</script>

<style>
.el-calendar-table .el-calendar-day {
    box-sizing: border-box;
    padding: 8px;
    height: 51px;
}
</style>

<style scoped>
.el-row {
  margin-bottom: 0;
}
.toolbar {
  background: #ffffff;
  padding: 20px 0;
}
</style>