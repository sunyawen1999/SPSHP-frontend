<template>
  <section>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card class="first-line">
          <table style="margin-top:15px;rules=cols">
            <tr>
              <th>
                <span style="margin-left: 40px; font-size: 10px; color: gray"
                  >今日咨询数</span
                >
              </th>
              <th>
                <span style="margin-left: 90px; font-size: 10px; color: gray"
                  >今日咨询时长</span
                >
              </th>
            </tr>
            <tr>
              <td>
                <span style="margin-left: 40px; font-size: 50px; color: black"
                  >123</span
                >
              </td>
              <td>
                <span style="margin-left: 90px; font-size: 50px; color: black"
                  >123</span
                >
              </td>
            </tr>
          </table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="first-line">
          <span>今日咨询数量变化</span>
          <div id="graph"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="second-line">
          <el-row :gutter="24">
            <el-col :span="12">
              <span>在线咨询师</span>
              <el-table
                :data="counselorTableData1"
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
                    <span v-show="scope.row.workStatus === 'left'">离开</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-pagination
              small
                background
                layout="prev, pager, next"
                @current-change="getCounselorList"
                :page-size="listQuery.size"
                :current-page.sync="listQuery.page"
                :total="totalCounselor"
              >
              </el-pagination>
              <el-table
                :data="counselorTableData2"
                style="width: 100%"
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
                    <span v-show="scope.row.workStatus === 'left'">离开</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="second-line">
          <el-row :gutter="24">
            <el-col :span="12">
              <span>在线督导</span>
              <el-table
                :data="supervisorTableData1"
                style="width: 100%;margin-top: 8px"
                :show-header="false"
              >
                <el-table-column
                  prop="supervisorName"
                  label="督导"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="workStatus"
                  label="督导状态"
                  width="180"
                >
                  <!-- <template slot-scope="scope">
                    <span v-show="scope.row.workStatus === 'idle'">空闲</span>
                    <span v-show="scope.row.workStatus === 'busy'">忙碌</span>
                    <span v-show="scope.row.workStatus === 'left'">离开</span>
                  </template> -->
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-pagination
              small
                background
                layout="prev, pager, next"
                @current-change="getSupervisorList"
                :page-size="listQuerySuper.size"
                :current-page.sync="listQuerySuper.page"
                :total="totalSupervisor"
              >
              </el-pagination>
              <el-table
                :data="supervisorTableData2"
                style="width: 100%"
                :show-header="false"
              >
                <el-table-column
                  prop="supervisorName"
                  label="督导"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="workStatus"
                  label="督导状态"
                  width="180"
                >
                  <!-- <template slot-scope="scope">
                    <span v-show="scope.row.workStatus === 'idle'">空闲</span>
                    <span v-show="scope.row.workStatus === 'busy'">忙碌</span>
                    <span v-show="scope.row.workStatus === 'left'">离开</span>
                  </template> -->
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="third-line">
          <span>七日咨询数量统计</span>
          <div id="graph_week"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="third-line">
          <span>当月咨询数量排行</span>
          <el-table
            :data="monthConsultationTableData"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="name" label="咨询师" width="180">
            </el-table-column>
            <el-table-column prop="sum" label="咨询数量" width="180">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="third-line">
          <span>当月好评数量排行</span>
          <el-table :data="monthEvaluateTableData" stripe style="width: 100%">
            <el-table-column prop="name" label="咨询师" width="180">
            </el-table-column>
            <el-table-column prop="evaluateSum" label="好评数量" width="180">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
