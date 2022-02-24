<template>
  <div>
    <div class="menu">
      <div class="box">
        <van-nav-bar
          title="购物袋"
          right-text="编辑"
          @click-right="onClickRight"
        />
      </div>

      <div class="gaodu">
        <div class="img">
          <img src="../assets/images/shopbag_bg.png" alt="" />
        </div>

        <div class="shangpin" v-for="(item, index) in dingdan" :key="index">
          <div class="dingdan">
            <van-checkbox
              v-model="item.checked"
              @click="getDanXuan"
            ></van-checkbox>
            <div class="image" @click="viewDetail(item.pid)">
              <div class="image-one">
                <img :src="item.small_img" alt="" />
              </div>
              <div class="image-two">
                <div class="one">
                  <span>{{ item.name }}</span
                  ><span>{{ item.rule }}</span>
                </div>

                <div class="two">
                  <span>{{ item.enname }}</span>
                </div>
                <div class="three">
                  <span>￥{{ item.price }}</span>
                </div>
              </div>
            </div>
            <div class="right">
              <van-stepper
                v-model="item.count"
                theme="round"
                button-size="22"
                disable-input
                @plus="increase(item)"
                @minus="reduce(item)"
              />
            </div>
          </div>
        </div>

        <div class="bottom">
          <van-submit-bar
            @submit="Carrydata()"
            :price="isMoney * 100"
            button-text="提交订单"
          >
            <van-checkbox v-model="check" @click="allChecked()"
              >全选</van-checkbox
            >
          </van-submit-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shopbag",
  data() {
    return {
      radio: "1",
      check: false,
      shopbagList: [],
      dingdan: [],
      isMoney: 0,
      arr: [],
    };
  },
  created() {
    this.shop();
    this.gouwuche();
  },
  methods: {
    Carrydata() {
      for (let i = 0; i < this.dingdan.length; i++) {
        if (this.dingdan[i].checked) {
          
          this.arr.push(this.dingdan[i].sid);
        }
      }
      if (this.arr.length === 0) {
        this.$toast("请选择商品");
      } else {
        
        this.$store.commit("getsids", this.arr);
        this.$router.push({
          name: "Ordersettlement",
          query: { shoparr: this.arr },
        });
      }
    },
    //提交订单
    Placeorder() {
      // 获取提交的商品

      let sids = [];

      this.dingdan.forEach((v) => {
        if (v.checked) {
          sids.push(v.sid);
        }
      });
      if (sids.length == 0) {
        this.$toast("未选中商品");
        return;
      }
      this.$router.push({
        name: "Ordersettlement",
        query: { sids: sids.join("-") },
      });
    },
    viewDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },
    // 点击单选状态
    getDanXuan() {
      this.getMoney();
      for (let i = 0; i < this.dingdan.length; i++) {
        if (!this.dingdan[i].checked) {
          this.check = false;
          return;
        }
      }
      this.check = true;
    },
    //全选
    allChecked() {
      this.dingdan.forEach((v) => {
        v.checked = this.check;
      });
      this.getMoney();
    },
    //跳转Deleteselected
    onClickRight() {
      this.$router.push({ name: "Deleteselected" });
    },
    //渲染
    shop() {
      this.axios({
        method: "get",
        url: "/shopcartCount",
        pid: this.pid,
      })
        .then((res) => {
          
          // if (res.data.code === 300) {
          //   this.homeList = res.data.result;
          //   
          // }
        })
        .catch((err) => {
          
        });
    },
    //购物车
    gouwuche() {
      this.axios({
        method: "get",
        url: "/findAllShopcart",
        pid: this.pid,
      })
        .then((res) => {
          
          if (res.data.code === 5000) {
            for (let i = 0; i < res.data.result.length; i++) {
              res.data.result[i].checked = false;
            }
            this.dingdan = res.data.result;
            
          }
        })
        .catch((err) => {
          
        });
    },
    // 增加商品数量
    increase(item) {
      item.count++;
      this.axios({
        method: "post",
        url: "/modifyShopcartCount",
        data: {
          sid: item.sid,
          count: item.count,
        },
      })
        .then((res) => {})
        .catch((err) => {
          
        });
      this.getMoney();
      this.$router.go(0);
    },
    // 减少商品数量
    reduce(item) {
      item.count--;
      this.axios({
        method: "post",
        url: "/modifyShopcartCount",
        data: {
          sid: item.sid,
          count: item.count,
        },
      })
        .then((res) => {})
        .catch((err) => {
          
        });
      this.getMoney();
    },
    // 统计金额
    getMoney() {
      this.isMoney = 0;
      this.dingdan.forEach((item) => {
        if (item.checked) {
          this.isMoney += Number(item.count) * Number(item.price);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-submit-bar__price {
  color: #0c34ba;
}
/deep/.van-button[data-v-563d9308] {
  background-color: #0c34ba;
}
/deep/.van-submit-bar__button--danger {
  // background-color: #0c34ba;
  background: -webkit-linear-gradient(left, #0c34ba, #0c34ba);
}
/deep/.van-submit-bar__button--danger {
  background-color: #0c34ba;
}
/deep/.van-button {
  background-color: #0c34ba;
}
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}

.goods-card {
  margin: 0;
  background-color: pink;
}

.delete-button {
  height: 100%;
}

.box {
  position: flex;
  top: 0;
  // z-index: 1000;
}
.gaodu {
  width: 100%;
  position: fixed;
  bottom: 110px;
  top: 46px;
  overflow: scroll;
}
.img {
  width: 100%;
  img {
    width: 100%;
  }
}
.shangpin {
  width: 95%;
  height: 100px;
  margin: 10px auto;
  border-radius: 10px;
  display: flex;
  align-items: center;

  background-color: #fff;
  .dingdan {
    width: 90%;
    height: 80px;
    display: flex;
    margin: auto;
    position: relative;
    .right {
      position: absolute;
      right: 0;
      bottom: 10px;
    }
  }
}
/deep/ .van-stepper--round .van-stepper__plus {
  background-color: #0c34ba;
}
/deep/ .van-stepper--round .van-stepper__minus {
  color: #0c34ba;
  border-color: #0c34ba;
}
.image {
  width: 65%;
  margin-left: 10px;
  height: 100%;
  display: flex;
}
.image-one {
  width: 40%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.image-two {
  width: 60%;
  height: 100%;
  margin-left: 10px;
  position: relative;
}
.one {
  margin-bottom: 8px;
}
.one span {
  color: #c2c2c2;
}
.one span:nth-child(2) {
  position: absolute;
  right: 0;
}
.one span:nth-child(1) {
  font-size: 14px;
  color: #757575;
}
.two {
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #c2c2c2;
}
.three {
  position: absolute;
  bottom: 0;
  color: #0c34ba;
  font-size: 14px;
  font-weight: bold;
}
.bottom {
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 60px;
  background-color: #fff;
  .dingwei {
    display: flex;
    width: 90%;
    margin: 0 auto;
  }
}
.van-radio {
  height: 60px;
}

.van-button {
  position: absolute;
  right: 10px;
  margin: 7px;
  width: 30%;
  background-color: red;
  border: none;
}

/deep/ .van-submit-bar {
  margin-bottom: 50px;
}
/deep/.van-submit-bar__text {
  margin-right: 115px;
}
</style>