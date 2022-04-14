<template>
  <section>
    <el-row gutter="24">
      <el-col span="8">
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
      <el-col span="16">
          <el-card class="first-line">
              <span>今日咨询数量变化</span>
              <div id="graph"></div>
          </el-card>
      </el-col>
    </el-row>
    <el-row gutter="24">
      <el-col span="16">
          <el-card class="second-line">
              <span>在线咨询师</span>
              <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="name" label="咨询师" width="180">
              </el-table-column>
              <el-table-column prop="status" label="咨询师状态" width="180">
               </el-table-column>
              </el-table>
          </el-card>
      </el-col>
      <el-col span="8">
          <el-card class="second-line">
              <span>在线督导</span>
              <el-table :data="superivisorTableData" stripe style="width: 100%">
              <el-table-column prop="name" label="督导" width="180">
              </el-table-column>
              <el-table-column prop="status" label="督导状态" width="180">
               </el-table-column>
              </el-table>
          </el-card>
      </el-col>
    </el-row>
    <el-row gutter="24">
        <el-col span="12">
            <el-card class="third-line">
                <span>七日咨询数量统计</span>
                <div id="graph_week"></div>
            </el-card>
        </el-col>
        <el-col span="6">
            <el-card class="third-line">
                <span>当月咨询数量排行</span>
                <el-table :data="monthConsultationTableData" stripe style="width: 100%">
                <el-table-column prop="name" label="咨询师" width="180">
                </el-table-column>
                <el-table-column prop="sum" label="咨询数量" width="180">
                </el-table-column>
              </el-table>
            </el-card>
        </el-col>
        <el-col span="6">
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
import { GetCounselorToday } from "@/api/consultant";
import * as echarts from 'echarts'
export default {
  data() {
    return {
      imgUrl: login,
      currentDate: new Date(),
      rate: "",
      tableData: [],
      superivisorTableData:[],
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
    };
  },
  mounted() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById('graph'));
      let option = {
        color: ['#FFCC00'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['0:00','4:00','8:00','12:00','16:00','20:00','24:00',],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'咨询量',
            type:'line',
            data:[995,666,444,858,654,236,645,546,846,225,547,356],
            smooth:true,
            areaStyle:{
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
                      color: "rgba(192,255,62)"
                    },
                    {
                      offset: 1,
                      color: "rgba(255,255,224)"
                    }
                  ],
                }
              }
            }
          }
        ],
      };
      myChart.setOption(option);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
      let myChart2 = echarts.init(document.getElementById('graph_week'));
      let option2 = {
        color: ['#43CD80'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['周一','周二','周三','周四','周五','周六','周日',],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'日咨询量',
            type:'line',
            data:[995,666,444,858,654,236,645]
          }
        ]
      };
      myChart2.setOption(option2);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart2.resize()});
      this.getList();
  },
  methods: {
    getList(){
      GetCounselorToday().then((res) => {
        console.log(res);
        if (res.data.code === "000") {

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
    getGraph(id) {
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

<style scoped>
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
.first-line {
  margin-top: 15px;
  height: 155px;
}
.second-line {
    margin-top: 15px;
    height: 185px;
}
.third-line {
    margin-top: 15px;
    height: 230px;
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