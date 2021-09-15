<template>
  <div class="tag-box">
    <div class="input-area">
      <input type="text" placeholder="请输入添加的标签名" v-model="tag" />
      <button type="button" @click="addTag">添加</button>
    </div>

    <div class="show-area" ref="scope">
      <div class="tag-area">
        <drag-box class="tag" v-for="tag in tagList" :key="tag" :scope="scope" :target="target" @arrive="arrive">
          {{ tag }}
        </drag-box>
      </div>
      <div class="trash" ref="target">拖拽至此处移除标签</div>
    </div>
  </div>
</template>
<script>
import { getAllTags, addTag,deleteTag } from "@/api/goods";

import dragBox from "../components/dragBox.vue";
export default {
  components: {
    dragBox,
  },
  data() {
    return {
      tagList: [],
      tag: "",
      scope: {},
      target: {},
    };
  },
  async created() {
    this.tagList = (await getAllTags()).data;
    console.log(this.tagList);
  },
  mounted() {
    const scope = this.$refs.scope.getBoundingClientRect();
    const target = this.$refs.target.getBoundingClientRect();
    this.scope = {
      X: scope.x,
      Y: scope.y,
      width: scope.width,
      height: scope.height,
    };
    this.target = {
      X: target.x,
      Y: target.y,
      width: target.width,
      height: target.height,
    };
    console.log(this.target);
  },
  methods: {
    async addTag() {
      await addTag(this.tag);
      this.tagList.push(this.tag);
      this.$$message.success(`标签名 《 ${ this.tag }》 添加成功`)
      this.tag = "";
    },
    async arrive(el,reset){
      const name = el.innerText;
      if(!confirm(`确定要删除 《${name}》吗`)){
        return reset();
      }
      await deleteTag(name);
      const index = this.tagList.indexOf(name);
      this.tagList.splice(index,1);
      this.$message.success(`标签名 《 ${ name }》 移除成功`)
    }
  },
};
</script>
<style scoped lang="less">
.tag-box {
  width: 100%;
  height: 100%;
  border: 1px solid black;

  .input-area {
    width: 100%;
    height: 50px;
    background-color: #eee;
    display: flex;
    font-size: 16px;
    input {
      width: 80%;
      height: 100%;
      background-color: transparent;
      padding: 0 10px;
      box-sizing: border-box;
    }
    button {
      flex: 1 1 auto;
      height: 100%;
      background-color: #3acde1;
      font-weight: bolder;
      color: white;
    }
  }
  .show-area {
    // background-color: green;
    height: calc(100% - 50px);
    width: 100%;
    display: flex;
    .tag-area {
      height: 100%;
      width: 80%;
      border-right: 1px dashed;
      padding: 20px;
      box-sizing: border-box;

      .drag-box {
        display: inline-block;
        padding: 10px 20px;
        background-color: #655eff;
        font-size: 16px;
        color: white;
        border-radius: 5px;
        margin-right: 8px;
        margin-bottom: 10px;
        // transform: scale(0.9);
        // &:active {
        //   transform: scale(0.8);
        // }
        &.selected {
          border-color: #655eff;
          color: #655eff;
        }
      }
    }
    .trash {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>