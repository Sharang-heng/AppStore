<template>
  <div>
    <shortcut></shortcut>
    <div class="header">
      <h1>我的桃宝
          <span @click="showOrder">首页</span>
          <span @click="showAccount">账户设置</span>
      </h1>
    </div>
    <account v-show="AccountshowUp"></account>
    <order v-show="OrdershowUp"></order>
  </div>
</template>

<script>
import shortcut from "../components/ShortCut";
import account from "../views/AccountSetting";
import order from "../views/OrderForm";
export default {
  data() {
    return {
        AccountshowUp:false,
        OrdershowUp:true
    };
  },
  methods:{
      showAccount(){
          this.AccountshowUp=true;
          this.OrdershowUp=false;
      },
      showOrder(){
          this.AccountshowUp=false;
          this.OrdershowUp=true;
      }
  },
  components: {
    shortcut: shortcut,
    account: account,
    order: order
  }
};
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
  padding-left: 160px;
  span{
      font-size: 14px;
      margin-left: 40px; 
      cursor: pointer;
  }
//   span:hover{
//       color: red;
//   }
}
</style>