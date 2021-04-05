<template>
  <div class="qw-menu-item-group drap">
    <div class="title" :class="{ selected: isSelected }" @click="selected">
      <slot name="title"></slot>
      <i class="iconfont arrow"></i>
    </div>
    <transition @before-enter="down" @before-leave="up">
      <div class="drap-list" v-show="isSelected">
        <slot></slot>
      </div>
    </transition>
    <div>
      <span>
        <i></i>
      </span>
    </div>
  </div>
</template>
<script>
import Slide from "./slide";
const slide = new Slide(300);
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    index: {
      type: [String, Number],
      require: true,
    },
    defaultActive: {
      type: String,
    },
  },
  methods: {
    selected() {
      // 下拉菜单时默认选中的子菜单
      let curSelected = this.defaultActive ? this.defaultActive : this.index;
      this.$menuBus.$emit("selected", curSelected);
    },
    up(el) {
      slide.up(el);
    },
    down(el) {
      slide.down(el);
    },
  },
  computed: {
    isSelected() {
      let curSelected = this.$menuBus.curSelected;
      if (curSelected) {
        curSelected += "";
        return curSelected.split("-")[0] == this.index;
      } else if (this.$menuBus.defaultActive) {
        return this.$menuBus.defaultActive.split("-")[0] == this.index;
      }

      return false;
    },
  },
};
</script>
<style lang="less">
.qw-menu-item-group {
  width: 80%;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  font-size: 14px;

  .title {
    height: 40px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    border-radius: 8px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;

    &.selected .arrow {
      transform: rotate(-180deg);
    }
    i.arrow {
      display: inline-block;
      margin-left: auto;
      transition: transform 0.3s;
      &::after {
        content: "\e63d";
      }
    }

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

  &.drap {
    position: relative;
    .drap-list {
      width: 100%;
      position: relative;
      top: -5px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      overflow: hidden;
      transition: all 1s;
      background-color: rgb(248, 249, 254);
      padding-left:20px;
      box-sizing: border-box;
      .qw-menu-item {
        margin: 10px 0;
        width: 100%;
        &:hover {
          background-color: transparent;
          color: rgba(102, 94, 255, 0.5);
        }
        &.selected {
          background-color: transparent;
          color: rgb(102, 94, 255);
        }
      }
    }
  }
}
</style>