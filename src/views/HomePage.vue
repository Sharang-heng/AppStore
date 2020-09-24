<template>
  <div>
    <shortcut></shortcut>
    <el-row :style="{width: '760px','margin-left':'140px'}">
      <el-col :span="8" v-for="(item, index) in list" :key="index">
        <el-card :body-style="{ padding: '10px' ,width: '200px'}">
          <img :src="item.pictureUrl" class="image" />
          <div style="padding: 14px;">
            <div :style="{'margin-bottom':'10px'}">{{item.name}}</div>
            <span :style="{color:'red'}">￥{{item.discountPrice}}</span>
            <span
              :style="{'text-decoration':'line-through','margin-top': '10px'}"
            >￥{{item.price}}&nbsp;&nbsp;</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="addIntoFavorite(item.id)">加入收藏夹</el-button>
              <el-button type="text" class="button" @click="addIntoShoppingCar(item.id)">加入购物车</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import shortcut from "../components/ShortCut";
// import { create } from 'domain'
export default {
  components: {
    shortcut: shortcut
  },
  data() {
    return {
      uid: "",
      email: "",
      list: [],
      url: "",
      minuteList: []
    };
  },
  created() {
    this.getId();
    this.getAllShop();
  },
  methods: {
    getId() {
      this.uid = this.$store.state.userID;
      this.email = this.$store.state.email;
    },
    async getAllShop() {
      var url = "/api/goods/?pageNum=1&pageSize=50"
      const { data: res } = await this.$http.get(url);
      this.list = res.data;
      console.log(res.data);
    },
    async addIntoFavorite(id) {
      const { data: res } = await this.$http.post(
        "/api/favorite/save",
        JSON.stringify({ customerId: this.uid, goodsId: id })
      );
      console.log(res);
    },
    async addIntoShoppingCar(id) {
      this.url = `/api/goodsSell?goodsId=${id}&type=BOOK`;
      console.log(this.url);
      const { data: res } = await this.$http.get(this.url);
      this.minuteList = res;
      console.log(this.minuteList)
     
      const { data: result } = await this.$http.post(
        "/api/shoppingCart/save",
        JSON.stringify({
          customerId: this.uid,
          mount: 1,
          goodsSellDO: {
            goodsId: id,
            type: "BOOK",
            sellAttr: {
              version:this.minuteList[0].sellAttr.version
            }
          }
        })
      );
      console.log(result);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 15px;
  margin-left: 120px;
}
.image{
  width: 180px;
  height: 200px;
}
</style>