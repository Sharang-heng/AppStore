<template>
  <div class="main">
    <div class="left"></div>
    <div class="center">
      <div class="head">
        <img class="logoJpg" src="../assets/images/logo.jpg" alt />
        <p class="logoText">桃子商城，讨你喜欢</p>
      </div>
      <div class="registerArea">
        <h3>
          注册新用户
          <div class="goLogin">
            已有账号? 立即
            <span class="loginText" @click="goLogin()">登陆</span>
          </div>
        </h3>
        <div class="reg-form">
          <ul>
            <li>
              <label>昵称：</label>
              <input type="text" class="inp" v-model="register_form.nickname" />
              <!-- <span class="error">
                <i class="error_icon"></i>用户名格式不正确，请重新输入
              </span>-->
            </li>
            <li>
              <label>性别：</label>
              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="2">女</el-radio>
            </li>
            <li>
              <label>邮箱：</label>
              <input type="text" class="inp" @blur="email_test()" v-model="register_form.email" />
              <span class="success" v-show="email_success">
                <i class="success_icon"></i>格式正确！
              </span>
              <span class="error" v-show="email_fail">
                <i class="error_icon"></i>邮箱不正确，请重新输入
              </span>
            </li>
            <li>
              <label>手机号：</label>
              <input type="text" class="inp" @blur="tel_test()" v-model="register_form.phoneNumber" />
              <span class="success" v-show="phone_success">
                <i class="success_icon"></i>格式正确！
              </span>
              <span class="error" v-show="phone_fail">
                <i class="error_icon"></i>手机号不正确，请重新输入
              </span>
            </li>
            <li>
              <label>密码：</label>
              <input type="password" class="inp" v-model="register_form.password" />
              <!-- <span class="error">
                <i class="error_icon"></i>格式不正确，请重新输入
              </span>-->
            </li>
            <li>
              <label>确认密码：</label>
              <input type="password" class="inp" @blur="pass_test" v-model="password_again" />
              <span class="error" v-show="pass_fail">
                <i class="error_icon"></i>两次密码不相同，请重新输入
              </span>
              <span class="success" v-show="pass_success">
                <i class="success_icon"></i>格式正确！
              </span>
            </li>

            <li class="agree">
              <input type="checkbox" name id />同意协议并注册
              <a class="agreement">《桃子商城用户协议》</a>
            </li>
            <li>
              <input type="submit" value="完成注册" class="reg_btn" @click="finish_reg()" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      phone_success: false,
      phone_fail: false,
      email_success: false,
      email_fail: false,
      pass_success: false,
      pass_fail: false,
      //手机号正则表达式
      tel: /^1[3|4|5|7|8][0-9]{9}$/,
      email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
      register_form: {
        nickname: "",
        sex: "",
        email: "",
        phoneNumber: "",
        password: ""
      },
      password_again: ""
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    tel_test() {
      if (this.tel.test(this.register_form.phone_num)) {
        this.phone_success = true;
        this.phone_fail = false;
      } else {
        this.phone_success = true;
        this.phone_fail = false;
      }
    },
    email_test() {
      if (this.email.test(this.register_form.email)) {
        this.email_success = true;
        this.email_fail = false;
      } else {
        this.email_success = false;
        this.email_fail = true;
      }
    },
    pass_test() {
      if (this.register_form.password == this.password_again) {
        this.pass_success = true;
        this.pass_fail = false;
      } else {
        this.pass_success = false;
        this.pass_fail = true;
      }
    },
    async finish_reg() {
        if (
        this.phone_fail == true ||
        this.email_fail == true ||
        this.pass_fail == true || 
        this.register_form.nickname == '' ||
        this.register_form.email == '' ||
        this.register_form.phoneNumber == '' ||
        this.register_form.password == ''
      ){
         return;
      }
       
      else{
        if (this.radio == 1) {
        this.register_form.sex = 1;
      } else {
        this.register_form.sex = 0;
      }
    
      const { data: res } = await this.$http.post(
        "/api/register/customer",
        JSON.stringify(this.register_form)
      );
      console.log(res);
      this.$router.push("/login");
    }
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  margin-left: 100px;
  margin-right: 100px;
}
.main {
  display: flex;
  .left {
    width: 200px;
    height: 100%;
  }
  .right {
    width: 200px;
    height: 100%;
  }
  .center {
    width: 100%;
    .head {
      height: 65px;
      border-bottom: 2px solid #ec943d;
      .logoJpg {
        display: block;
        height: 65px;
        width: 100px;
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
    .registerArea {
      height: 522px;
      margin-top: 20px;
      border: 1px solid #ec943d;
      h3 {
        height: 42px;
        color: #ffffff;
        border-bottom: 1px solid #ec943d;
        background-color: #ec943d;
        line-height: 42px;
        padding: 0 10px;
        font-size: 15px;
        .goLogin {
          float: right;
          font-size: 12px;
          .loginText {
            color: red;
            cursor: pointer;
            font-size: 16px;
            font-weight: 700;
          }
        }
      }
      .reg-form {
        width: 600px;
        height: 200px;
        //   background-color: red;
        .change {
          float: left;
        }
        margin: 50px auto 0;
        ul {
          li {
            margin-bottom: 20px;
            label {
              display: inline-block;
              width: 88px;
              text-align: right;
            }
            .inp {
              width: 242px;
              height: 28px;
              border: 1px solid #ccc;
              padding-left: 5px;
            }
            .error {
              color: red;
              .error_icon {
                display: inline-block;
                width: 25px;
                height: 25px;
                vertical-align: middle;
                background: url(../assets/images/wrong.png) no-repeat center;
                background-size: contain;
                margin-top: -2px;
              }
            }
            .success {
              color: green;
              .success_icon {
                display: inline-block;
                width: 19px;
                height: 19px;
                vertical-align: middle;
                background: url(../assets/images/right.png) no-repeat center;
                background-size: contain;
                margin-top: -2px;
              }
            }
          }
          .agree {
            padding-left: 100px;
            input {
              vertical-align: center;
              margin-top: 3px;
              margin-right: 8px;
              cursor: pointer;
            }
            .agreement {
              color: #1ba1e6;
            }
          }
          .reg_btn {
            width: 200px;
            height: 34px;
            background-color: #ec943d;
            font-size: 14px;
            color: #ffffff;
            margin-left: 100px;
            margin-top: 30px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>