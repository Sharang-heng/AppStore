<template>
  <div class="contain">
    <div class="account-security">
      <dl class="detail-info">
        <dt class="info-title">您的基础信息</dt>
        <dd>
          <ul class="account-info">
            <li>
              <span class="t">昵&nbsp;称：</span>
              <span class="default grid-msg" v-show="changName">{{CustomerInfo.nickname}}</span>
              <input
                type="text"
                v-model="CustomerInfo.nickname"
                v-show="!changName"
                ref="nameText"
                @blur="fixName"
              />
              <span class="modify">
                <a title="设置" @click="setName">修改昵称&nbsp;&nbsp;</a>
              </span>
            </li>
            <li>
              <span class="t">绑&nbsp;定&nbsp;手&nbsp;机：</span>
              <span
                class="default grid-msg"
                v-show="changePhoneNum"
              >{{CustomerInfo.phoneNumber | changePhone}}</span>
              <input
                type="text"
                v-model="CustomerInfo.phoneNumber"
                v-show="!changePhoneNum"
                ref="phoneText"
                @blur="fixPhone"
              />
              <span class="modify">
                <a title="设置" @click="setPhone">修改手机&nbsp;&nbsp;</a>
              </span>
            </li>
            <li>
              <span class="t">登&nbsp;录&nbsp;邮&nbsp;箱：</span>
              <span class="default grid-msg" v-show="changeEmail">{{CustomerInfo.email}}</span>
              <input
                type="text"
                v-model="CustomerInfo.email"
                v-show="!changeEmail"
                ref="emailText"
                @blur="fixEmail"
              />
              <span class="modify">
                <a title="设置" @click="setEmail">修改邮箱&nbsp;&nbsp;</a>
              </span>
            </li>
            <li>
              <span class="t">密&nbsp;码：</span>
              <span
                class="default grid-msg"
                v-show="changePass"
              >{{CustomerInfo.password | changePassword}}</span>
              <input
                type="text"
                v-model="CustomerInfo.password"
                v-show="!changePass"
                ref="passwordText"
                @blur="fixPassword"
              />
              <span class="modify">
                <a title="设置" @click="setPassword">修改密码&nbsp;&nbsp;</a>
              </span>
            </li>
          </ul>
        </dd>
        <dt class="info-title topline">您的安全服务</dt>
        <div class="zhx-anquan middle" :style="{border: 'none'}">
          安全等级：
          <span class="zhx-anquan-level-middle">中</span>
        </div>
        <dt class="topline member" :style="{color: 'red'}" @click="apply_member">会员申请</dt>
        <div v-show="true">
          <el-button type="warning" :plain="true" @click="applyMember">申请会员</el-button>
        </div>
        <dt
          class="topline member"
          :style="{color: 'red','margin-top':'130px'}"
          @click="apply_member"
        >充值</dt>
        <div>
          <el-input v-model="money" placeholder="请输入充值金额" class="Money" type="number" onkeyup="this.value=this.value.replace(/\D/g,'')"></el-input>
          <el-button type="warning" :plain="true" @click="applyMoney" class="applyMoney">充值</el-button>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changName: true,
      changePhoneNum: true,
      changeEmail: true,
      changePass: true,
      CustomerInfo: {
        nickname: "",
        phoneNumber: "",
        email: "",
        password: "",
        uid: ""
      },
      // 用于显示充值
      showApply: false,
      url: "",
      money: ""
    };
  },
  created() {
    this.getCustomerInfo();
  },
  methods: {
    setName() {
      this.changName = false;
      this.$nextTick(function() {
        //DOM 更新了
        this.$refs.nameText.focus();
      });
    },
    async fixName() {
      this.changName = true;
      const { data: res } = await this.$http.post(
        "/api/customerInfo/update",
        JSON.stringify({
          id: this.CustomerInfo.uid,
          nickname: this.CustomerInfo.nickname
        })
      );
      console.log(res);
    },
    setPhone() {
      this.changePhoneNum = false;
      this.$nextTick(function() {
        //DOM 更新了
        this.$refs.phoneText.focus();
      });
    },
    async fixPhone() {
      this.changePhoneNum = true;
      const { data: res } = await this.$http.post(
        "/api/customerInfo/update",
        JSON.stringify({
          id: this.CustomerInfo.uid,
          phoneNumber: this.CustomerInfo.phoneNumber
        })
      );
      console.log(res);
    },
    setEmail() {
      this.changeEmail = false;
      this.$nextTick(function() {
        //DOM 更新了
        this.$refs.emailText.focus();
      });
    },
    async fixEmail() {
      this.changeEmail = true;
      const { data: res } = await this.$http.post(
        "/api/customerInfo/update",
        JSON.stringify({
          id: this.CustomerInfo.uid,
          email: this.CustomerInfo.email
        })
      );
      console.log(res);
    },
    setPassword() {
      this.changePass = false;
      this.$nextTick(function() {
        //DOM 更新了
        this.$refs.passwordText.focus();
      });
    },
    async fixPassword() {
      this.changePass = true;
      const { data: res } = await this.$http.post(
        "/api/customerInfo/update",
        JSON.stringify({
          id: this.CustomerInfo.uid,
          password: this.CustomerInfo.password
        })
      );
      console.log(res);
    },
    apply_member() {
      this.showApply = true;
    },
    getCustomerInfo() {
      this.CustomerInfo.uid = this.$store.state.userID;
      this.CustomerInfo.nickname = this.$store.state.nickname;
      this.CustomerInfo.phoneNumber = this.$store.state.phoneNum;
      this.CustomerInfo.email = this.$store.state.email;
    },
    async applyMember() {
      this.url = `/api/customerInfo/membership/${this.CustomerInfo.uid}`;
      console.log(this.url);
      const { data: res } = await this.$http.post(this.url);
      console.log(res);
      if (res == this.CustomerInfo.uid) {
        this.$message.success("注册会员成功！");
      } else if(res.userTip=="余额不足"){
        this.$message.error("余额不足，请先充值");
      }
      else{
        this.$message.error("您已经是会员了，无需申请！");
      }
    },
    async applyMoney() {
      if(this.money==''){
        return this.$message.error("请输入充值金额！");
      }else if(this.money<0){
        return this.$message.error("请输入正确金额！");
      }
      const { data: res } = await this.$http.post(
        "/api/customerInfo/recharge/",
        JSON.stringify({ customerId: this.CustomerInfo.uid, money: this.money })
      );
      console.log(res);
      if(res==this.CustomerInfo.uid){
       this.$message.success("充值成功！");
       this.money='';
      //  this.$router.push("/home");
      }
    }
  },
  filters: {
    changePhone(value) {
      var len = value.length;
      var x = value.substring(3, len - 4);
      var values = value.replace(x, "****");
      return values;
    },
    changePassword(value) {
      var len = value.length;
      var newValue = "";
      for (var i = 0; i < len; i++) {
        newValue += "*";
      }
      return newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.contain {
  height: 500px;
  width: 80%;
  border: 1px solid #c4d5f4;
  margin: 15px auto 0;
  .detail-info {
    padding: 0 20px 14px;
    .info-title {
      padding: 12px 0 0 20px;
      line-height: 30px;
      font-weight: 700;
      border-top: 1px solid #d5e5f4;
      margin-top: -1px;
      zoom: 1;
      position: relative;
    }
    .account-info {
      padding-left: 16px;
      margin-left: 30px;
      line-height: 22px;
      padding-bottom: 20px;
      border-bottom: 1px solid #d5e5f4;
      .t {
        float: left;
        width: 86px;
      }
      .modify {
        width: 70px;
        text-align: right;
        padding-right: 620px;
        cursor: pointer;
        // float: left;
        float: right;
        a {
          color: #3366cc;
        }
        a:hover {
          color: red;
        }
      }
    }
    .zhx-anquan {
      float: left;
      width: 345px;
      height: 28px;
      font-size: 12px;
      line-height: 28px;
      padding-left: 45px;
    }
    .member {
      line-height: 30px;
      font-weight: 700;
      float: left;
      margin-top: 35px;
      margin-left: -370px;
      cursor: pointer;
    }
    .middle {
      background: url("../assets/images/middle.png") center right no-repeat;
      background-size: 252px 12px;
    }
    .el-input {
      width: 200px;
      float: left;
      margin-top: 75px;
      margin-left: -350px;
    }
    .el-button {
      float: left;
      margin-top: 75px;
      margin-left: -350px;
    }
    .applyMoney {
      margin: 170px 0 0 -120px;
    }
    .Money {
      margin: 170px 0 0 -353px;
    }
  }
}
</style>