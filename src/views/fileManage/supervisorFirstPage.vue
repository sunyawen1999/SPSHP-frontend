<template>
  <section>
    <el-row :gutter="24">
      <el-col :span="13">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-card class="person-card">
              <div style="float: left">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="imgUrl"
                  :fit="fit"
                ></el-image>
              </div>
              <div>
                <span style="font-size: 18px">督导</span>
                <div>
                <el-button
                  type="info"
                  plain
                  size="small"
                  style="margin-top: 10px"
                  >会话设置</el-button
                >
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card class="today-number-card">
              <table style="margin-top:15px;rules=cols">
                <tr>
                  <th>
                    <span
                      style="margin-left: 40px; font-size: 10px; color: gray"
                      >今日咨询数</span
                    >
                  </th>
                  <th>
                    <span
                      style="margin-left: 90px; font-size: 10px; color: gray"
                      >今日咨询时长</span
                    >
                  </th>
                </tr>
                <tr>
                  <td>
                    <span
                      style="margin-left: 40px; font-size: 50px; color: black"
                      >{{user.supervisorInfo.counselToday}}</span
                    >
                  </td>
                  <td>
                    <span
                      style="margin-left: 90px; font-size: 50px; color: black"
                      >{{user.supervisorInfo.counselTime}}</span
                    >
                  </td>
                </tr>
              </table>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="16">
            <el-card class="table-card">
              <div>
              <span style="font-size: 15px">在线咨询师</span>
            </div>
              <el-table
                :data="counselorTableData"
                style="width: 100%;margin-top: 8px"
                :show-header="false"
              >
                <el-table-column
                  prop="counselorName"
                  label="咨询师"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="workStatus"
                  label="咨询师状态"
                  width="180"
                >
                  <template slot-scope="scope">
                    <span v-show="scope.row.workStatus === 'idle'">空闲</span>
                    <span v-show="scope.row.workStatus === 'busy'">忙碌</span>
                    <span v-show="scope.row.workStatus === 'left'">忙碌</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="number-card">
              <div style="margin-top: 20px">
                <span style="font-size: 10px; color: white">正在咨询</span>
              </div>
              <span style="font-size: 50px; color: white">12345</span>
            </el-card>
          </el-col>
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
      <div style="margin-left: 15px">
        <span style="font-size: 15px">最近完成的求助对话</span>
        <el-button type="text" @click="1">查看全部>></el-button>
      </div>
      <el-card class="table-card">
        <el-table :data="helpTableData" stripe style="width: 100%">
          <el-table-column prop="name" label="咨询师" width="180">
          </el-table-column>
          <el-table-column prop="duration" label="咨询时长" width="180">
          </el-table-column>
          <el-table-column prop="date" label="咨询日期"> </el-table-column>
          <el-table-column label="操作">
            <!-- <template slot-scope="scope"> -->
            <el-button type="text" @click="1">查看详情</el-button>
            <el-button type="text" @click="1">导出记录</el-button>
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
import { GetCounselorToday } from "@/api/consultant";
import { GetSupervisorScheduleById } from "@/api/schedule";

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
      saveShow: false,
      fullScreenShow: false,
      teleport: true,
      pageOnly: false,
      counselorTableData: [],
      selectTime: new Date(),
      scheduleList: [],
      user:{},
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.getSupervisorSchedule();
    this.getCounselorToday();
  },
  methods: {
      getSupervisorSchedule(){
        this.user = JSON.parse(sessionStorage.getItem("user"));
      GetSupervisorScheduleById(this.user.supervisorId).then((res) => {
        if (res.data.code === "000") {
          this.scheduleList = res.data.datas;
          for(var i=0;i<this.scheduleList.length;i++){
            this.scheduleList[i] = this.scheduleList[i].substr(0,10)
          }
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    getCounselorToday() {
      GetCounselorToday().then((res) => {
        if (res.data.code === "000") {
          this.counselorTableData = res.data.datas
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
            offset: 200,
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
.el-row {
  margin-bottom: 0;
}
.table {
  border-collapse: separate;
  border-spacing: 100px;
}
.person-card {
  width: 100%;
  height: 185px;
}
.number-card {
  margin-top: 10px;
  text-align: center;
  padding-left: 0px;
  height: 168px;
  background-color: #3b536f;
  height: 195px;
}
.today-number-card {
  /* margin-top: 15px; */
  height: 185px;
}
.second-table-card {
  margin-top: 15px;
  height: 155px;
}
.first-line {
  margin-top: 15px;
  height: 155px;
}
.calendar-card {
  height: 390px;
}
.table-card {
  margin-top: 10px;
  height: 195px;
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