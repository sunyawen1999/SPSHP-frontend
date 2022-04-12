<template>
  <div class="set-bg">
    <div class="logo">

    </div>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">社会心理服务热线平台</h3>
      <el-form-item prop="account">
        <el-input
          type="text"
          v-model="loginForm.account"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="loginForm.checkPass"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          class="login-set-btn"
          @click.native.prevent="handleLogin"

          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginRequest, loginRequestPost } from "@/api/login";

export default {
  data() {
    return {
      logining: false,
      loginForm: {
        account: "",
        checkPass: ""
      },
      loginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    makeBaseAuth({ username, password }) {
      const tok = username + ":" + password;
      const hash = tok;
      return "Basic " + hash;
    },
    handleLogin() {
      const _this = this;
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.logining = true;
          const loginParams = {
            username: _this.loginForm.account,
            password: _this.loginForm.checkPass
          };

          loginRequestPost(loginParams)
            .then(res => {
              loginRequest()
                .then(data => {
                  if (data.data.code === "000") {
                    const result = data.data.datas[0];
                    let roleType = result.roleType;
                    // const roleType = _this.loginFrom.account;
                    sessionStorage.setItem("user", JSON.stringify(result));
                    
                    // Todo: 修改用户角色权限
                    if(roleType === "counselor") {
                        _this.$router.push({ path: "/consultantFirstPage" });
                    } else if(roleType === "supervisor") {
                      _this.$router.push({ path: "/supervisorFirstPage" });
                    } else if(roleType === "admin"){
                      _this.$router.push({ path: "/adminFirstPage" });
                    } else {
                      _this.$message({
                        message: "您没有权限",
                        type: "error"
                      });
                    }

                    // if (roleType === "superAdmin") {
                    // } else {
                    //   _this.logining = false;
                    //   _this.$message({
                    //     message: "登录失败",
                    //     type: "error"
                    //   });
                    // }
                  } else {
                    _this.$message({
                      message: data.data.msg,
                      type: "error"
                    });
                  }
                })
                .catch(err => {
                  _this.logining = false;
                  _this.$message({
                    message: err.response.data.msg,
                    type: "error"
                  });
                });
            })
            .catch(err => {
              _this.logining = false;
              _this.$message({
                message: err.response.data.msg,
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-set-btn {
  width: 100%;
  height: 45px;
  font-size: 18px;
  margin-top: 50px;
}
</style>

<style lang="scss" scoped>
@import "../styles/vars.scss";

.set-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(242, 243, 245, 1);
  color: #393e46;
  background-size: cover;

  .logo {
    position: fixed;
    top: -79px;
    left: calc(50% - 280px);
    width: 394px;
    height: 319px;
    background: url(../assets/login.png) no-repeat
    }

  .login-container {
    position: fixed;
    top: 208px;
    left: calc(50% - 200px);
    /* box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02); */
    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 440px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid #eaeaea;
    box-sizing: border-box;
    .title {
      margin: 40px auto 40px auto;
      text-align: center;
      font-size: 20px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      letter-spacing: 2px;
      left: 859px;
      top: 359px;
      width: 176px;
      height: 30px;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
}
</style>