<template>
  <div class="qw-tags-list">
    <span class="tag" v-for="(tag, index) in value" :key="tag"
      >{{ tag }}<i class="iconfont qw-close" @click="removeTag(index)"></i
    ></span>
  </div>
</template>
<script>
export default {
  model: {
    props: "value",
    event: "delete",
  },
  props: ["value","list"],
  data() {
    return {
      o_tags: this.value,
    };
  },
  methods: {
    removeTag(index) {
      this.o_tags.splice(index, 1);
      this.$emit("delete", this.o_tags);
    },
  },
};
</script>
<style scoped lang="less">
.qw-tags-list {
  width: 100%;
  height: 100%;
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
</style>