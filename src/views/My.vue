<template>
  <div>
    <div class="box">
      <div class="head">
        <van-uploader :after-read="changeBg">
          <img :src="list.userBg" alt="" />
        </van-uploader>
      </div>
      <div class="nav">
        <div class="touming">
          <div class="top">
            <div class="left">
              <!-- 修改头像 -->
              <img :src="list.userImg" />
            </div>
            <div class="right">
              <p>{{ list.nickName }}</p>
              <p>{{ list.desc }}</p>
            </div>
          </div>
          <div class="bottom">
            <ul>
              <li @click="onSearch">
                <span>个人资料</span>
                <span>
                  <van-icon name="arrow" />
                </span>
              </li>
              <li @click="onSearch1">
                <span>我的订单</span>
                <span>
                  <van-icon name="arrow" />
                </span>
              </li>
              <li @click="onSearch2">
                <span>我的收藏</span>
                <span>
                  <van-icon name="arrow" />
                </span>
              </li>
              <li @click="onSearch3">
                <span>地址管理</span>
                <span>
                  <van-icon name="arrow" />
                </span>
              </li>
              <li @click="onSearch4">
                <span>安全中心</span>
                <span>
                  <van-icon name="arrow" />
                </span>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.Getcarousel();
    // this.Gett();
    this.Signin();
  },
  methods: {
    Signin() {
      this.axios({
        method: "post",
        url: "/like",
        // pid: this.pid,
      })
        .then((res) => {
          
          if (res.data.code === 700) {
            this.$router.push({ name: "Login" });
          } else if (res.data.code === 200) {
            this.$router.push({ name: "my" });
          }
        })
        .catch((err) => {
          
        });
    },
    Getcarousel() {
      this.axios({
        method: "get",
        url: "/findMy",
        // pid: this.pid,
      })
        .then((res) => {
          
          this.list = res.data.result[0];
        })
        .catch((err) => {
          
        });
    },
    
    onSearch() {
      this.$router.push({ name: "Personaldata" });
    },
    onSearch1() {
      this.$router.push({ name: "Myorder" });
    },
    onSearch2() {
      this.$router.push({ name: "Mycollection" });
    },
    onSearch3() {
      this.$router.push({ name: "Address" });
    },
    onSearch4() {
      this.$router.push({ name: "Securitycenter" });
    },
    // 修改背景
    changeBg(file) {
      // 此时可以自行将文件上传至服务器
      let imgType = file.file.name.split(".")[1];
      let serverBase64Img = file.content.replace(
        /^data:image\/[A-Za-z]+;base64,/,
        ""
      );
      //
      this.axios
        .post("/updateUserBg", {
          imgType,
          serverBase64Img,
        })
        .then((res) => {
          //

          if (res.data.code === "I001") {
            this.$toast(res.data.msg);
            let timer = setTimeout(() => {
              clearTimeout(timer);
              this.Getcarousel();
            }, 500);
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.mask {
  width: 100%;
}

.box {
  position: relative;
  .head {
    position: absolute;
    width: 100%;
    height: 200px;
    top: 0;
    overflow: hidden;
    img {
      width: 100%;
      margin: auto;
    }
  }
  /deep/.van-uploader__input-wrapper{
    width: 100%;
    height: 100%;
  }
  /deep/.van-uploader__wrapper{
    width: 100%;
    height: 100%;
  }
  /deep/.van-uploader{
    width: 100%;
    height: 100%;
  }
  .nav {
    position: absolute;
    width: 100%;
    height: 400px;
    top: 160px;
    background-color: transparent;
    .touming {
      width: 90%;
      height: 375px;
      margin: auto;
      border-radius: 20px;
      position: relative;
      background-color: rgba(243, 243, 243, 0.5);
      .top {
        position: absolute;
        width: 100%;
        height: 90px;
        display: flex;
        .left {
          width: 80px;
          height: 80px;
          margin-left: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .right {
          margin-left: 20px;
          p {
            font-size: 12px;
            &:nth-child(1) {
              color: #0c34ba;
              font-weight: bold;
              font-size: 14px;
            }
          }
        }
      }
      .bottom {
        position: absolute;
        width: 100%;
        height: 250px;
        bottom: 0;
        li {
          width: 100%;
          height: 50px;
          line-height: 50px;
          position: relative;
          border-bottom: 1px solid;
          span {
            font-size: 14px;
            position: absolute;
            &:nth-child(1) {
              left: 10px;
              color: rgb(150, 148, 148);
            }
            &:nth-child(2) {
              right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>