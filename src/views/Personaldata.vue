<template>
  <div>
    <div>
      <BackNav left-arrow left-text="返回" title="个人资料" />
    </div>
    <div class="box">
      <div class="top"></div>
      <div class="bottom">
        <ul>
          <li>
            <span>头像 </span>
            <span>
              <van-uploader :after-read="changeAvatar">
                <img :src="list.userImg" alt="" />
              </van-uploader>
            </span>
          </li>
          <li>
            <span>用户id</span>
            <span>{{ list.userId }}</span>
          </li>
          <li @click="showPopup()">
            <span>昵称</span>
            <span>{{ list.nickName }}</span>
          </li>
          <li @click="showPopupp()">
            <span>简介</span>
            <span>{{ list.desc }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="新用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写新用户名' }]"
        />

        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="Modifynickname()"
            >提交</van-button
          >
        </div>
      </van-form>
    </van-popup>

    <van-popup v-model="showw" position="bottom" :style="{ height: '30%' }">
      <van-form @submit="onSubmitt">
        <van-field v-model="value" name="简介" label="简介" />

        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="Introductiontorevision()"
            >提交</van-button
          >
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: "Personaldata",
  data() {
    return {
      value: "",
      // desc: "这个人很懒,什么都没有留下!!!",
      username: "",
      list: [],
      ss: "",
      show: false,
      showw: false,
    };
  },
  created() {
    this.GetS();
    
    // this. Modifynickname();
  },

  methods: {
    // 上传头像接口
    changeAvatar(file) {
      // let imgType = fire.fire.name.split('.')[1];
      let imgType = file.file.name.split(".")[1];
      let serverBase64Img = file.content.replace(
        /^data:image\/[A-Za-z]+;base64,/,
        ""
      );
      this.axios({
        method: "post",
        url: "/updateAvatar",
        data: {
          imgType,
          serverBase64Img,
        },
      })
        .then((res) => {
          
          if (res.data.code === "H001") {
            this.$toast(res.data.msg);
            // 延迟1秒后更新页面数据
            let timer = setTimeout(() => {
              clearTimeout(timer);
              // 调用查询用户信息方法更新页面数据
              this.GetS();
            }, 1000);
          }
        })
        .catch((err) => {});
    },
    //修改昵称
    Modifynickname() {
      this.axios({
        method: "post",
        url: "/updateNickName",
        data: {
          nickName: this.username,
        },
      })
        .then((res) => {
          
          if (res.data.code === "C001") {
            this.$toast(res.data.msg);
            setTimeout(() => {
              this.$router.go(0);
            }, 2000);
          }
        })
        .catch((err) => {
          
        });
    },
    //修改简介
    Introductiontorevision() {
      this.axios({
        method: "post",
        url: "/updateDesc",
        data: {
          desc: this.value,
        },
      })
        .then((res) => {
          
          if (res.data.code === "D001") {
            this.value = res.data.desc;
            this.$toast(res.data.msg);
            setTimeout(() => {
              this.$router.go(0);
            }, 2000);
          }
        })
        .catch((err) => {
          
        });
    },
    onSubmit(values) {
      
    },
    onSubmitt(values) {
      
    },
    showPopup() {
      this.show = true;
    },
    showPopupp() {
      this.showw = true;
    },
    //获取用户信息
    GetS() {
      this.axios({
        method: "get",
        url: "/findAccountInfo",
        // pid: this.pid,
      })
        .then((res) => {
          
          // if (res.data.code === A001) {
          if (res.data.code === "B001") {
            this.list = res.data.result[0];
          }
          
          // 
          // }
        })
        .catch((err) => {
          
        });
    },
  },
  components: {
    BackNav,
  },
};
</script>

<style lang="less" scoped>
/deep/.van-cell {
  margin-top: 20px;
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
    height: 230px;
    background-color: #fff;
    // margin: auto;
    left: 5%;
    top: 80px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    li {
      width: 90%;
      height: 30px;
      margin: auto;
      line-height: 30px;
      font-size: 14px;
      padding: 10px 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      span:nth-child(2) {
        position: absolute;
        right: 20px;
        color: #c2cad7;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>