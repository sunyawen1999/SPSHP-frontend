<template>
  <section>
    <el-row :gutter="24">
      <el-col :span="13">
        <el-row :gutter="24">
          <el-col :span="16">
            <el-card class="person-card">
              <div style="float: left">
                <el-image
                  style="width: 125px; height: 125px"
                  :src="imgUrl"
                ></el-image>
              </div>
              <div>
                <span style="font-size: 18px">{{
                  this.user.counselorInfo.counselorName
                }}</span>
                <span style="margin-left: 15px; font-size: 10px; color: #13c013"
                  >在线</span
                >
                <span style="float: right; margin-top: 4px">{{
                  workStatus
                }}</span>
                <div class="bottom clearfix">
                  <span style="margin-top: 20px">我的综合评价</span>
                  <el-rate
                    v-model="rate"
                    style="margin-top: 10px"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                  <!-- <el-button
                    type="info"
                    plain
                    size="small"
                    style="margin-top: 10px"
                    >咨询设置</el-button
                  > -->
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="number-card">
              <div style="margin-top: 20px">
                <span style="font-size: 10px; color: white">累计完成咨询</span>
              </div>
              <span style="font-size: 50px; color: white">{{
                counselNum
              }}</span>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-card class="today-number-card">
            <table style="margin-top:45px;rules=cols">
              <tr>
                <th>
                  <span style="margin-left: 40px; font-size: 10px; color: gray"
                    >今日咨询数</span
                  >
                </th>
                <th>
                  <span style="margin-left: 150px; font-size: 10px; color: gray"
                    >今日咨询时长</span
                  >
                </th>
                <th>
                  <span style="margin-left: 150px; font-size: 10px; color: gray"
                    >当前会话数</span
                  >
                </th>
              </tr>
              <tr>
                <td>
                  <span
                    style="margin-left: 40px; font-size: 50px; color: black"
                    >{{ counselToday }}</span
                  >
                </td>
                <td>
                  <span
                    style="margin-left: 150px; font-size: 50px; color: black"
                    >{{ counselTime }}</span
                  >
                </td>
                <td>
                  <span
                    style="margin-left: 150px; font-size: 50px; color: black"
                    >123</span
                  >
                </td>
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
        <el-table :data="counselInfoList" stripe style="width: 100%">
          <el-table-column prop="customerId" label="咨询人" width="180">
          </el-table-column>
          <el-table-column prop="duration" label="咨询时长" width="180">
          </el-table-column>
          <el-table-column prop="startTime" label="咨询日期"> </el-table-column>
          <el-table-column
            prop="evaluateInfo.starToCounselor"
            label="咨询评级"
            width="160"
            align="center"
          >
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.evaluateInfo.starToCounselor"
              disabled
              text-color="#ff9900"
              score-template="{value}">
          </el-rate>
          </template>
          </el-table-column>
          <el-table-column
            prop="evaluateInfo.infoToCounselor"
            label="咨询评价"
            width="160"
            align="center"
            :formatter="numberFormat"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button type="text" @click="seeDetail(scope.row)">查看详情</el-button>
            <el-button type="text" @click="exportRecorder(scope.row.historyMessage)">导出记录</el-button>
            </template>
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
import { GetCounselByCounselor } from "@/api/consultation";
import { GetCustomerList } from "@/api/visitor";
import axios from "axios";
import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";

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
      counselNum: 0,
      counselToday: 0,
      counselTime: 0,
      workStatus: "",
      saveShow: false,
      fullScreenShow: false,
      teleport: true,
      pageOnly: false,
      user: {},
      scheduleList: [],
      selectTime: new Date(),
      counselInfoList: [],
      customerList: [],
      messageTypeTrans: {
        "TIMTextElem": "文本消息",
        "TIMImageElem": "图片消息",
        "TIMCustomElem": "系统消息"
      }
    };
  },
  mounted() {
    this.getList();
    this.getCounselorSchedule();
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user.counselorInfo.comCount != 0) {
      this.rate = this.user.counselorInfo.evaluateScore/this.user.counselorInfo.comCount;
    }
    this.getCustomerList();
    this.getCounselInfo();
  },
  methods: {
    getList() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.counselNum = this.user.counselorInfo.counselNum;
      this.counselToday = this.user.counselorInfo.counselToday;
      this.counselTime = this.user.counselorInfo.counselTime;
      if (this.user.counselorInfo.workStatus === "busy") {
        this.workStatus = "繁忙";
      } else {
        this.workStatus = "空闲";
      }
      this.rate = this.user.counselorInfo.evaluateScore;
      this.tableData = this.user.counselInfos;
    },
    getCounselorSchedule() {
      console.log(this.user.counselorId);
      GetConselorScheduleById(this.user.counselorId).then((res) => {
        if (res.data.code === "000") {
          this.scheduleList = res.data.datas;
          for (var i = 0; i < this.scheduleList.length; i++) {
            this.scheduleList[i] = this.scheduleList[i].substr(0, 10);
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
    getCustomerList() {
      const that = this;
      GetCustomerList().then((res) => {
        if (res.data.code === "000") {
          this.customerList = res.data.datas[0].content;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    getCounselInfo() {
      const para = {
        id: this.user.counselorId
      }
      GetCounselByCounselor(para).then((res) => {
        if (res.data.code === "000") {
          this.counselInfoList = res.data.datas[0].content;
          console.log(this.customerList)
          for(var i=0;i<this.counselInfoList.length;i++) {
            for(var j=0;j<this.customerList.length;j++) {
              if(this.counselInfoList[i].customerId === this.customerList[j].id){
                this.counselInfoList[i].customerId = this.customerList[j].customerName
              }
            }
            this.counselInfoList[i].duration = this.formatSeconds(this.counselInfoList[i].duration)
            this.counselInfoList[i].startTime = this.counselInfoList[i].startTime.substr(0,10) + " " + this.counselInfoList[i].startTime.substr(11,8)
          }
          //this.total = res.data.datas[0].totalElements;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    numberFormat(row, column, cellValue) {
      // console.log(row , column , cellValue)
      if (!cellValue) return "";
      if (cellValue.length > 10) {
        //最长固定显示4个字符
        return cellValue.slice(0, 10) + "...";
      }
      return cellValue;
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
      seeDetail(row) {
      this.dialogDetailVisible = true;
      GetCounselById(row.id).then((res) => {
        console.log(res);
        if (res.data.code === "000") {
          for(var j=0;j<this.counselorList.length;j++) {
              if(res.data.datas[0].counselorId === this.counselorList[j].id){
                this.detailForm.counselorName = this.counselorList[j].counselorName
              }
            }
          for(var j=0;j<this.customerList.length;j++) {
              if(res.data.datas[0].customerId === this.customerList[j].id){
                this.detailForm.customerName = this.customerList[j].customerName
              }
            }
          this.detailForm.duration = this.formatSeconds(res.data.datas[0].duration);
          this.detailForm.startTime = res.data.datas[0].startTime.substr(0,10) + " " + res.data.datas[0].startTime.substr(11,8);
          this.detailForm.evaluateInfoToCouns = res.data.datas[0].evaluateInfo.infoToCounselor;
          this.detailForm.evaluateInfoToCustom = res.data.datas[0].evaluateInfo.starToCustomer;
        }
      });
    },
    exportRecorder(group) {
      var sig = this.genTestUserSig("admin").userSig
      axios({
        method: "post",
        url: `https://console.tim.qq.com/v4/group_open_http_svc/group_msg_get_simple?sdkappid=1400638027&identifier=admin&usersig=${sig}&random=99999999&contenttype=json`,
        data: {
            GroupId: group,
            ReqMsgNumber: 10
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }).then((res) => {
      console.log(res)
      var messageListOut = []
      for(var i=0;i<res.data.RspMsgList.length;i++) {
        var content = ""
        if(res.data.RspMsgList[i].MsgBody[0].MsgType === "TIMTextElem") {
          content = res.data.RspMsgList[i].MsgBody[0].MsgContent.Text
        } else if(res.data.RspMsgList[i].MsgBody[0].MsgType === "TIMImageElem") {
          content = res.data.RspMsgList[i].MsgBody[0].MsgContent.ImageInfoArray[0].URL
        } else if(res.data.RspMsgList[i].MsgBody[0].MsgType === "TIMCustomElem") {
          content = "系统消息"
        }
        if(res.data.RspMsgList[i].MsgBody[0].MsgType !== "TIMCustomElem") {
          messageListOut.push({
            person: res.data.RspMsgList[i].From_Account,
            type: this.messageTypeTrans[res.data.RspMsgList[i].MsgBody[0].MsgType],
            content: content,
            time: this.timestampToTime(res.data.RspMsgList[i].MsgTimeStamp)
          })
        }
      }
      console.log(messageListOut)
      this.downloadMessage(group,messageListOut)
    });
    },
    downloadMessage(group,data) {
      console.log(data)
      var title = group
      var str=''
      data.forEach(item=>{
        str+='发送人:'+item.person+'   '+'发送时间:'+item.time+'   '+'消息类型:'+item.type+'   '+'内容:'+item.content+'\r\n'
      })
      var allStr = title+'\r\n'+'\r\n'+str
      var export_blob = new Blob([allStr]);
      var save_link = document.createElement("a");
      save_link.href = window.URL.createObjectURL(export_blob);
      save_link.download = '消息导出'+'.txt';
      this.fakeClick(save_link);
    },
    fakeClick(obj) {
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      obj.dispatchEvent(ev);
    },
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
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
.today-number-card {
  margin-top: 20px;
  height: 200px;
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
.graph {
  float: left;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 60px;
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