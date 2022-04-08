<template>
  <section>
    <el-row :gutter="24">
      <el-col :span="20">
        <el-calendar v-model="selectTime">
          <template slot="dateCell" slot-scope="{ data }">
            <p @click="handleClick(data.day)">
              {{ data.day.split("-").slice(2).join("-") }}<br />
            </p>
            <span style="float: left">咨询师:</span>
            <div v-for="(item, index) in calendarData" :key="index">
              <div
                v-if="data.day == item.day"
                style="float: left; margin-top: 2px"
              >
                {{ item.consultant }}
              </div>
            </div>
            <span style="float: left; margin-left: 20px">督导:</span>
            <div v-for="(item, index) in calendarData" :key="index + '100'">
              <!-- 加'100'是为了解决key报错 -->
              <div
                v-if="data.day == item.day"
                style="float: left; margin-top: 2px"
              >
                {{ item.supervise }}
              </div>
            </div>
          </template>
        </el-calendar>
      </el-col>
      <el-col :span="4">
        <div>
          {{ this.selectTimeShow }}
        </div>
        <el-divider></el-divider>
        <el-menu
          :default-active="activeIndex"
          text-color="rgba(134, 144, 156, 1)"
          active-text-color="rgba(0, 77, 171, 1)"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">咨询师</el-menu-item>
          <el-menu-item index="2">督导</el-menu-item>
        </el-menu>
        <el-button
          type="text"
          style="margin-left: 40px"
          v-if="this.counselorShow == true"
          @click="addCounselor"
          >+ 添加咨询师</el-button
        >
        <el-button
          type="text"
          style="margin-left: 40px"
          v-if="this.counselorShow == false"
          @click="addSupervisor"
          >+ 添加督导</el-button
        >
        <el-divider></el-divider>
        <el-table :data="counselorShowList" style="width: 100%" v-show="this.counselorShow == true">
          <el-table-column prop="id" width="80" label="id">
          </el-table-column>
          <el-table-column prop="name" width="80" label="name">
          </el-table-column>
        </el-table>
        <el-table :data="supervisorShowList" style="width: 100%" v-show="this.counselorShow == false">
          <el-table-column prop="id" width="80" label="id">
          </el-table-column>
          <el-table-column prop="name" width="80" label="name">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      title="添加咨询师"
      :visible.sync="counselorDialogVisible"
      width="30%"
    >
      <el-select
        style="width: 300px"
        size="small"
        v-model="counselorAdd"
        multiple
        placeholder="请选择、可多选"
      >
        <el-option
          v-for="(item, index) in counselorList"
          :key="index"
          :label="item.counselorName"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="counselorDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="counselorAddConfirm()"
          >确 认</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="添加督导"
      :visible.sync="supervisorDialogVisible"
      width="30%"
    >
      <el-select
        style="width: 300px"
        size="small"
        v-model="supervisorAdd"
        multiple
        placeholder="请选择、可多选"
      >
        <el-option
          v-for="(item, index) in supervisorList"
          :key="index"
          :label="item.supervisorName"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="supervisorDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="supervisorAddConfirm()"
          >确 认</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {
  AddSchedule,
  UpdateSchedule,
  DeleteSchedule,
  GetScheduleById,
  GetScheduleList,
  UpdateDefaultSchedule,
} from "@/api/schedule";
import { GetCounselorList } from "@/api/consultant";
import { GetSupervisorList } from "@/api/supervisor";

