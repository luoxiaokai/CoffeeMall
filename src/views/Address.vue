<template>
  <div>
    <div>
      <BackNav left-arrow left-text="返回" title="地址列表" />
    </div>
    <div class="box">
      <div class="top"></div>
      <div class="content">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @edit="onEdit"
        />
      </div>
      <div class="bottom">
        <van-button round type="info" @click="onSearch">新增地址</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import BackNav from "../components/BackNav.vue";
export default {
  name: "Address",
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  created() {
    this.getAddressList();
  },
  components: {
    BackNav,
    Toast,
  },
  methods: {
    onEdit(item) {
      this.$router.push({ name: "Newaddress", params: { aid: item.aid } });
    },
    onSearch() {
      this.$router.push({ name: "Newaddress" });
    },
    //地址
    getAddressList() {
      this.axios({
        method: "get",
        url: "/findAddress",
        params:{

        }
      })
        .then((res) => {
          if (res.data.code === 20000) {
            res.data.result.forEach((v => {
              v.isDefault = Boolean(v.isDefault);
              v.address = `${v.province}${v.county}${v.addressDetail}`;
            }))
            // });
            this.list = res.data.result;
            
          }
          
        })
        .catch((err) => {
          
        });
        
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-tag--danger {
  background-color: #0c34ba;
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
  .content {
    width: 90%;
    left: 5%;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    top: 130px;
    position: fixed;
    bottom: 45px;
    overflow: scroll;
    .address {
      width: 90%;
      height: 70px;
      // line-height: 70px;
      // left: 5%;
      margin-top: 10px;
      margin-left: 5%;
      position: relative;
      border-bottom: 1px solid #ddd;
      .left {
        position: absolute;
        width: 80%;
        height: 100%;
        left: 0;
        // line-height: 70px;
        p {
          display: flex;
          span {
            margin-right: 10px;
            &:nth-child(1) {
              font-size: 14px;
            }
            &:nth-child(2) {
              line-height: 20px;
            }
            &:nth-child(3) {
              // display: block;
              width: 30px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              color: #fff;
              border-radius: 30px;
              background-color: #0c34ba;
            }
          }
        }
      }
      .right {
        position: absolute;
        width: 20%;
        height: 100%;
        right: 0;
        line-height: 70px;
      }
    }
  }
  .bottom {
    position: fixed;
    width: 90%;
    height: 40px;
    bottom: 5px;
    left: 5%;
    .van-button {
      width: 100%;
      height: 40px;
      background-color: #0c34ba;
    }
  }
}
/deep/.van-button--danger {
  background-color: #fff;
  color: #fff;
  border: 1px solid #fff;
}
</style>