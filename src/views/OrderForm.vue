<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">所有订单</el-menu-item>
      <el-menu-item index="2">待发货</el-menu-item>
      <el-menu-item index="3">待收货</el-menu-item>
      <el-menu-item index="4">已完成</el-menu-item>
    </el-menu>
    <div class="line">
      <span :style="{'margin-left':'150px'}">宝贝</span>
      <span :style="{'margin-left':'190px'}">单价</span>
      <span :style="{'margin-left':'47px'}">数量</span>
      <span :style="{'margin-left':'25px'}">实付款</span>
      <span :style="{'margin-left':'155px'}">操作</span>
    </div>
    <div>
      <ul>
        <!-- 所有订单 -->
        <li v-show="showObligation">
          <div v-for="(item, index) in ObligationList" :key="index+'Obligation'">
            <div class="head">
              <el-checkbox
                v-model="checked[item.id]"
                :style="{'margin-top': '15px','margin-left': '15px'}"
              ></el-checkbox>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.date}}</span>
              <span>&nbsp;&nbsp;订单号：{{item.id}}</span>
            </div>
            <div class="ObligationBox">
              <div class="box-left">
                <img :src="item.pictureUrl" alt />
                <div class="name">{{item.name}}</div>
                <div class="count">
                  <!-- <span  :style="{color: '#aeaeae','text-decoration':'line-through'}"> ￥{{item.price}}</span>
                  <span> ￥{{item.discountPrice}}</span>-->
                </div>
                <div class="num">{{item.amount}}</div>
                <div class="realPrice">￥{{item.payment}}</div>
              </div>
            </div>
          </div>
        </li>
        <!-- 待发货 -->
        <li v-show="showToSendGoods">
          <div v-for="(item, index) in ToSendGoodsList" :key="index+'ToSendGoods'">
            <div class="head">
              <el-checkbox
                v-model="checked[item.id]"
                :style="{'margin-top': '15px','margin-left': '15px'}"
              ></el-checkbox>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.date}}</span>
              <span>&nbsp;&nbsp;订单号：{{item.id}}</span>
            </div>
            <div class="ObligationBox">
             
              <div class="box-left">
                <img :src="item.pictureUrl" alt />
                <div class="name">{{item.name}}</div>
                <div class="count">
                  <!-- <span  :style="{color: '#aeaeae','text-decoration':'line-through'}"> ￥{{item.price}}</span>
                  <span> ￥{{item.discountPrice}}</span>-->
                </div>
                <div class="num">{{item.amount}}</div>
                <div class="realPrice">￥{{item.payment}}</div>
              </div>
               <div class="recive" @click="cancelGoods(item.id)">取消订单</div>
            </div>
          </div>
        </li>
        <!-- 待收货 -->
        <li v-show="showWaitForRecie">
          <div v-for="(item, index) in WaitForRecieList" :key="index+'WaitForRecie'">
            <div class="head">
              <el-checkbox
                v-model="checked[item.id]"
                :style="{'margin-top': '15px','margin-left': '15px'}"
              ></el-checkbox>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.date}}</span>
              <span>&nbsp;&nbsp;订单号：{{item.id}}</span>
            </div>
            <div class="ObligationBox">
              <div class="box-left">
                <img :src="item.pictureUrl" alt />
                <div class="name">{{item.name}}</div>
                <div class="count">
                  <!-- <span  :style="{color: '#aeaeae','text-decoration':'line-through'}"> ￥{{item.price}}</span>
                  <span> ￥{{item.discountPrice}}</span>-->
                </div>
                <div class="num">{{item.amount}}</div>
                <div class="realPrice">￥{{item.payment}}</div>
              </div>
              <div class="recive" @click="reciveGoods(item.id)">确认收货</div>
            </div>
            
          </div>
        </li>
        <!-- 待评价 -->
        <li v-show="showToEvaluate">
          <div v-for="(item, index) in WaitToEvaluate" :key="index+'WaitToEvaluate'">
            <div class="head">
              <el-checkbox
                v-model="checked[item.id]"
                :style="{'margin-top': '15px','margin-left': '15px'}"
              ></el-checkbox>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.date}}</span>
              <span>&nbsp;&nbsp;订单号：{{item.id}}</span>
            </div>
            <div class="ObligationBox">
              <div class="box-left">
                <img :src="item.pictureUrl" alt />
                <div class="name">{{item.name}}</div>
                <div class="count">
                  <!-- <span  :style="{color: '#aeaeae','text-decoration':'line-through'}"> ￥{{item.price}}</span>
                  <span> ￥{{item.discountPrice}}</span>-->
                </div>
                <div class="num">{{item.amount}}</div>
                <div class="realPrice">￥{{item.payment}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      checked: [],
      showObligation: true,
      showToSendGoods: false,
      showWaitForRecie: false,
      showToEvaluate: false,
      url: "",
      uid: "",
      // 全部订单
      ObligationList: [],
      // 待发货
      ToSendGoodsList: [],
      // 待收货
      WaitForRecieList: [],
      // 待评价
      WaitToEvaluate: []
    };
  },
  created() {
    this.getUid();
    this.getObligation();
    this.getToSendGoods();
    this.getWaitForRecie();
    this.getToEvaluate();
  },
  methods: {
    async cancelGoods(id) {
      const { data: result } = await this.$http.post(
        "/api/order/updateOrderState",
        JSON.stringify({
          id: id,
          state: "已取消"
        })
      );
      console.log(result);
      this.getObligation();
      this.getToSendGoods();
    },
    async reciveGoods(id) {
      const { data: result } = await this.$http.post(
        "/api/order/updateOrderState",
        JSON.stringify({
          id: id,
          state: "已完成"
        })
      );
      console.log(result);
      this.getWaitForRecie();
      this.getToEvaluate();
    },
    handleSelect(key, keyPath) {
      console.log(keyPath);
      if (key == 1) {
        (this.showObligation = true),
          (this.showToSendGoods = false),
          (this.showWaitForRecie = false),
          (this.showToEvaluate = false);
      } else if (key == 2) {
        (this.showObligation = false),
          (this.showToSendGoods = true),
          (this.showWaitForRecie = false),
          (this.showToEvaluate = false);
      } else if (key == 3) {
        (this.showObligation = false),
          (this.showToSendGoods = false),
          (this.showWaitForRecie = true),
          (this.showToEvaluate = false);
      } else {
        (this.showObligation = false),
          (this.showToSendGoods = false),
          (this.showWaitForRecie = false),
          (this.showToEvaluate = true);
      }
    },
    async getObligation() {
      this.url = `/api/order/list/${this.uid}`;
      // console.log(this.url);
      const { data: res } = await this.$http.get(this.url);
      console.log(res);
      this.ObligationList = res;
    },
    async getToSendGoods() {
      const { data: result } = await this.$http.post(
        "/api/order/listWithState",
        JSON.stringify({
          customerId: this.uid,
          state: "待发货"
        })
      );
      this.ToSendGoodsList = result;
    },
    async getWaitForRecie() {
      const { data: result } = await this.$http.post(
        "/api/order/listWithState",
        JSON.stringify({
          customerId: this.uid,
          state: "待收货"
        })
      );
      this.WaitForRecieList = result;
    },
    async getToEvaluate() {
      const { data: result } = await this.$http.post(
        "/api/order/listWithState",
        JSON.stringify({
          customerId: this.uid,
          state: "已完成"
        })
      );
      this.WaitToEvaluate = result;
    },
    getUid() {
      this.uid = this.$store.state.userID;
    },
    goodPrice(item) {
      var sum = 0;
      sum = item.discountPrice * item.num;
      return sum;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  margin-left: 160px;
  padding-right: 160px;
  width: 800px;
}

.head {
  width: 960px;
  margin-left: 160px;
  height: 40px;
  background-color: #f5f5f5;
  margin-top: 20px;
}
.line {
  width: 960px;
  height: 40px;
  background-color: #f5f5f5;
  margin: 20px 0px 0px 160px;
  line-height: 40px;
}

.ObligationBox {
  .recive {
    // float: left;
    margin-top:-120px;
    margin-left: 700px;
    line-height: 110px;
    cursor: pointer;
  }
  .recive:hover {
    color: red;
  }
  // background-color: pink;
  // display: flex;
  width: 1260px;
  height: 110px;
  margin-left: 160px;
  // margin-top:20px;
  border: 1px solid #f5f5f5;
  .box-left {
    border-right: 1px solid #f5f5f5;
    width: 600px;
    height: 110px;
    // background-color: pink;
    img {
      height: 80px;
      width: 80px;
      padding-left: 20px;
      margin-top: 20px;
      float: left;
    }
    .name {
      margin-top: 55px;
      margin-left: 15px;
      float: left;
    }
    .count {
      margin-left: 350px;
      padding-top: 55px;
      // float: left;
      // background-color: #222222;
    }
    .num {
      margin-left: 450px;
      margin-top: -14px;
      // float: left;
    }
    .realPrice {
      margin-left: 500px;
      margin-top: -14px;
      color: red;
    }
  }
}
</style>