export default {
  data() {
    return {
      calendarData: [],
      selectTime: new Date(),
      selectTimeShow: "",
      activeIndex: "1",
      scheduleId: "",
      counselorShow: true,
      counselorDialogVisible: false,
      supervisorDialogVisible: false,
      counselorAdd: [],
      supervisorAdd: [],
      counselorList: [],
      supervisorList: [],
      scheduleList: [],
      scheduleTodayList: [],
      counselorShowList: [],
      supervisorShowList: [],
    };
  },
  mounted() {
    //this.getList();
    this.getCounselorList();
    this.getSupervisorList();
    this.getSchedule();
    this.selectTimeShow = this.selectTime;
  },
  methods: {
    handleClick(day) {
      this.counselorShowList = []
      this.supervisorShowList = []
      this.selectTimeShow = day;
      for(var i=0;i<this.calendarData.length;i++) {
        if(this.selectTimeShow === this.calendarData[i].day) {
          this.scheduleId = this.calendarData[i].id
        }
      }
      GetScheduleById(this.scheduleId).then((res) => {
        if (res.data.code === "000") {
          this.scheduleTodayList = res.data.datas[0];
          let counselor = this.scheduleTodayList.counselorIds
          for(var j=0;j<counselor.length;j++) {
            for(var i=0;i<this.counselorList.length;i++) {
              if(counselor[j] === this.counselorList[i].id){
                this.counselorShowList.push({
                  id: this.counselorList[i].id,
                  name: this.counselorList[i].counselorName
                })
                break
              }
            }
          }
          let supervisor = this.scheduleTodayList.supervisorIds
          for(var j=0;j<supervisor.length;j++) {
            for(var i=0;i<this.supervisorList.length;i++) {
              if(supervisor[j] === this.supervisorList[i].id){
                this.supervisorShowList.push({
                  id: this.supervisorList[i].id,
                  name: this.supervisorList[i].supervisorName
                })
                break
              }
            }
          }
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key);
      if (key === "1") {
        this.counselorShow = true;
      } else if (key === "2") {
        this.counselorShow = false;
      }
    },
    getSchedule() {
      this.calendarData = []
      const para = {
        //...this.listQuery,
        page: 0,
        size: 2147483647,
      };
      GetScheduleList(para).then((res) => {
        if (res.data.code === "000") {
          this.scheduleList = res.data.datas[0].content;
          for (var i = 0; i < this.scheduleList.length; i++) {
            this.calendarData.push({
              id: this.scheduleList[i].id,
              day: this.scheduleList[i].date.substr(0, 10),
              consultant: this.scheduleList[i].counselorIds.length,
              supervise: this.scheduleList[i].supervisorIds.length,
            });
          }
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    getCounselorList() {
      const that = this;
      const para = {
        //...this.listQuery,
        page: 0,
        size: 2147483647,
      };
      GetCounselorList(para).then((res) => {
        if (res.data.code === "000") {
          this.counselorList = res.data.datas[0].content;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    getSupervisorList() {
      const that = this;
      const para = {
        //...this.listQuery,
        page: 0,
        size: 2147483647,
      };
      GetSupervisorList(para).then((res) => {
        if (res.data.code === "000") {
          this.supervisorList = res.data.datas[0].content;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    addCounselor() {
      this.counselorDialogVisible = true;
    },
    counselorAddConfirm() {
      for(var i=0;i<this.calendarData.length;i++) {
        if(this.selectTimeShow === this.calendarData[i].day) {
          this.scheduleId = this.calendarData[i].id
        }
      }
      for(var i=0;i<this.scheduleList.length;i++) {
        if(this.scheduleId === this.scheduleList[i].id) {
          this.supervisorAdd = this.scheduleList[i].supervisorIds
        }
      }
      const para = {
        id: this.scheduleId,
        date: this.selectTimeShow,
        counselorIds: this.counselorAdd,
        supervisorIds: this.supervisorAdd
      }
      UpdateSchedule(para).then((res) => {
        if (res.data.code === "000") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.getSchedule()
          this.counselorDialogVisible = false
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    addSupervisor() {
      this.supervisorDialogVisible = true;
    },
    supervisorAddConfirm() {
      for(var i=0;i<this.calendarData.length;i++) {
        if(this.selectTimeShow === this.calendarData[i].day) {
          this.scheduleId = this.calendarData[i].id
        }
      }
      for(var i=0;i<this.scheduleList.length;i++) {
        if(this.scheduleId === this.scheduleList[i].id) {
          this.counselorAdd = this.scheduleList[i].counselorIds
        }
      }
      const para = {
        id: this.scheduleId,
        date: this.selectTimeShow,
        counselorIds: this.counselorAdd,
        supervisorIds: this.supervisorAdd
      }
      UpdateSchedule(para).then((res) => {
        if (res.data.code === "000") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.getSchedule()
          this.supervisorDialogVisible = false
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
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