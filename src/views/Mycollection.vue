<template>
  <div>
    <div>
      <BackNav left-arrow left-text="返回" title="我的收藏" />
    </div>
    <div class="box">
      <div class="top"></div>
      <div class="bottom">
        <div class="shangpin">
          <div class="kafei" v-for="(item, index) in list" :key="index">
            <img :src="item.smallImg" @click="viewDetail(item.pid)" />
            <p>{{ item.name }}</p>
            <p>{{ item.enname }}</p>
            <p>
              ￥{{ item.price }}
              <span>
                <van-icon
                  name="delete-o"
                  size="18"
                  @click="getProduct(item.pid, index)"
                />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: "Mycollection",
  data() {
    return {
      list: [],
      getp: [],
      pid: "",
    };
  },
  components: {
    BackNav,
  },
  created() {
    this.getProductType();

    this.pid = this.$route.params.pid;
  },
  methods: {
    getProductType(pid, index) {
      //如果是get请求, 参数需要写在params字段, 如果是post请求, 需要把参数写在data字段中
      this.axios({
        method: "get",
        url: "/findAllLike",
        pid: this.pid,
      })
        .then((res) => {
          
          if (res.data.code === 2000) {
            this.list = res.data.result;
          }
        })
        .catch((err) => {
          
        });
    },
    getProduct(pid, index) {
      this.axios({
        method: "post",
        url: "/notlike",
        data: {
          pid,
        },
      })
        .then((res) => {
          
          if (res.data.code === 900) {
            this.$toast(res.data.msg);
            this.list.splice(index, 1);
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
.box {
  position: relative;
  .top {
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: #0c34ba;
  }
  .bottom {
    position: absolute;
    width: 90%;
    // height: 200px;
    top: 80px;
    left: 5%;
    border-radius: 10px;
    background-color: #fff;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    .shangpin {
      box-sizing: border-box;
      overflow-y: auto;
      width: 100%;

      // margin-left: 10px;
      //   margin: 30px auto;
      display: flex;
      flex-wrap: wrap;
      //   margin-left: 15px;
      //   padding: 5px 5px;
      .kafei {
        margin-top: 10px;
        margin-left: 8px;
        width: 30%;
        overflow: hidden;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        p:nth-child(2) {
          font-size: 14px;
        }
        p:nth-child(3) {
          font-size: 14px;
          color: #b3b4b4;
          margin-top: -5px;
        }
        p:nth-child(4) {
          font-size: 14px;
          color: #0c34ba;
          font-weight: bold;
          position: relative;
          span {
            position: absolute;
            right: 5px;
          }
        }
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>