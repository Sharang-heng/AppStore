<template>
  <div>
    <shortcut></shortcut>
    <div class="main">
      <div class="left"></div>
      <div class="center">
        <div class="header">
          <div class="logo" :style="{'margin-left':'140px'}">
            <h1>
              <a href title="shopeach"></a>
              <img src="./../assets/images/logo.jpg" class="logoJpg" />
              <p class="logoText">购物车</p>
            </h1>
          </div>
        </div>
        <div class="cartMain">
          <!-- <ul class="top">
            <li>您的位置：</li>
            <li @click="toHome" class="home">首页</li>
            <li>></li>
            <li @click="toProfile" class="mine">我的桃宝</li>
            <li>></li>
            <li class="now">我的购物车</li>
          </ul>
          <p class="presentation">购物车帮您一次性完成批量购买与付款，下单更便捷，付款更简单</p>-->
          <div v-show="flag==0" class="empty">
            <i class="empty_icon"></i>
            <h2 class="empty_text">
              您的购物车是空的，赶紧行动吧！您可以
              <br />
              <br />
              <p>
                看看&nbsp;&nbsp;
                <span class="look_mark" @click="toMark">我的收藏夹</span>
              </p>
            </h2>
          </div>
          <div class="line">
            <span :style="{'margin-left':'110px'}">商品信息</span>
            <span :style="{'margin-left':'190px'}">单价</span>
            <span :style="{'margin-left':'107px'}">数量</span>
            <span :style="{'margin-left':'95px'}">金额</span>
            <span :style="{'margin-left':'95px'}">操作</span>
          </div>
          <div v-show="flag==1" class="many">
            <ul v-if="shopCarList[0]">
              <li>
                <div v-for="(item, index) in shopCarList" :key="index+'shopCart'">
                  <div class="head">
                    <el-checkbox
                      v-model="checked"
                      :style="{'margin-top': '15px','margin-left': '15px'}"
                    ></el-checkbox>
                    <!-- <span>&nbsp;&nbsp;店铺：{{item.shopName}}</span> -->
                  </div>
                  <div class="ObligationBox">
                    <div class="box-left">
                      <img :src="item.pictureUrl" alt />
                      <div class="name">{{item.name}}</div>
                      <div class="count">
                        <span
                          :style="{color: '#aeaeae','text-decoration':'line-through'}"
                        >￥{{item.price}}</span>
                        <span>￥{{item.discountPrice}}</span>
                      </div>
                      <div class="num">{{item.amount}}</div>
                      <div class="realPrice">￥{{goodPrice(item)}}</div>
                      <div>
                        <span class="delete" @click="deleteCart(item.id)">删除</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="head" :style="{'background': '#E5E5E5'}">
              <div class="total">￥{{totalMoney}}</div>
              <button class="give_money" @click="giveMoney">结算</button>
            </div>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import shortcut from "../components/ShortCut";
