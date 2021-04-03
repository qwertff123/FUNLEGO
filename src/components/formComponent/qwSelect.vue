<template>
  <div class="qw-select content" :class="qwClass">
    <input
      type="text"
      :value="displayValue"
      readonly
      :placeholder="displayPlaceholder"
      @click="changeStatus"
    />
    <i
      v-show="optionsInfo.length"
      class="iconfont qw-icon-drap"
      :class="{ dripping: isDrap }"
    ></i>
    <transition @before-enter="down" @before-leave="up">
      <div class="drap-list" v-show="isDrap">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import Slide from "./slide";
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: ["label", "placeholder", "prop", "value", "qwClass", "watch"],
  data() {
    return {
      isDrap: false,
      optionsInfo: [],
      slide: new Slide(300),
    };
  },
  watch: {
    watch() {
      requestAnimationFrame(() => {
        this.initoptionsInfo();
        this.$emit("change", "");
      });
    },
  },
  computed: {
    //用于展示给用户看的value值
    displayValue() {
      const optionInfo = this.optionsInfo.find(
        (val) => val.value == this.value
      );
      if (optionInfo) {
        return optionInfo.innerText;
      }
      return "";
    },
    //用于根据是否有下拉内容来决定placeholder的内容
    displayPlaceholder() {
      if (this.optionsInfo.length) {
        return this.placeholder;
      }
      return "无数据";
    },
  },
  mounted() {
    //当子组件触发点击事件时，会触发父组件的事件并向其传递选中的value值与展示值
    this.$on("selected", (value) => {
      this.isDrap = false;
      this.$emit("change", value);
    });

    this.initoptionsInfo();

  },
  methods: {
    changeStatus() {
      this.optionsInfo.length && (this.isDrap = !this.isDrap);
    },
    //用于得到qw-option组件中的value与其插槽内的内容
    initoptionsInfo() {
      const children = this.$children;
      const result = [];
      for (const key in children) {
        result.push(children[key].optionInfo);
      }
      this.optionsInfo = result;
    },
    up(el) {
      this.slide.up(el);
    },
    down(el) {
      this.slide.down(el);
    },
  },
};
</script>
<style scoped lang="less">
.content {
  position: relative;

  i.qw-icon-drap::after {
    color: black;
    position: absolute;
    height: 16px;
    width: 16px;
    line-height: 16px;
    margin-top: -8px;
    top: 50%;
    text-align: center;
    right: 5px;

    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 0;
  }
  i.dripping::after {
    transform: rotateZ(-180deg);
  }

  input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    cursor: pointer;
    text-align: center;
  }
  .drap-list {
    position: absolute;
    transform: translateY(3px);
    border-radius: 10px;
    left: 0;
    right: 0;
    text-align: center;
    background-color: #eee;
    overflow: hidden;
    z-index: 100;
  }
}
</style>