//import { GetTableLogs } from "@/api/graphAndTable";
import { GetCounselWeekAll, GetCounselTodayAll } from "@/api/consultation";
import { GetCounselorToday, GetCounselorList } from "@/api/consultant";
import {
  GetSupervisorList,
} from "@/api/supervisor";
import * as echarts from "echarts";
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        size: 8
      },
      listQuerySuper: {
        page: 1,
        size: 8
      },
      totalCounselor: 0,
      totalSupervisor: 0,
      currentDate: new Date(),
      rate: "",
      counselorTableData1: [],
      counselorTableData2: [],
      supervisorTableData1: [],
      supervisorTableData2: [],
      monthEvaluateTableData: [],
      monthConsultationTableData: [],
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
      graphWeekDate:[],
      graphWeekNum:[],
      graphTodayNum:[],
      graphTodayTime:[],
    };
  },
  mounted() {
    let this_ = this;
    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    this.initChart();
    this.initChart2();
    this.getCounselorList();
    this.getSupervisorList();
    this.getList();
  },
  methods: {
  initChart(){
    let tabledata = [];
    GetCounselTodayAll().then((res) => {
         console.log(res.data.datas);
         if (res.data.code === "000") {
           tabledata =  JSON.parse(JSON.stringify(res.data.datas));
           for(let i=0;i<6;i++){
            this.graphTodayNum[i]=tabledata[i].counselNum;
            this.graphTodayTime[i]=tabledata[i].duringTime.slice(11,16);
            }
         }
    let graphTodayTimeArr = JSON.parse(JSON.stringify(this.graphTodayTime));
    let graphTodayNumArr = JSON.parse(JSON.stringify(this.graphTodayNum));
    let myChart = echarts.init(document.getElementById("graph"));
    let option = {
      color: ["#FFCC00"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: [
        {
          type: "category",
          data: graphTodayTimeArr,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "咨询量",
          type: "line",
          data: graphTodayNumArr,
          smooth: true,
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(192,255,62)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,255,224)",
                  },
                ],
              },
            },
          },
        },
      ],
    };
    myChart.setOption(option);

    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    window.addEventListener("resize", function () {
      myChart.resize();
    });
   });
  },
  initChart2(){
    let tabledata = [];
    GetCounselWeekAll().then((res) => {
         console.log(res.data.datas);
         if (res.data.code === "000") {
           tabledata =  JSON.parse(JSON.stringify(res.data.datas));
           for(let i=0;i<7;i++){
            this.graphWeekNum[i]=tabledata[i].counselNum;
            this.graphWeekDate[i]=tabledata[i].duringTime.slice(0,3);
            }
         }
    let graphWeekDateArr = JSON.parse(JSON.stringify(this.graphWeekDate));
    let graphWeekNumArr = JSON.parse(JSON.stringify(this.graphWeekNum));
    let myChart2 = echarts.init(document.getElementById("graph_week"));
    let option2 = {
      color: ["#43CD80"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: [
        {
          type: "category",
          data: graphWeekDateArr,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "日咨询量",
          type: "line",
          data:graphWeekNumArr,
        },
      ],
    };
    myChart2.setOption(option2);
    window.addEventListener("resize", function () {
    myChart2.resize();
    });
   });
  },
    getList() {
      GetCounselorToday().then((res) => {
        console.log(res.data.datas);
        if (res.data.code === "000") {
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    getCounselorList() {
      const para = {
        page: this.listQuery.page - 1,
        size: this.listQuery.size,
      };
      GetCounselorList(para).then((res) => {
        if (res.data.code === "000") {
          this.counselorTableData1 = res.data.datas[0].content.slice(0,4);
          this.counselorTableData2 = res.data.datas[0].content.slice(4,8);
          this.totalCounselor = res.data.datas[0].totalElements;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    getSupervisorList() {
      const para = {
        page: this.listQuerySuper.page - 1,
        size: this.listQuerySuper.size,
      };
      GetSupervisorList(para).then((res) => {
        if (res.data.code === "000") {
          this.supervisorTableData1 = res.data.datas[0].content.slice(0,4);
          this.supervisorTableData2 = res.data.datas[0].content.slice(4,8);
          this.totalSupervisor = res.data.datas[0].totalElements;
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
  },
};
</script>

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
}
.number-card {
  text-align: center;
  padding-left: 0px;
  height: 168px;
  background-color: #3b536f;
}
.first-line {
  margin-top: 15px;
  height: 155px;
}
.second-line {
  margin-top: 15px;
  height: 250px;
}
.third-line {
  margin-top: 15px;
  height: 230px;
}
.calendar-card {
  height: 390px;
}
.table-card {
  margin-top: 10px;
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
#graph {
  width: 100%;
  height: 100px;
  border: 1px solid black;
  margin: 0 auto;
}
#graph_week {
  width: 100%;
  height: 150px;
  border: 1px solid black;
  margin: 0 auto;
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