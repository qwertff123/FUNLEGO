<template>
  <div
    class="qw-select content"
    :class="{ error: errorMsg, correct: errorMsg != null && !errorMsg }"
  >
    <div class="select" @click="changeStatus">
      <input
        type="text"
        :value="displayValue"
        readonly
        :placeholder="displayPlaceholder"
        ref="select"
      />
      <i
        v-show="optionsInfo.length"
        class="iconfont qw-icon-drap"
        :class="{ dripping: isDrap }"
      ></i>

      <div class="error-msg">
        {{ errorMsg }}
      </div>
    </div>
    <transition @before-enter="down" @before-leave="up">
      <div class="drap-list" v-show="isDrap">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import Slide from "./slide";
import { registerVertifyEvent } from "./utils";
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: ["label", "placeholder", "prop", "value", "watch"],
  inject : ["totalRules"],
  data() {
    return {
      isDrap: false,
      optionsInfo: [],
      slide: new Slide(300),
      rules: null,
      errorMsg: null,
      changeEvent: new Event("change"),
      blurEvent: new Event("blur"),
    };
  },
  watch: {
    watch() {
      console.log("检测到某值得改变")
      requestAnimationFrame(() => {
        this.initoptionsInfo();
        this.$emit("change", "");
      });
    },
    value() {
      //当值发生改变时触发change事件
      this.$refs.select.dispatchEvent(this.changeEvent);
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
  created() {
    const totalRules = this.totalRules;
    for (const key in totalRules) {
      if (key == this.prop) {
        this.rules = totalRules[key];
        break;
      }
    }
  },

  mounted() {
    //当子组件触发点击事件时，会触发父组件的事件并向其传递选中的value值与展示值
    this.$on("selected", (value) => {
      this.isDrap = false;
      this.$emit("change", value);
    });

    this.initoptionsInfo();

    //注册用于校验本表单的事件
    this.rules &&
      registerVertifyEvent({
        instance: this,
        el: this.$refs.select,
        rules: this.rules,
        success: (isArrow) => {
          console.log(isArrow);
          if (isArrow) {
            this.errorMsg = "";
          }
        },
        error: (msg) => {
          this.errorMsg = msg;
        },
      });
    this.$formBus.$on("submitVertify", (vertifyError) => {
      const result = vertifyError
        .filter((val) => {
          return val.prop == this.prop;
        })
        .pop();
      if (result) {
        this.errorMsg = result.msg;
      } else {
        this.errorMsg = "";
      }
    });

    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target) && this.isDrap) {
        this.isDrap = false;
        this.$refs.select.dispatchEvent(this.blurEvent);
      }
    });
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
.qw-select {
  position: relative;
  border: 1px solid #eee;
  &.error {
    border: 1px solid #f56c6c;
  }
  &.correct {
    border: 1px solid #50bc93;
  }
  .select {
    height: 100%;
    input {
      width: 100%;
      height: 100%;
      background-color: transparent;
      cursor: pointer;
      text-align: center;
      position: relative;
      padding: 0 20px;
      box-sizing: border-box;
    }
    i {
      position: absolute;
      height: 20px;
      width: 20px;
      line-height: 20px;
      text-align: center;
      margin-top: -10px;
      top: 50%;
      right: 0;
      text-align: center;
      transition: all 0.3s;
      &.qw-icon-drap::after {
        display: block;
        color: #c0c4cc;
        font-size: 12px;
        cursor: pointer;
        transform: scale(0.8);
      }

      &.dripping {
        transform: rotateZ(-180deg);
      }
    }
  }

  .drap-list {
    position: absolute;
    transform: translateY(3px);
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #c0c4cc;
    text-align: center;
    overflow: hidden;
    z-index: 100;
    font-size: 13px;
  }
}
</style>