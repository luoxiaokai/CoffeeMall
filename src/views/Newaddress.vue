<template>
  <div>
    <div>
      <BackNav
        left-arrow
        left-text="返回"
        :title="this.aid ? '编辑地址' : '新增地址'"
      />
    </div>
    <div>
      <van-address-edit
        :area-list="areaList"
        :show-delete="!!this.aid"
        :address-info="init"
        show-set-default
        show-search-result
        @save="onSave"
        @delete="remove"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import areaList from "../assets/js/area.js";
import { Toast } from "vant";
import BackNav from "../components/BackNav.vue";
export default {
  name: "Newaddress",
  data() {
    return {
      areaList,
      aid: "",
      init: {},
    };
  },
  components: {
    BackNav,
    Toast,
    areaList,
  },
  created() {
    this.aid = this.$route.params.aid;
    if (this.aid) {
      this.findAddressByAid(this.aid);
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/address");
      // this.$router.go(0);
    },
    onSave(content) {
      if (this.aid) {
        this.edit(content);
        this.$router.push("/address");
        this.$router.go(-1);
      } else {
        this.shop(content);
      }
    },
    onDelete() {
      Toast("删除成功");
      this.delete();
      this.$router.push("/address");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "万达广场",
            address: "郑州市二七区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },

    // /addAddress
    //绑定在保存按钮
    shop(content) {
      let addData = { ...content };
      addData.isDefault = Number(addData.isDefault);
      delete addData.country;
      this.axios({
        method: "post",
        url: "/addAddress",
        data: {
          ...addData,
        },
      })
        .then((res) => {
          
        })
        .catch((err) => {
          
        });
        this.$router.push({name: 'Address'});
    },
    edit(content) {
      let addData = { ...content };
      addData.isDefault = Number(addData.isDefault);
      delete addData.country;
      this.axios({
        method: "post",
        url: "/editAddress",
        data: {
          ...addData,
          aid: this.aid,
        },
      })
        .then((res) => {
          
        })
        .catch((err) => {
          
        });
    },
    findAddressByAid(aid) {
      this.axios({
        method: "get",
        url: "/findAddressByAid",
        params: {
          aid,
        },
      })
        .then((res) => {
          if (res.data.code == 40000) {
            let data = res.data.result[0];
            data.isDefault = Boolean(data.isDefault);
            this.init = data;
          }

          
        })
        .catch((err) => {
          
        });
    },
    remove() {
      this.axios({
        method: "post",
        url: "/deleteAddress",
        data: {
          aid: this.aid,
        },
      })
        .then((res) => {
          
        })
        .catch((err) => {
          
        });
        this.$router.push({name: 'Address'});
        this.$router.go(0);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-button:nth-child(1) {
  background-color: #0c34ba;
  border: 1px solid #0c34ba;
}
</style>