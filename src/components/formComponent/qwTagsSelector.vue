<template>
  <div class="content">
    <div class="container">
      <i class="tag" v-for="tag in value" :key="tag">{{ tag }}</i>
    </div>
    <div class="selector">
      <i
        class="tag"
        v-for="tag in tagsList"
        :key="tag"
        :class="{ selected: value.includes(tag) }"
        @click="selecte(tag)"
        >{{ tag }}</i
      >
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    tagsList: {
      type: Array,
      require: true,
    },
    value: {},
  },
  methods : {
      selecte(tag){
          const index = this.value.indexOf(tag)
          if(index != -1){
              //如果已经选中了,则移除
              this.value.splice(index,1);
          }else{
              this.value.push(tag);
          }
      }
  }
};
</script>
<style scoped lang="less">
.tags-area {
  margin: 15px 0;
  height: 150px;
  .content {
    width: 100%;
    height: 200px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    .tag {
      display: inline-block;
      padding: 6px 8px;
      background-color: #655eff;
      font-size: 12px;
      color: white;
      border-radius: 5px;
      margin-right: 8px;
      transform: scale(0.9);
    }
    .container {
      width: 100%;
      min-height: 40px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .selector {
      background-color: #eee;
      flex: 1 1 auto;
      padding: 10px;
      .tag {
        background-color: transparent;
        font-size: 16px;
        margin-bottom: 5px;
        border: 2px solid#78849e;
        color: #78849e;
        cursor: pointer;
        transition: transform 0.2s;
        &:active {
          transform: scale(0.8);
        }
        &.selected {
          border-color: #655eff;
          color: #655eff;
        }
      }
    }
  }
}
</style>