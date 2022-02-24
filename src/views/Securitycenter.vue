<template>
  <div>
    <div><BackNav left-arrow left-text="返回" title="安全中心" /></div>
    <div class="box">
      <div class="top"></div>
      <div class="bottom">
        <ul>
          <li @click="Show()">
            <span>修改密码</span>
            <span>
              <van-icon name="arrow" />
            </span>
          </li>
          <li @click="signOut()">
                <span>退出登录</span>
                <span>
                  <van-icon name="arrow" />
                </span>
              </li>
          <li @click="Getcarousel()">
            <span>注销账号</span>
            <span>
              <van-icon name="arrow" />
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <van-popup v-model="show" position="bottom" :style="{ height: '33%' }">
        <div class="tan">
          <div class="top">
            <p>
              <span @click="mima()">修改密码</span
              ><span @click="hide()">×</span>
            </p>
          </div>
          <div class="center">
            <van-field
              v-model="oldPassword"
              :type="isOpens ? 'text' : 'password'"
              name="password"
              label="旧密码"
              placeholder="密码(6-16位)"
              :right-icon="isOpens ? 'eye-o' : 'closed-eye'"
              autocomplete="off"
              @click-right-icon="togglePassword"
              :rules="[
                { required: true, message: '请填写密码' },
                {
                  pattern: passwordReg,
                  message: '支持数字字母下划线组合并且以字母开头',
                },
              ]"
            />
            <van-field
              v-model="password"
              name="password"
              :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
              @click-right-icon="togglePasswordStatus"
              autocomplete="off"
              :type="isOpen ? 'text' : 'password'"
              label="新密码"
              :rules="[
                { required: true, message: '请填写密码' },
                {
                  pattern: passwordReg,
                  message: '支持数字字母下划线组合并且以字母开头',
                },
              ]"
            />
          </div>
          <div class="bottom">
            <van-button round type="info" @click="mima">提交</van-button>
          </div>
        </div></van-popup
      >
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  data() {
    return {
      isOpen: false,
      isOpens: false,
      show: false,

      passwordReg: /^[A-Za-z]\w{5,15}$/,

      oldPassword: "",
      password: "",
    };
  },
  components: {
    BackNav,
  },
  created() {
    // this.Getcarousel();
  },
  methods: {
    mima() {
      if (!this.oldPassword) {
        this.$toast("旧不能为空");
        return;
      }
      if (!this.password) {
        this.$toast("新不能为空");
        return;
      }

      this.axios({
        method: "post",
        url: "/updatePassword",
        data: {
          oldPassword: this.oldPassword,
          password: this.password,
        },
      })
        .then((res) => {
          
          if (res.data.code === "E003") {
            this.$toast(res.data.msg);
          }
          if (res.data.code === "E001") {
            this.$toast(res.data.msg);
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        })
        .catch((err) => {
          
        });
    },

    togglePasswordStatus() {
      this.isOpen = !this.isOpen;
    },
    togglePassword() {
      this.isOpens = !this.isOpens;
    },

    //   显示修改密码
    Show() {
      this.show = true;
    },
    //退出登录
    signOut() {
      this.axios({
        method: "post",
        url: "/logout",
        // pid: this.pid,
      })
        .then((res) => {
          
          if (res.data.coded === "F001") {
            res.data.result;
          }
        })
        .catch((err) => {
          
        });
      this.$router.go(-1);
    },
    hide() {
      this.show = false;
    },

    //   注销
    
    Getcarousel() {
      this.axios({
        method: "post",
        url: "/destroyAccount",
        // pid: this.pid,
      })
        .then((res) => {
          
          if (res.data.code === "G001") {
            res.data.result;
            // 
          }
        })
        .catch((err) => {
          
        });
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-button {
  background-color: #0c34ba;
  border: 1px solid #0c34ba;
}
/deep/.van-button {
  width: 100%;
}
/deep/.van-cell {
  border-bottom: 1px solid #ddd;
}

.tan {
  width: 95%;
  height: 90%;
  margin-left: 10px;
  position: relative;
  .top {
    position: absolute;
    // top: 10px;
    width: 100%;
    height: 17%;
    p {
      margin: 0;
      padding: 0;
      font-size: 16px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      span {
        &:nth-child(2) {
          width: 30px;
          font-size: 33px;
        }
      }
    }
  }
  .center {
    position: absolute;
    top: 20%;
    width: 90%;
    left: 5%;
    height: 54%;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 90%;
    left: 5%;
    height: 25%;
  }
}
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
    height: 150px;
    background-color: #fff;
    // margin: auto;
    left: 5%;
    top: 80px;
    border-radius: 20px;
    li {
      width: 90%;
      height: 50px;
      line-height: 50px;
      position: relative;
      left: 5%;
      top: 10px;
      border-bottom: 1px solid;
      // margin-bottom: 10px;
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
</style>