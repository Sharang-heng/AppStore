<template>
  <div>
    <div class="header">
      <h1>
        桃子商城
        <span>卖家工作台</span>
      </h1>
    </div>
    <el-card class="box-card">
      <ul>
        <li>
          <label>店铺名称：</label>
          <input type="text" class="inp" v-model="register_form.name" />
        </li>
        <li>
          <label>店铺地址：</label>
          <input type="text" class="inp" v-model="register_form.address" />
        </li>
        <li>
          <label>店主姓名：</label>
          <input type="text" class="inp" v-model="register_form.ownerName" />
        </li>
        <li>
          <label>店主性别：</label>
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
        </li>
        <li>
          <label>手机号：</label>
          <input type="text" class="inp" v-model="register_form.phoneNumber" />
        </li>
        <li>
          <label>密码：</label>
          <input type="password" class="inp" v-model="register_form.password" />
        </li>
        <li>
           <input type="submit" value="完成注册" class="reg_btn" @click="finish_reg()" />
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 1,
      labelPosition: "right",
      register_form: {
        name: "",
        ownerName: "",
        sex: "",
        phoneNumber: "",
        address: "",
        password: ""
      }
    };
  },
  methods: {
    async finish_reg(){
       if (this.radio == 1) {
        this.register_form.sex = 1;
      } else {
        this.register_form.sex = 0;
      }
      const { data: res } = await this.$http.post(
        "/api/register/shop",
        JSON.stringify(this.register_form)
      );
      console.log(res);
      this.$router.push("/home");
    }
    }
  }
</script>

<style lang="scss" scoped>
.header {
  font-size: 23px;
  height: 60px;
  width: 100%;
  background-color: #ec943d;
  line-height: 60px;
  color: aliceblue;
  font-family: "微软雅黑";
  padding-left: 35px;
  span {
    font-size: 16px;
    margin-left: 15px;
  }
}

.box-card {
  width: 90%;
  margin: 20px auto;
  height: 500px;
  ul {
    margin-top:30px; 
    position: absolute;
    left: 50%;
    transform:translateX(-50%);
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
</style>