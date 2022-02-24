<template>
  <div>
    <div>
      <BackNav left-arrow left-text="返回" title="我的订单" />
      <div class="box">
        <div class="top"></div>
        <div class="buttom">
          <van-tabs v-model="tabIndex" @click="Submit">
            <van-tab
              :title="item.title"
              v-for="(item, index) in tabData"
              :key="index"
               @change="changeOrderStatus"
            >
              <div class="center">
                <div class="one" v-for="(item, index) in orderData" :key="index">
                  <div class="biaoti">
                    <p>{{ item.orderId }}</p>
                    <div class="o-status">
                      <div class="o-finished" v-if="item.status === 2">
                        <div>已完成</div>
                        <div
                          class="o-remove"
                          @click="removeOrder(item.orderId, index)"
                        >
                          <van-icon name="delete-o" size="20" />
                        </div>
                      </div>
                      <div class="qr" v-else @click="receive(v)">确认收货</div>
                    </div>
                  </div>
                  <div class="center-one">
                    <div class="one-box" v-for="(item, index) in item.data" :key="index">
                      <van-card
                        :num="item.count"
                        :price="item.price"
                        :desc="item.enname"
                        :title="item.name + item.rule"
                        :thumb="item.smallImg"
                      />
                    </div>
                  </div>
                  <div class="center-two">
                    <p>1970-01-01&nbsp;&nbsp;00:00:00</p>
                    <p><span>共计6件</span><span>合计￥162</span></p>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: "Myorder",
  data() {
    return {
      tabIndex: 0,
      list: [],
      orderData: [],
      tabData: [
        {
          title: "全部",
        },
        {
          title: "进行中",
        },
        {
          title: "已完成",
        },
      ],
    };
  },
  components: {
    BackNav,
  },
  created() {
    this.Submit(this.tabIndex);
    // this.Items();
  },
  methods: {
    changeOrderStatus(){
       this.Submit(this.tabIndex);
    },
    //订单
    Submit(status) {
      this.axios({
        method: "get",
        url: "/findOrder",
        params: {
          status
        },
      })
        .then((res) => {
          let arr = [];
          res.data.result.forEach((item) => {
           
            if (arr.indexOf(item.oid) === -1) {
              arr.push(item.oid);
            }
          });
          

          let orderData = [];
          arr.forEach((v1) => {
            let order = {
              orderId: v1,
              date: "",
              total: 0,
              money: 0,
              status: -1,
              data: [],
            };

            //查找订单
            res.data.result.forEach((v2) => {
              if (v1 === v2.oid) {
                if (!order.date) {
                  order.date = v2.createdAt;
                }
                if (order.status === -1) {
                  order.status = v2.status;
                }
                order.total += v2.count;
                order.money += v2.count * v2.price;
                order.data.push(v2);
              }
            });
            order.money = order.money.toFixed(2);
            orderData.push(order);
          });
          this.orderData = orderData;
          
        })
        .catch((err) => {});
    },
    //商品条目
    Items() {
      this.axios({
        method: "get",
        url: "/shopcartRows",
      })
        .then((res) => {})
        .catch((err) => {});
    },
    //确认收货
    receive(item) {
      
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确认收货？",
        })
        .then(() => {
          //发起确认收货请求

          this.axios({
            method: "POST",
            url: "/receive",
            data: {
              oid: item.orderId,
            },
          })
            .then((res) => {
              this.$toast(res.data.msg);
              
              if (res.data.code === 80000) {
                item.status = 2;

                //如果是在进行中订单确认收货，需要移除订单数据
                if (this.tabIndex === 1) {
                  for (let i = 0; i < this.orderData.length; i++) {
                    if (item.oid === this.orderData.orderId) {
                      this.orderData.splice(i, 1);
                      return;
                    }
                  }
                }
              }
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    },

    //删除
    removeOrder(oid, index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确认删除？",
        })
        .then(() => {
          //发起确认收货请求

          this.axios({
            method: "POST",
            url: "/removeOrder",
            data: {
              oid,
            },
          })
            .then((res) => {
              this.$toast(res.data.msg);

              if (res.data.code === 90000) {
                this.orderData.splice(index, 1);
              }
        
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.center {
  width: 90%;
  padding: 5px;
  top: 200px;
  position: fixed;
  overflow: scroll;
  left: 4%;
  bottom: 1px;
  background-color: #fff;
  border-radius: 10px;
  .one {
    margin-bottom: 30px;
  }
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

.box {
  position: relative;
  .top {
    position: absolute;
    width: 100%;
    height: 100px;
    top: 0;
    background-color: #0c34ba;
  }
  .buttom {
    width: 90%;
    // height: 300px;
    position: fixed;
    left: 5%;
    top: 130px;
    // bottom: 1px;
    border-radius: 20px;
    // overflow: scroll;
    // background-color: red;
  }
}
/deep/.van-tab--active {
  color: #0c34ba;
}
/deep/ .van-tabs__line {
  background-color: #0c34ba;
}
/deep/.van-tabs__wrap {
  border-radius: 10px;
}
/deep/.van-tabs__content {
  margin-top: 20px;
  background-color: #fff;
  //   height: 300px;
  padding: 10px 0;
  overflow: scroll;
}
.biaoti {
  display: flex;
  justify-content: space-between;
  p {
    font-size: 14px;
    color: #7f85a0;
  }
}
.o-finished {
  display: flex;
}
.o-remove {
  margin-left: 10px;
}
.o-status {
  line-height: 44px;
}
</style>