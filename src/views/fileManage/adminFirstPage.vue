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
          </el-card>
      </el-col>
      <el-col span="8">
          <el-card class="second-line">
              <span>在线咨询师</span>
          </el-card>
      </el-col>
    </el-row>
    <el-row gutter="24">
        <el-col span="12">
            <el-card class="third-line">
                <span>七日咨询数量统计</span>
            </el-card>
        </el-col>
        <el-col span="6">
            <el-card class="third-line">
                <span>当月咨询数量排行</span>
            </el-card>
        </el-col>
        <el-col span="6">
            <el-card class="third-line">
                <span>当月好评数量排行</span>
            </el-card>
        </el-col>
    </el-row>
  </section>
</template>

<script>
//import { GetTableLogs } from "@/api/graphAndTable";
import echarts from 'echarts'
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
    };
  },
  mounted() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById('graph'));
      let option = {
        color: ['#f44'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
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
            name:'每月花费',
            type:'bar',
            barWidth: '60%',
            data:[995,666,444,858,654,236,645,546,846,225,547,356]
          }
        ]
      };
      myChart.setOption(option);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
  },
  methods: {
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