<template>
  <div
    class="qw-menu-item"
    :class="{ selected: isSelected }"
    @click="selected"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: [String, Number],
      require: true,
    },
  },
  methods: {
      selected(){
          this.$menuBus.$emit("selected",this.index);
      }
  },
  computed : {
      isSelected(){
          const curSelected = this.$menuBus.curSelected;
          if(curSelected){
              return curSelected == this.index
          }else{
              return this.$menuBus.defaultActive == this.index;
          }
      }
  }
};
</script>
<style lang="less">
.qw-menu-item {
  width: 80%;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  font-size: 14px;

  height: 40px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;

  &.selected {
    background-color: rgb(102, 94, 255);
    color: rgb(248, 249, 254);
    display: flex;
    align-items: center;
    /* 保证标题在下拉菜单上面 */
    position: relative;
  }

  &:not(.selected):hover {
    // background-color: rgba(102, 94, 255, 0.2);
    background-color: rgb(224, 223, 255);
  }
}
</style>