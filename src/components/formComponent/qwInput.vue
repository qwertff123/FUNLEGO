<template>
  <div class="qw-input">
    <div class="content">
      <input
        type="text"
        :class="[qwClass, vertifyClass]"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        ref="input"
      />
      <i class="iconfont" :class="vertifyClass"></i>
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
  props: ["placeholder", "value", "prop", "qwClass"],
  data() {
    return {
      rules: null,
      errorMsg: null,
    };
  },
  computed: {
    vertifyClass() {
      //没有校验规则无需添加校验样式
      if(!this.rules){
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
    const totalRule = this.$formBus.rules;
    for (const key in totalRule) {
      if (key == this.prop) {
        this.rules = totalRule[key];
        break;
      }
    }
  },
  mounted() {
    //用户交互时触发的表单的校验
    console.log(this.rules);
    this.rules && registerVertifyEvent({
      instance: this,
      rules: this.rules,
      el: this.$refs.input,
      success : (arrow)=>{
        if(arrow){
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
    this.$formBus.$on("submitVertify",(vertifyError)=>{
      const result = vertifyError.filter(val=>{
        return val.prop == this.prop;
      }).pop();
      if(result){
        this.errorMsg =result.msg;
      }else{
        this.errorMsg = "";
      }
    })
  },
};
</script>

<style scoped lang="less">
.qw-input {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  .error-msg {
    position: absolute;
    bottom: -18px;
    font-size: 12px;
    color: #f56c6c;
    padding-left: 5px;
  }
  .content {
    position: relative;
  }
  input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-right:30px;
    box-sizing: border-box;
    border: 1px solid #eee;

    &.error {
      border: 1px solid #f56c6c;
      padding-right: 30px;
    }

    &.correct {
      border: 1px solid #50bc93;
      padding-right: 30px;
    }
  }
  i {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: 20px;
    position: absolute;
    right: 0;
    margin-top: -10px;
    top: 50%;
  }
}
</style>