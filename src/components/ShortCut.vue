<template>
  <div class="shortCut">
    <div class="main">
      <div class="left">
        <ul>
          <li>桃子商城欢迎您</li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li @click="toHome">商城首页</li>
          <li></li>
          <li @click="toprofile">我的桃宝</li>
          <li></li>
          <li @click="toShoppingCar">购物车</li>
          <li></li>
          <li @click="toMark">收藏夹</li>
          <li></li>
          <li>
            <el-dropdown size="small" @command="handleCommand">
              <span class="el-dropdown-link">
                卖家中心
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="shopRegister">免费开店</el-dropdown-item>
                <el-dropdown-item command="myShop">我的店铺</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toHome() {
      this.$router.push("/home");
    },
    toprofile() {
      this.$router.push("/profile");
    },
    toShoppingCar() {
      this.$router.push("/shoppingcar");
    },
    toMark() {
      this.$router.push("/mark");
    },
    handleCommand(command) {
      this.$router.push(`/${command}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.shortCut {
  height: 33px;
  line-height: 33px;
  width: 100%;
  background-color: #f1f1f1;
  ul {
    li {
      float: left;
      color: #6d6d6d;
    }
  }
  .main {
    .left {
      padding-left: 160px;
      float: left;
      font-size: 11px;
    }
    .right {
      float: right;
      font-size: 11px;
      padding-right: 160px;
      ul {
        li:nth-child(even) {
          width: 1px;
          height: 13px;
          background-color: #666;
          margin: 9px 15px 0;
        }
        li:nth-child(odd) {
          cursor: pointer;
        }
        li:hover {
          color: red;
        }
      }
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 11px;
  color: #666;
}
.el-dropdown-link:hover {
  color: red;
}
.el-icon-arrow-down {
  font-size: 11px;
}
</style>