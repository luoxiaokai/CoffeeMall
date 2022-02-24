<template>
  <div class="home">
    <div class="box">
      <div class="left" v-for="(item,index) in cnnames" :key="index">
        <span>下午好</span>
        <span>{{item.nickName}}</span>
      </div>
      <div class="right">
        <van-search v-model="value" placeholder="请输入商品名称"  @click="onSearch"/>
      </div>
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in homeList" :key="index"
          ><img class="images" :src="item.bannerImg"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="remai"><span>热卖推荐</span></div>
    <div class="shangpin">
      <div
        class="kafei"
        v-for="(item, index) in Hotsale"
        :key="index"
        @click="viewDetail(item.pid)"
      >
        <img :src="item.smallImg" />
        <p>{{ item.name }}</p>
        <p>{{ item.enname }}</p>
        <p>￥{{ item.price }}</p>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeIndex: 0,
      homeList: [],
      value: "",
      pid: "",
      Hotsale: [],
      vla: "",
      cnnames:'',
    };
  },
  components: {},
  created() {
    this.Getcarousel();
    this.Recommendation();
    this.cnname();
    this.pid = this.$route.params.pid;
  },
  methods: {

     cnname() {
      this.axios({
        method: "get",
        url: "/findMy",
      })
        .then((res) => {
          
            this.cnnames = res.data.result;
        })
        .catch((err) => {
          
        });
    },
    onSearch() {
      this.$router.push({ name: "Sousuo" });
    },
    Getcarousel() {
      this.axios({
        method: "get",
        url: "/banner",
        pid: this.pid,
      })
        .then((res) => {
          
          if (res.data.code === 300) {
            this.homeList = res.data.result;
            
          }
        })
        .catch((err) => {
          
        });
    },
    Recommendation() {
      this.axios({
        method: "get",
        url: "/typeProducts",
        params: {
          key: "isHot",
          value: 1,
        },
      })
        .then((res) => {
          
          if (res.data.code === 500) {
            this.Hotsale = res.data.result;
            
          }
        })
        .catch((err) => {
          
        });
    },
    viewDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },
  },
};
</script>

<style lang="less" scoped>
.van-button {
  border: none;
}
.box {
  display: flex;
  height: 46px;
  line-height: 46px;
  position: relative;
  background-color: #fff;
  .left {
    left: 10px;
    font-size: 14px;
    position: absolute;
    span {
      padding: 0 10px;
    }
    span:nth-child(2) {
      color: #0c34ba;
    }
  }
/deep/ .van-search{
  height: 100%;
}
  .right {
    height: 100%;
    width: 60%;
    right: 0;
    position: absolute;
    .yuan {
      border-radius: 40px;
    }
  }
}

.banner {
  width: 90%;
  margin: 10px auto;
  border-radius: 20px;
  overflow: hidden;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    width: 100%;
    .my-swipe .van-swipe-item img {
      width: 100%;
    }
  }
  .images {
    width: 100%;
    display: block;
  }
}
.remai {
  width: 90%;
  height: 50px;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  align-items: center;
  span {
    // display: block;
    width: 100px;
    height: 35px;
    color: #fff;
    line-height: 35px;
    font-size: 18px;
    text-align: center;
    border-top-right-radius: 10px;
    background-color: #0c34ba;
  }
}
.shangpin {
  box-sizing: border-box;
  overflow-y: auto;
  width: 90%;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 5px;
  .kafei {
    margin: 0 auto;
    width: 45%;
    border-radius: 10px;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    p:nth-child(2) {
      font-size: 16px;
    }
    p:nth-child(3) {
      font-size: 14px;
      color: #b3b4b4;
      margin-top: -5px;
    }
    p:nth-child(4) {
      font-size: 16px;
      color: #0c34ba;
      font-weight: bold;
    }
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
