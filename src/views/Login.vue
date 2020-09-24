<template>
  <div>
    <div class="header">
      <div class="logo">
        <h1>
          <a href title="shopeach"></a>
          <img src="./../assets/images/logo.jpg" class="logoJpg" />
          <p class="logoText">桃子商城，讨你喜欢</p>
        </h1>
      </div>
    </div>
    <div id="content">
      <div class="bgc">
        <div class="submitBox">
          <div class="login">
            <el-form ref="form" label-width="80px">
              <div class="loginForm">
                <div class="loginTab">
                  <div class="tab_list">
                    <ul>
                      <li @click="changeTab(0)" class="selective" ref="tab1">买家登录</li>
                      <li @click="changeTab(1)" ref="tab2">卖家登录</li>
                    </ul>
                  </div>
                  <div v-show="loginMessage==1" class="errorMessage">
                    <i class="error_icon"></i>请输入账户名
                  </div>
                  <div v-show="loginMessage==2" class="errorMessage">
                    <i class="error_icon"></i>请输入密码
                  </div>
                  <div v-show="loginMessage==3" class="errorMessage">
                    <i class="error_icon"></i>登录名或登录密码不正确
                  </div>
                  <div class="tab_con">
                    <div v-show="activeIndex==0">
                      <i class="name_icon"></i>
                      <input
                        @blur="pick(1)"
                        @focus="empty(1)"
                        class="loginInput"
                        type="text"
                        v-model="cusName"
                        :placeholder="holder1"
                      />
                      <i class="password_icon"></i>
                      <input
                        @blur="pick(2)"
                        @focus="empty(2)"
                        class="loginInput"
                        type="password"
                        v-model="cusPass"
                        :placeholder="holder2"
                      />
                    </div>
                    
                  </div>
                </div>
              </div>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" class="loginButton">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <span @click="register()" class="registerText">免费注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styleObj1: { "font-size": "40px", top: "800px" },
      holder1: "邮箱/电话号码",
      holder2: "请输入登录密码",
      holder3: "商家名称",
      holder4: "请输入登录密码",
      loginMessage: 0,
      flag: 0,
      cusName: "",
      cusPass: "",
      shopName: "",
      shopPass: "",
      activeIndex: 0
    };
  },
  methods: {
    changeTab(a) {
      this.activeIndex = a;
      if (a == 0) {
        this.$refs.tab1.className = "selective";
        this.$refs.tab2.className = "";
        this.flag = 0;
      } else {
        this.$refs.tab1.className = "";
        this.$refs.tab2.className = "selective";
        this.flag = 1;
      }
    },
    pick() {
      // if (a == 1) {
      //   this.holder1 = "邮箱/电话号码";
      // } else if (a == 2) {
      //   this.holder2= "请输入登录密码";
      // } else if (a == 3) {
      //   this.holder3= "商家名称";
      // } else {
      //   this.holder4= "请输入登录密码";
      // }
    },
    empty() {
      // if (a == 1) {
      //   this.holder1 = "";
      // } else if (a == 2) {
      //   this.holder2= "";
      // } else if (a == 3) {
      //   this.holder3= "";
      // } else {
      //   this.holder4= "";
      // }
    },
    async onSubmit() {
      if (this.activeIndex == 0) {
        if (this.username == "") {
          this.loginMessage = 1;
          return;
        } else if (this.password == "") {
          this.loginMessage = 2;
          return;
        } else {
          console.log(
            JSON.stringify({ username: this.cusName,password: this.cusPass })
          );
          const { data: res } = await this.$http.post(
            "/api/login/customer",
            JSON.stringify({ username: this.cusName, password: this.cusPass })
          );
          console.log(res);
          this.$store.commit('setID',res.id);
          this.$store.commit('setPhoneNum',res.phoneNumber);
          this.$store.commit('setNickname',res.nickname);
          this.$store.commit('setEmail',res.email);
           window.sessionStorage.setItem("token", res.id);
          if (res.success === false)  {
            this.loginMessage = 3;
            return;
           }
          this.$router.push("/home");
        }
      } else {
        if (this.username == "") {
          this.loginMessage = 1;
          return;
        } else if (this.password == "") {
          this.loginMessage = 2;
          return;
        } else {
          const { data: res } = await this.$http.post(
            "/api/login/shop",
            JSON.stringify({ username: this.shopName, password: this.shopPass })
          );
          console.log(res.success);
          if (res.success === false)  {
           this.loginMessage = 3;
            return;
           }
          this.$router.push("/home");
        }
      }
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  width: 100%;
  .logo {
    padding-left: 80px;
    .logoJpg {
      display: block;
      height: 65px;
      width: 110px;
      float: left;
    }
    .logoText {
      height: 65px;
      line-height: 65px;
      width: 110px;
      font-size: 19px;
      white-space: nowrap;
      color: #ec943d;
      font-family: "Hiragino Sans GB";
      font-weight: 900;
    }
  }
}

#content {
  width: 100%;
  overflow: hidden;
  height: 555px;
  background-image: url("./../assets/images/login-background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  .bgc {
    .submitBox {
      width: 350px;
      height: 350px;
      float: right;
      margin-right: 130px;
      margin-top: 120px;
      background-color: #fcf0eb;
      .login {
        position: relative;
        .loginForm {
          .loginTab {
            .tab_list {
              margin-left: 30px;
              margin-top: 30px;
              li {
                float: left;
                height: 18px;
                width: 64px;
                line-height: 18px;
                text-align: center;
                cursor: pointer;
                color: #3c3c3c;
                font-size: 16px;
                font-weight: 600;
                margin: 9px 10px 0px 0px;
                position: relative;
                z-index: 99;
                padding-bottom: 20px;
              }
              .selective {
                padding-bottom: 5px;
                border-bottom: 2px solid;
              }
            }
            .tab_con {
              .name_icon {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: url("../assets/images/touxiang.svg") no-repeat
                  center;
                background-size: contain;
                position: absolute;
                top: 47px;
                left: 25px;
              }
              .password_icon {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: url("../assets/images/password.svg") no-repeat
                  center;
                background-size: contain;
                position: absolute;
                top: 107px;
                left: 25px;
              }
              .loginInput {
                display: block;
                width: 220px;
                height: 40px;
                margin: auto;
                margin-top: 20px;
                padding-left: 25px;
              }

              .loginInput2 {
                display: block;
                width: 220px;
                height: 40px;
                margin: auto;
                margin-top: 33px;
                padding-left: 25px;
              }

              .loginInput:focus {
                outline: none;
              }
              .loginInput2:focus {
                outline: none;
              }
            }
            .errorMessage {
              width: 300px;
              height: 30px;
              background-color: #ffb4a8;
              border: 1px solid #ffa35a;
              position: absolute;
              top: 160px;
              left: 25px;
              line-height: 30px;
              .error_icon {
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: middle;
                background: url(../assets/images/point.png) no-repeat center;
                background-size: contain;
                margin-top: -2px;
              }
            }
          }
        }
        .loginButton {
          background-color: #ff4400;
          border: none;
          width: 300px;
          height: 40px;
          position: absolute;
          left: -55px;
          color: #fff;
          font-size: 15px;
          margin-top: 60px;
        }
      }
      .registerText {
        cursor: pointer;
        position: absolute;
        bottom: 110px;
        right: 150px;
        color: #6c6c6c;
        font-size: 12px;
      }
    }
  }
}
::-webkit-input-placeholder {
  font-size: 15px;
  padding-left: 5px;
}
</style>