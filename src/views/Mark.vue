<template>
  <div>
    <shortcut></shortcut>
    <div class="main">
      <div class="left"></div>
      <div class="center">
    <div class="header">
      <h1>
        桃子商城
        <span>收藏夹</span>
      </h1>
    </div>
    <!-- 收藏夹主体 -->
      <el-row :style="{width: '660px','margin-left':'120px'}" v-if="list[0]">
        <el-col :span="8" v-for="(item, index) in list" :key="index" >
          <el-card :body-style="{ padding: '10px' ,width: '200px'}">
            <img
              :src="item.pictureUrl"
              class="image"
            />
            <div style="padding: 14px;">
              <div :style="{'margin-bottom':'10px'}">{{item.name}}</div>
              <span :style="{color:'red'}">￥{{item.discountPrice}}</span>
              <span :style="{'text-decoration':'line-through','margin-top': '10px'}">￥{{item.price}}&nbsp;&nbsp;</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="removeFavorite(item.id)">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
      ></el-pagination>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import shortcut from "../components/ShortCut";
export default {
  components: {
    shortcut: shortcut
  },
  data() {
    return {
      showMark:false,
      list: [
      ],
      queryInfo: {
        //用户id
        customerId:'',
        // 当前页数
        pagenum:1,
        // 当前每页显示多少条数据
        pagesize:5
      },
      total:0,
      url:''
    };
  },
  created() {
    this.getID();
    this.getFavoriteList();
  },
  methods: {
    async getFavoriteList(){
      console.log(this.queryInfo);
      this.url=`/api/favorite/list?customerId=${this.queryInfo.customerId}&pageNum=${this.queryInfo.pagenum}&pagesize=${this.queryInfo.pagesize}`;
      console.log(this.url)
      const {data:res} = await this.$http.get(this.url)
      if(res.length>0) this.showMark=true;
      // const {data:res} = await this.$http.get('/api/favorite/list', {
      //   params: {
      //     customerId:this.queryInfo.customerId,
      //     pagenum:this.queryInfo.pagenum,
      //     pagesize:this.queryInfo.pagesize
      //   }
      // })
      console.log(res)
      this.list = res;
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize){
      console.log(newSize)
      this.queryInfo.pagesize = 3;
      // this.getFavoriteList();
    },
    handleCurrentChange(newPage){
      console.log(newPage)
      this.queryInfo.pagenum = newPage;
      // this.getFavoriteList();
    },
    async removeFavorite(id){
      console.log(id)
      const {data:res} = await this.$http.post('/api/favorite/cancel', 
       JSON.stringify({goodsId:id,customerId:this.queryInfo.customerId})
      )
      console.log(res);
      this.getFavoriteList();
    },
    getID(){
      this.queryInfo.customerId = this.$store.state.userID;
    }
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
  span {
    font-size: 20px;
    margin-left: 6px;
  }
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: left;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-row{
  
  margin-top:20px; 
}

.el-pagination{
  margin-top: 15px; 
  margin-left:120px;
}
</style>

