<template>
  <div>
    <div class="box">
      <div class="left">
        <BackNav left-arrow left-text="返回" />
      </div>
      <div class="right">
        <van-search
          v-model="vla"
          show-action
          placeholder="请输入商品名称"
          @search="onsearch"
        >
          <template #action>
            <div @click="onsearch">搜索</div>
          </template>
        </van-search>
      </div>
    </div>
    <div class="shangpin">
      <div
        class="box-one"
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
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: "Sousuo",
  data() {
    return {
      vla: "",
      Hotsale: [],
    };
  },
  components: {
    BackNav,
  },
  methods: {
    onsearch() {
      this.axios({
        method: "get",
        url: "/search",
        pid: this.pid,
        params: {
          name: this.vla,
        },
      })
        .then((res) => {
          
          // // if (res.data.code === 300) {
          this.Hotsale = res.data.result;
          // //   
          // // }
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
.van-search {
  height: 46px;
}
.box {
  display: flex;
  // height: 54px;
  background-color: #fff;
  position: relative;
  margin-bottom: 50px;
  .left {
    position: absolute;
    left: 0;
    height: 54px;
    width: 30%;
  }
  .right {
    width: 70%;
    position: absolute;
    right: 0;
  }
}
.shangpin {
  width: 90%;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .box-one {
    // margin-top: 50px;
    margin-bottom: 10px;
    padding: 10px 15px;
    width: 35%;
    height: 200px;
    background-color: #fff;
    img {
      width: 100%;
    }
    p {
      font-size: 14px;
      margin-bottom: -10px;
      &:nth-child(3) {
        color: #646566;
      }
      &:nth-child(4) {
        color: #0c34ba;
        font-weight: bold;
      }
    }
  }
}
</style>