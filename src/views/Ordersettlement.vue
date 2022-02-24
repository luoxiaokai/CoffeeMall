<template>
  <div>
    <div>
      <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="box">
        <div class="top">
          <div class="top-one" @click="pop()">
            <span>选择地址<van-icon name="arrow" /></span>
          </div>
          <div class="top-two">
            <!-- <van-address-list
              :list="list"
              default-tag-text="默认"
            /> -->
            <p>
              <span>{{ selectAddress.name }}</span>
              <span>{{ selectAddress.tel }}</span>
              <span v-show="selectAddress.isDefault"
                ><van-tag mark>默认</van-tag></span
              >
            </p>
            <p>{{ selectAddress.address }}</p>
          </div>
        </div>
        <div class="center" v-for="(item, index) in array" :key="index">
          <p>订单信息</p>
          <div class="center-one" v-for="(item, index) in array" :key="index">
            <van-card
              :num="item.count"
              :price="item.price"
              :desc="item.enname"
              :title="item.name + item.rule"
              :thumb="item.small_img"
            />
          </div>
          <div class="center-two">
            <p>1970-01-01&nbsp;&nbsp;00:00:00</p>
            <!-- <p>{{item.updated_at}}</p> -->
            <p>
              <span>共计{{ len }}件</span><span>合计￥{{ money }}</span>
            </p>
          </div>
        </div>
        <div class="bottom">
          <van-button round type="info" @click="pay">立即结算</van-button>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" closeable>
      <div class="address-list">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @select="select"
          @add="goNewAddress"
          @edit="goNewAddress"
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "Ordersettlement",
  data() {
    return {
      Toast,
      shoparr: [],
      sids: [],
      //地址渲染
      list: [],
      //商品渲染
      array: [],
      len: "",
      money: "",
      chosenAddressId: "",

      show: false,
      //选择地址, (默认选择默认地址)
      selectAddress: {},
    };
  },

  components: {},
  created() {
    let sids = JSON.stringify(this.sids);
    this.Placeorder(sids);
    this.addresss();
    // this.Submit();
  },
  methods: {
    //组件
    onClickLeft() {
      //   Toast('返回');
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    },
    //商品查询
    Placeorder(sids) {
      
      let sidss = JSON.stringify(this.$route.query.shoparr);
      this.axios({
        method: "get",
        url: "/commitShopcart",
        params: {
          sids: sidss,
        },
      })
        .then((res) => {
          this.money = 0;
          if (res.data.code === 50000) {
            if (res.data.result.length === 0) {
              return;
            }
            // this.$router.push({ name: "Shopbag" });
            res.data.result.forEach((v) => {
              this.money += v.count * v.price;
            });
            this.array = res.data.result;
            this.len = this.array.length;
          }
          
        })
        .catch((err) => {
          // 
        });
    },
    //地址查询
    addresss() {
      this.sidss = JSON.stringify(this.$route.query.shoparr);
      this.axios({
        method: "get",
        url: "/findAddress",
      })
        .then((res) => {
          if (res.data.code === 20000) {
            res.data.result.forEach((v) => {
              v.isDefault = Boolean(v.isDefault);
              v.address = `${v.province}${v.city}${v.county}${v.addressDetail}`;

              //选择默认地址
              if (v.isDefault) {
                this.selectAddress = { ...v };
                this.chosenAddressId = v.id;
              }
            });

            this.list = res.data.result;
          }
          
          
        })
        .catch((err) => {
          // 
        });
    },

    pay() {
      this.shoparr.forEach((item) => {
        sids.push(item.sid);
      });
      let sids = JSON.stringify(this.$route.query.shoparr);
      let phone = this.selectAddress.tel;
      let receiver = this.selectAddress.name;
      let address = this.selectAddress.address;

      //用户二次确定订单
      this.$dialog
        .confirm({
          title: "确认订单",
          message: "是否确认提交？",
        })
        .then(() => {
          this.$toast("支付成功");
          this.axios({
            method: "POST",
            url: "/pay",
            data: {
              phone,
              receiver,
              address,
              sids,
            },
          })
            .then((res) => {
              
              //判断是否选择地址

              if (res.data.code === 60000) {
                this.$root.shoparr -= JSON.parse(sids).length;
                this.$toast(res.data.msg);
                setTimeout(() => {
                  this.$router.push({ name: "Myorder" });
                }, 1000);
              }
            })
            .catch((err) => {});

          setTimeout(() => {
            this.$router.push({ name: "Myorder" });
          }, 1000);
        })
        .catch((err) => {
          //取消
        });
    },
    //弹出选择地址列表层
    pop() {
      this.show = true;
    },
    //选择地址
    select(item) {
      if (this.chosenAddressId === item.id) {
        return;
      }

      this.chosenAddressId = item.id;

      this.selectAddress = { ...item };

      this.show = false;
    },
    //跳转到新增地址或者编辑地址页面
    goNewAddress(item) {
      if (item) {
        this.$router.push({ name: "Address", params: { aid: item.aid } });
      } else {
        this.$router.push({ name: "Address" });
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.van-address-list__bottom {
  display: none;
}
/deep/.van-tag--danger {
  background-color: #0c34ba;
}
/deep/.van-address-item .van-radio__icon--checked .van-icon {
  background-color: #0c34ba;
  border: 1px solid #0c34ba;
}
.box {
  position: relative;
  .top {
    top: 10px;
    width: 90%;
    height: 90px;
    position: absolute;
    padding: 5px;
    left: 4%;
    background-color: #fff;
    border-radius: 10px;
    .top-one {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: rgb(94, 94, 94);
    }
    .top-two {
      width: 100%;
      margin-top: 10px;
      height: 50px;
      p {
        padding: 0;
        margin: 0;
        margin-top: 3px;
        font-size: 14px;
        display: flex;
        color: rgb(153, 152, 152);
        span:nth-child(1) {
          color: #0c34ba;
          font-weight: bold;
          font-size: 16px;
        }
        span:nth-child(2) {
          margin-left: 20px;
        }
        // span:nth-child(3) {
        //   // margin-left: 20px;
        //   // width: 40px;
        //   // height: 20px;
        //   // font-size: 10px;
        //   // text-align: center;
        //   // background-color: #0c34ba;
        //   // color: #fff;
        //   // border-radius: 10px;
        // }
      }
    }
  }

  /deep/.van-tag--default {
    background-color: #fff;
    // color: #fff;
  }
  /deep/.van-tag {
    font-size: 10px;
  }
  .center {
    width: 90%;
    padding: 5px;
    top: 163px;
    position: fixed;
    overflow-y: auto;
    left: 4%;
    bottom: 60px;
    background-color: #fff;
    border-radius: 10px;
    /deep/.van-card {
      padding: 5px;
      font-size: 14px;
    }
    .center-one {
      border-bottom: 1px dashed #000;
      border-radius: 20px;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
    }
    .center-two {
      margin-top: 20px;
      p {
        font-size: #828586;
        display: flex;
        justify-content: space-between;
        span:nth-child(2) {
          color: #0c34ba;
          font-weight: bold;
        }
      }
    }
  }
  .bottom {
    width: 92%;
    height: 50px;
    position: fixed;
    left: 4%;
    bottom: 0;
    /deep/.van-button {
      width: 100%;
      background-color: #0c34ba;
      border: 1px solid #0c34ba;
    }
  }
}
</style>