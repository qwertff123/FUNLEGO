<template>
  <div class="qw-tags-list content">
    <div class="top">
      <input type="text" v-model="tag" :placeholder="placeholder" />
      <button type="button" class="tags-btn" @click="o_value = tag">添加</button>
    </div>
    <div class="tags-container">
      <span class="tag" v-for="(tag,index) in value" :key="tag"
        >{{ tag }}<i class="iconfont qw-close" @click="removeTag(index)"></i
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    props: "value",
    event: "update",
  },
  props: ["value", "placeholder"],
  data() {
    return {
      tag : ""
    }
  },
  methods : {
    removeTag(index){
      const value = this.value;
      value.splice(index,1)
      this.$emit("update",value);
    }
  },
  computed: {
    o_value: {
      get() {
        return this.value;
      },
      set(val) {
        const value = this.value;
        if(!val || value.includes(val)){
          return;
        }
        value.push(val);
        this.$emit("update",value);
        this.tag = "";
      },
    },
  },
};
</script>
<style scoped lang="less">
.qw-tags-list {
   padding:10px 30px;
  .top {
    display: flex;
    justify-content: space-between;
    input {
      flex:1 1 auto;
      margin-right:30px;
      height: 30px;
      padding-left: 10px;
      font-size: 12px;
      border:1px solid #eee;
    }

    .tags-btn {
      background-color: rgb(58, 205, 225);
      color: white;
      font-weight: bolder;
      flex: 0 0 60px;
      border: none;
      outline: none;
      border-radius: 10px;
      cursor: pointer;
      transform: scale(.8);
    }
  }

  .tags-container {
    width: 100%;
    padding: 10px 0;

    .tag {
      display: inline-block;
      height: 25px;
      line-height: 25px;
      padding-left: 5px;
      font-size: 12px;
      background-color: rgb(52, 151, 253);
      color: white;
      box-sizing: border-box;
      border-radius: 5px;
      margin-right: 10px;
      margin-top: 10px;
      vertical-align: middle;
      i {
        display: inline-block;
        height: 20px;
        width: 20px;
        line-height: 20px;
        text-align: center;
        margin-left: 3px;
        vertical-align: middle;
        cursor: pointer;
        &:hover {
          color: rgb(229, 79, 80);
        }
      }
    }
  }
}
</style>