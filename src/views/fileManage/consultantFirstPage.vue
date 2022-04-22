<template>
  <section>
    <el-row :gutter="24">
      <el-col :span="13">
        <el-row :gutter="24">
          <el-col :span="16">
            <el-card class="person-card">
              <div style="float: left">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="imgUrl"
                  
                ></el-image>
              </div>
              <div>
                <span style="font-size: 18px">咨询师</span>
                <span style="margin-left: 15px; font-size: 10px; color: #13c013"
                  >在线</span
                >
                <span style="float: right; margin-top: 4px">{{workStatus}}</span>
                <div class="bottom clearfix">
                  <span style="margin-top: 20px">我的综合评价</span>
                  <el-rate v-model="rate" style="margin-top: 10px"></el-rate>
                  <el-button
                    type="info"
                    plain
                    size="small"
                    style="margin-top: 10px"
                    >咨询设置</el-button
                  >
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="number-card">
              <div style="margin-top:20px;">
                <span style="font-size: 10px;color: white">累计完成咨询</span>
              </div>
              <span style="font-size: 50px;color: white">{{counselNum}}</span>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-card class="today-number-card">
            <table style="margin-top:45px;rules=cols">
            <tr>
              <th><span style="margin-left:40px;font-size:10px;color: gray">今日咨询数</span></th>
              <th><span style="margin-left:150px;font-size: 10px;color: gray">今日咨询时长</span></th>
              <th><span style="margin-left:150px;font-size: 10px;color: gray">当前会话数</span></th>
            </tr>
            <tr>
              <td><span style="margin-left:40px;font-size: 50px;color: black">{{counselToday}}</span></td>
              <td><span style="margin-left:150px;font-size: 50px;color: black">{{counselTime}}</span></td>
              <td><span style="margin-left:150px;font-size: 50px;color: black">123</span></td>
            </tr>
            </table>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="11">
        <el-card class="calendar-card">
          <el-calendar v-model="selectTime"> 
            <template slot="dateCell" slot-scope="{ data }">
              <p>
              {{ data.day.split("-").slice(2).join("-") }}
            </p>
            <div v-for="(item, index) in scheduleList" :key="index">
              
              <i class="el-icon-date" v-if="data.day == item"></i>
              
            </div>
          </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
        <el-card class="table-card">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="咨询人" width="180">
        </el-table-column>
        <el-table-column prop="duration" label="咨询时长" width="180">
        </el-table-column>
        <el-table-column prop="date" label="咨询日期"> </el-table-column>
        <el-table-column prop="grade" label="咨询评级"> </el-table-column>
        <el-table-column prop="evaluate" label="咨询评价"> </el-table-column>
        <el-table-column label="操作">
            <!-- <template slot-scope="scope"> -->
          <el-button
            type="text"
            @click="1"
            >查看详情</el-button
          >
          <el-button
            type="text"
            @click="1"
            >导出记录</el-button
          >
        <!-- </template> -->
        </el-table-column>
      </el-table>
        </el-card>
    </el-row>
  </section>
</template>

<script>
//import { GetTableLogs } from "@/api/graphAndTable";
import login from "@/assets/person.png";
import { GetCounselorById } from "@/api/consultant";
import { GetConselorScheduleById } from "@/api/schedule";

export default {
  data() {
    return {
      imgUrl: login,
      currentDate: new Date(),
      rate: "",
      tableData: [],
      form: {
        outFileName: "",
        projectName: "",
        sec: 0,
        tableName: "",
        plotIns: "",
      },
      graphId: "",
      counselNum:0,
      counselToday:0,
      counselTime:0,
      workStatus:"",
      saveShow: false,
      fullScreenShow: false,
      teleport: true,
      pageOnly: false,
      user:{},
      scheduleList: [],
      selectTime: new Date(),
    };
  },
  mounted() {
    this.getList();
    this.getCounselorSchedule();
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
  methods: {
    getList(){
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.counselNum = this.user.counselorInfo.counselNum;
      this.counselToday = this.user.counselorInfo.counselToday;
      this.counselTime = this.user.counselorInfo.counselTime;
      if(this.user.counselorInfo.workStatus === "busy"){
        this.workStatus = "繁忙";
      }else{
        this.workStatus = "空闲";
      }
      this.rate = this.user.counselorInfo.evaluateScore;
      this.tableData = this.user.counselInfos;
    },
    getCounselorSchedule() {
      console.log(this.user.counselorId)
      GetConselorScheduleById(this.user.counselorId).then((res) => {
        if (res.data.code === "000") {
          this.scheduleList = res.data.datas;
          for(var i=0;i<this.scheduleList.length;i++){
            this.scheduleList[i] = this.scheduleList[i].substr(0,10)
          }
          //console.log(this.scheduleList)
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    editBtn() {
      this.saveShow = true;
    },
    cancel() {
      this.saveShow = false;
    },
    fullScreen() {
      this.fullScreenShow = true;
    },
    /* getGraph(id) {
      GetGraphById(id).then((res) => {
        if (res.data.code === "000") {
          this.form = res.data.datas[0];
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    }, */
    saveBtn() {
      UpdateGraph(this.form).then((res) => {
        if (res.data.code === "000") {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.backTo();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
            offset: 200,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-table .el-calendar-day {
    box-sizing: border-box;
    padding: 8px;
    height: 51px;
}
</style>

<style scoped>
.el-card__body {
    padding: 0;
}
.el-row {
  margin-bottom: 0;
}
.table{
  border-collapse: separate;
  border-spacing: 100px; 
}
.person-card {
  width: 100%;
}
.number-card {
  text-align: center; 
  padding-left: 0px;
  height: 168px;
  background-color: #3b536f;
}
.today-number-card {
  margin-top: 20px;
  height: 200px;
}
.calendar-card {
  height: 390px;
}
.table-card {
    margin-top: 10px
}
.status {
  float: left;
  margin-left: 19px;
  margin-top: 5px;
  color: #07be07;
}
.label {
  float: right;
  margin-left: 30px;
}
.toolbar {
  background: #ffffff;
  padding: 20px 0;
}
.input {
  width: 600px;
  margin-top: 10px;
}
.graph {
  float: left;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 20px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>