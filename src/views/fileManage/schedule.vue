<template>
  <section>
    <el-row :gutter="24">
      <el-col :span="20">
        <el-calendar v-model="selectTime">
          <template slot="dateCell" slot-scope="{ data }">
            <p>{{ data.day.split("-").slice(2).join("-") }}<br /></p>
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
            <div v-for="(item, index) in calendarData" :key="index">
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
          {{ this.selectTime }}
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
        <el-button type="text" style="margin-left: 40px"
          >+ 添加咨询师</el-button
        >
        <el-divider></el-divider>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" width="20">
          </el-table-column>
          <el-table-column prop="name" width="20">
          </el-table-column>
          <el-table-column prop="address"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>

<script>
/* import {
  DeleteDevice
} from "@/api/deviceInfo"; */
import axios from "axios";

export default {
  data() {
    return {
      calendarData: [
        { day: "2022-03-08", consultant: 12, supervise: 2 },
        { day: "2022-03-09", consultant: 10, supervise: 2 },
      ],
      selectTime: new Date(),
    };
  },
  mounted() {
    //this.getList();
  },
  methods: {
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