<template>
    <div>
        <ul class="top">
            <li>您的位置：</li>
            <li @click="toHome" class="home">首页</li>
            <li>></li>
            <li @click="toProfile" class="mine">我的桃宝</li>
            <li>></li>
            <li class="now">我的购物车</li>
          </ul>
          <p class="presentation">购物车帮您一次性完成批量购买与付款，下单更便捷，付款更简单</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
     ul {
        margin-top: 35px;
        margin-left: 20px;
        font-size: 10px;
        .home:hover {
          color: red;
          border-bottom: 1px solid red;
        }
        .mine:hover {
          color: red;
          border-bottom: 1px solid red;
        }
        .now {
          color: #000000 !important;
        }
        li {
          float: left;
        }
        li:nth-child(even) {
          color: #3366cc;
          cursor: pointer;
        }
      }
      .presentation {
        color: #808080;
        font-size: 10px;
        float: right;
      }
</style>