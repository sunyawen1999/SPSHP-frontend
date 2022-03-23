<template>
  <el-container class="container">
    <el-aside width="200px">
      <div class="top-title">
        欢迎，xxxx
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleopen"
        @close="handleclose"
        @select="handleselect"
        unique-opened
        router
      >
        <template
          v-for="(item) in $router.options.routes"
          v-if="!item.hidden && showMenuItem(item.meta)"
        >
          <!-- <el-submenu
            :index="index + ''"
            v-bind:key="index"
            v-if="!item.leaf"
          > -->
            <template slot="title">
              <!-- <i :class="item.iconCls"></i> -->
              {{ item.name }}
            </template>
            <el-menu-item
              v-for="child in item.children"
              :index="child.path"
              :key="child.path"
              v-if="!child.hidden && showItem(child.name)"
            >{{ child.name }}</el-menu-item>
          <!-- </el-submenu> -->
          <!-- <el-menu-item
            v-if="item.leaf && item.children.length > 0 && showItem(item.name)"
            :index="item.children[0].path"
            v-bind:key="index"
          >
            <i :class="item.iconCls"></i>
            {{ item.children[0].name }}
          </el-menu-item> -->
        </template>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <el-header height="67px">
        <el-row style="margin-bottom:6px">
          <el-col
            :span="3"
            class="userinfo"
          >
              <span
                class="page_head_name"
                v-for="item in $route.matched"
                :key="item.path"
              >{{ item.name }}</span>
          </el-col>
            <!--<el-col
            :span="6"
            class="userinfo"
          >{{ sysUserName }} {{ othUserName }}</el-col> -->
          <el-col
            :span="15"
            style="text-align:right"
            class="userinfo"
          >
            <!-- <el-button
              type="text"
              icon="el-icon-lock"
              @click="resetPasswordPage"
            >修改密码</el-button> -->
            <el-button type="text">{{user.loginName}}</el-button>
            <span class="divide_line">|</span>
            <el-button
              type="text"
              divided
              class="logout_text"
              @click.native="logout"
            >退出登录</el-button>
          </el-col>
          <!-- <el-col
            :span="24"
            class="breadcrumb-container"
          >
            <el-breadcrumb
              separator="/"
              class="breadcrumb-inner"
            >
              <el-breadcrumb-item
                v-for="item in $route.matched"
                :key="item.path"
              >{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col> -->
        </el-row>
        <el-row>
          <el-divider></el-divider>
        </el-row>
      </el-header>
      <el-main>
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col
              :span="24"
              class="content-wrapper"
            >
              <transition
                name="fade"
                mode="out-in"
              >
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      sysName_t: "管理系统",
      sysUserName: "",
      othUserName: "",
      sysUserAvatar: "",
      user: {}
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
  methods: {
    showItem(name) {
      let show = false;
      let roleType = this.user.roleType;
      //let roleType = "admin";
      if (roleType === "admin") {
        show = true;
      } else {
        show = true;
      }
      return show;
    },
    showMenuItem(meta) {
      let show = false;
      //let user = JSON.parse(sessionStorage.getItem("user"));
      let roleType = this.user.roleType;
      //let roleType = "admin";
      show = true
      /* if (roleType === "admin") {
        show = true;
        //console.log(roleType);
      } else if(roleType === "common" && meta === "task"){
        show = true;
      } else {
        show = false;
      } */
      return show;
    },
    onSubmit() {
       //console.log("submit!");
    },
    handleopen() {
       //console.log("handleopen");
    },
    handleclose() {
       //console.log("handleclose");
    },
    handleselect() {
       //console.log("handleselect");
    },
    //退出登录
    logout: function () {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          /* const logoutParam = {
            phone: "13980066666"
          };
          logoutRequest(logoutParam).then(res => {
            console.log(res);
          }) */
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    userPage() {
      this.$router.push({ path: "/userPage" });
    },
    resetPasswordPage() {
      this.$router.push({ path: "/resetPassword" });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/vars.scss";

.el-main {    
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    box-sizing: border-box;
    padding: 0 20px;
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
  color: rgba(0, 77, 171, 1);
  background-color: rgba(242, 243, 245, 1) !important;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover,
.el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover,
.el-menu-item:hover {
  background-color: rgba(242, 243, 245, 1);
}
.el-menu-item,
.el-submenu__title {
  text-align: center;
  color: rgba(102, 102, 102, 1);
  i {
    color: rgba(102, 102, 102, 1);
  }
}
.el-submenu .el-menu-item {
  background-color: $color-primary;
}
.el-submenu .el-menu-item:hover,
.el-submenu__title:hover {
  background-color: $light-primary;
}
.el-breadcrumb {
  font-size: 16px;
  line-height: 40px;
}
.el-breadcrumb__separator,
.el-breadcrumb__item .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-button--text {
  color: $color-primary;
  font-weight: 400;
}
// .el-table th {
//   background-color: $bg-primary;
// }
.el-button--primary,
.el-button--primary:focus,
.el-button--primary:hover {
  background: $color-primary;
  border-color: $color-primary;
}

.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 6px 0;
}

.el-row {
  margin-bottom: 24px;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: $color-primary;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload__tip {
  font-size: 12px;
  color: #606266;
  margin: 7px 0 17px;
}
.el-card__header {
  color: $color-primary;
  font-size: 18px;
  border-bottom: 2px solid #fca53b;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.btn-text-red {
  color: #f56c6c;
}
.btn-text-red:focus,
.btn-text-red:hover {
  color: #f78989;
}
.btn-text-green {
  color: #67c23a;
}
.btn-text-green:focus,
.btn-text-green:hover {
  color: #85ce61;
}
.btn-text-yellow {
  color: #e6a23c;
}
.btn-text-yellow:focus,
.btn-text-yellow:hover {
  color: #ebb563;
}
</style>


<style scoped lang="scss">
@import "../styles/vars.scss";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  aside {
    flex: 0 0 230px;
    // width: 230px;
    // position: absolute;
    // top: 60px;
    // bottom: 0px;
    background-color: rgba(250, 250, 250, 1);
    .top-title {
      //background: url(../assets/login.png) no-repeat;
      height: 58px;
      width: 58px;
      background-size: 58px 59px;
      margin-left: 86px;
      margin-top: 26px;
    }
    .el-menu {
      height: 70%;
      background-color: rgba(250, 250, 250, 1);
    }
  }
  .logout_text {
    color: rgba(186, 186, 186, 1)
  }
  .divide_line {
    margin-left: 16px;
    margin-right: 16px;
  }
  .el-col-3 {
    width: 37.5%;
}
  .userinfo {
    height: 50px;
    line-height: 58px;
    color: $color-primary;
    background: #fff;
    padding-right: 35px;
    img {
      height: 80px;
      border-radius: 20px;
    }
    .page_head_name {
      color: rgba(0, 0, 0, 1);
      font-weight: bold;
      font-size: 20px;
    }
  }
  .breadcrumb-container {
    position: fixed;
    top: 100px;
    left: 230px;
    padding: 0 50px;
    height: 40px;
    background: #f8f8f8;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .title {
      width: 200px;
      color: #475669;
    }
  }
  .logo {
    //width:230px;
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
    img {
      width: 40px;
      float: left;
      margin: 10px 10px 10px 18px;
    }
    .txt {
      color: #fff;
    }
  }
  .logo-width {
    width: 230px;
  }
  .logo-collapse-width {
    width: 60px;
  }
  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }

  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>