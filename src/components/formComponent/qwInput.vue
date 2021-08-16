<template>
  <div class="qw-input" :class="vertifyClass">
    <div class="content">
      <slot></slot>
      <input
        :type="type == 'password' ? type : 'text'"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        ref="input"
      />
      <i class="iconfont" :class="['status', vertifyClass]"></i>
    </div>

    <div class="error-msg">
      {{ errorMsg }}
    </div>
  </div>
</template> 
<script>
import { registerVertifyEvent } from "./utils";
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    placeholder: {},
    value: {},
    prop: {},
    type: {},
    icon: {
      //用于标识该输入框是否有图标
      type: Boolean,
      default: false,
    },
  },

  inject: ["totalRules"],
  data() {
    return {
      rules: null,
      errorMsg: null,
    };
  },
  computed: {
    vertifyClass() {
      //没有校验规则无需添加校验样式
      if (!this.rules) {
        return "";
      }
      const errorMsg = this.errorMsg;
      if (errorMsg == null) {
        return null;
      } else if (errorMsg == "") {
        return "correct";
      } else {
        return "error";
      }
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
    if (this.icon) {
      this.$refs.input.style.paddingLeft = "30px";
    }
    //用户交互时触发的表单的校验
    this.rules &&
      registerVertifyEvent({
        instance: this,
        rules: this.rules,
        el: this.$refs.input,
        success: (arrow) => {
          if (arrow) {
            this.errorMsg = "";
          }
        },
        error: (msg) => {
          this.errorMsg = msg;
        },
      });

    //当表单提交时，有事件总bus发出的事件
    //当触发时，比对当前prop标记的表单是否存在错误
    //参数为所有校验错误
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
  },
};
</script>

<style scoped lang="less">
.qw-input {
  position: relative;
  border: 1px solid #eee;
  width:100%;

  &.error {
    border: 1px solid #f56c6c;

    input {
      padding-right: 30px;
      box-sizing: border-box;
    }
  }

  &.correct {
    border: 1px solid #50bc93;
    input {
      padding-right: 30px;
    }
  }

  .error-msg {
    position: absolute;
    bottom: -18px;
    font-size: 12px;
    color: #f56c6c;
    padding-left: 5px;
  }
  .content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    // width:100%;
  }

  input {
    background-color: transparent;
    position: absolute;
    top: 0;
    bottom: 0;
    left:0;
    right:0;
    box-sizing: border-box;
    // padding-left: 10px;
    width:100%;
    text-align: inherit;
  }
  i {
    width: 20px;
    height: 20px;
    line-height: 20px;
    position: relative;
    margin-top: -10px;
    top: 50%;
  }
  i.status {
    position: absolute;
    right: 0;
  }
}
</style>