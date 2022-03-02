<template>
  <section>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="14">
          <div
            v-for="o in userInfo"
            :key="o.index"
            v-if="o.content"
            class="text-item"
          >{{ o.title }}{{ o.content }}</div>
        </el-col>
        <el-col :span="10">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        </el-col>
      </el-row>
    </el-card>
  </section>
</template>

<script>
import { UserMe } from "@/api/users";
export default {
  data() {
    return {
      imageUrl: "",
      userInfo: [
        {
          index: 1,
          title: "账号类型 ： ",
          content: ""
        },
        {
          index: 2,
          title: "企业类型 ： ",
          content: ""
        },
        {
          index: 3,
          title: "企业名称 ： ",
          content: ""
        },
        {
          index: 4,
          title: "工号 ：",
          content: ""
        },
        {
          index: 5,
          title: "姓名 ： ",
          content: ""
        },
        {
          index: 6,
          title: "负责人 ： ",
          content: ""
        },
        {
          index: 7,
          title: "电话(账号) ： ",
          content: ""
        }
      ]
    };
  },
  methods: {
    getUserMe() {
      const that = this;
      UserMe().then(res => {
        const result = res.data.datas[0];
        that.userInfo[0].content = that.formatAccountType(result.accountType);
        if (result.accountType !== "police") {
          that.userInfo[1].content = that.formatCompanyType(
            result.company.companyType
          );
          that.userInfo[2].content = result.company.companyName;
        }
        that.userInfo[3].content = result.employeeNo;
        if (result.accountType === "enterprise") {
          that.userInfo[5].content = result.company.contactName;
        } else if (result.accountType === "staff") {
          that.userInfo[4].content = result.displayName;
        }
        that.userInfo[6].content = result.phoneNumber;
        that.imageUrl = result.photo;
      });
    },
    formatAccountType(accountType) {
      return accountType == "enterprise"
        ? "企业账号"
        : accountType == "staff"
        ? "员工账号"
        : accountType == "police"
        ? "公安"
        : accountType;
    },
    formatCompanyType(companyType) {
      return companyType == "expressCompany"
        ? "快递公司"
        : companyType == "disposalCompany"
        ? "处置公司"
        : companyType == "securityCompany"
        ? "保安公司"
        : companyType == "repairCompany"
        ? "运维公司"
        : companyType;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    }
  },
  mounted() {
    this.getUserMe();
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  padding: 50px;

  .text-item {
    line-height: 50px;
    font-size: 18px;
  }
}
</style>