export default {
  data() {
    return {
      flag: 0,
      search: "",
      uid: "",
      checked: false,
      url: "",
      shopCarList: [
      ],
      totalMoney: 0
    };
  },
  components: {
    shortcut: shortcut
  },
  created() {
    this.getId();
    this.getShoppingList();
  },
  methods: {
    getId() {
      this.uid = this.$store.state.userID;
    },
    toHome() {
      this.$router.push("/home");
    },
    toProfile() {
      this.$router.push("/profile");
    },
    toMark() {
      this.$router.push("/mark");
    },
    async getShoppingList() {
      this.url = `/api/shoppingCart/list?customerId=${this.uid}`;
      // console.log(this.url);
      const { data: res } = await this.$http.get(this.url);
      console.log(res);
      if(res.length>0) this.flag=1;
      this.shopCarList = res;
      this.totalPrice();
    },
    goodPrice(item) {
      var sum = 0;
      sum = item.discountPrice * item.amount;
      return sum;
    },
    totalPrice() {
      this.totalMoney = 0;
      for (var i = 0; i < this.shopCarList.length; i++) {
        this.totalMoney =
          this.totalMoney +
          this.shopCarList[i].discountPrice * this.shopCarList[i].amount;
      }
    },
    handleChange(value) {
      console.log(value);
    },
    async deleteCart(id) {
      this.url = `/api/shoppingCart/delete/${id}`;
      //  console.log(this.url)
      const { data: res } = await this.$http.post(this.url);
      console.log(res);
      this.getShoppingList();
      this.totalPrice();
    },
    async giveMoney() {
      const { data: res } = await this.$http.post(
        "api/shoppingCart/settlement",
        JSON.stringify({ customerId: this.uid, price: this.totalMoney })
      );
      console.log(res);
      console.log(this.uid)
      if (res == this.uid) {
        var arr = [];
        for (var i = 0; i < this.shopCarList.length; i++) {
          var goods = {
            amount: "",
            payment: "",
            goodsId: "",
            customerId: "",
            shopId: ""
          };
          goods.amount = this.shopCarList[i].amount;
          goods.payment = this.goodPrice(this.shopCarList[i]);
          goods.goodsId = this.shopCarList[i].goodsId;
          goods.customerId = this.uid;
          goods.shopId = this.shopCarList[i].shopId;
          arr[i] = goods;
        }
        console.log(JSON.stringify(arr));
        const { data: res3 } = await this.$http.post(
            "/api/order/saveOrder",
            JSON.stringify(arr)
        );
        console.log(res3);
        this.flag=0;
      }else{
        return this.$message.error("余额不足！");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  .left {
    width: 160px;
    height: 100%;
  }
  .right {
    width: 160px;
    height: 100%;
  }
  .center {
    width: 100%;
    .header {
      height: 70px;
      width: 100%;
      .search_test {
        float: right;
        .search {
          float: right;
          height: 25px;
          width: 350px;
          margin-top: 20px;
          border: 3px solid #ec943d;
        }
        .search_btn {
          float: right;
          height: 28px;
          margin-top: 20px;
        }
      }
      .logo {
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
          float: left;
        }
      }
    }
    .cartMain {
      .many {
        .head {
          width: 960px;
          margin-left: 160px;
          height: 40px;
          background-color: #f5f5f5;
          margin-top: 20px;
        }
        .ObligationBox {
          // background-color: pink;
          width: 960px;
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
              margin-left: 510px;
              margin-top: -14px;
              // float: left;
            }
            .realPrice {
              margin-left: 605px;
              margin-top: -14px;
              color: red;
            }
          }
        }
      }
      // ul {
      //   margin-top: 35px;
      //   margin-left: 20px;
      //   font-size: 10px;
      //   .home:hover {
      //     color: red;
      //     border-bottom: 1px solid red;
      //   }
      //   .mine:hover {
      //     color: red;
      //     border-bottom: 1px solid red;
      //   }
      //   .now {
      //     color: #000000 !important;
      //   }
      //   li {
      //     float: left;
      //   }
      //   li:nth-child(even) {
      //     color: #3366cc;
      //     cursor: pointer;
      //   }
      // }
      .presentation {
        color: #808080;
        font-size: 10px;
        float: right;
      }
      .empty {
        position: relative;
        .empty_icon {
          margin-top: 100px;
          margin-left:100px; 
          display: inline-block;
          width: 110px;
          height: 110px;
          background: url("../assets/images/shoppingCart.png") no-repeat center;
          background-size: contain;
          position: absolute;
          left: 50px;
        }
        .empty_text {
          font-weight: 700;
          position: absolute;
          margin-left:100px; 
          left: 190px;
          top: 130px;
          .look_mark {
            color: #3366cc;
            cursor: pointer;
          }
          .look_mark:hover {
            color: red;
            border-bottom: 1px solid red;
          }
        }
      }
    }
  }
}
.delete {
  float: right;
  margin-right: -165px;
  cursor: pointer;
  margin-top: -20px;
}
.delete:hover {
  color: red;
}
.line {
  width: 960px;
  height: 40px;
  background-color: #f5f5f5;
  margin: 20px 0px 0px 160px;
  line-height: 40px;
}
.el-input-number {
  height: 15px;
  width: 140px;
}
.total {
  display: block;
  color: #ff4400;
  font-size: 22px;
  margin-left: 750px;
  margin-top: -20px;
  line-height: 40px;
}
.give_money {
  height: 40px;
  width: 120px;
  background-color: #ff4400;
  margin-top: -40px;
  border: none;
  float: right;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
</style>