<template>
  <form class="qw-form" :class="qwClass" @submit.prevent="submit">
    <slot></slot>
  </form>
</template>
<script>
export default {
  model: {
    prop: "form",
    event: "change",
  },
  props: ["qwClass", "rules", "form"],
  provide : function(){
    return {
      totalRules : this.rules
    }
  },
  data(){
    return {
      vertifyError : []
    }
  },
  created() {
    this.$formBus.rules = this.rules;
  },
  methods: {
    submit(e) {
      console.log(123);
      const form = this.form;
      const totalRules = this.rules;
      const vertifyError = [];
      for (const key in totalRules) {
        totalRules[key].forEach((rule) => {
          //如果该表单需要填值但并没有提供值
          if (rule.require && !form[key]) {
            vertifyError.push({ prop: key, msg: rule.msg});
          }else if(rule.validator){
            if(!rule.validator(form[key])){
              vertifyError.push({ prop: key, msg: rule.msg});
            }
          }
        });
      }
      this.$formBus.$emit("submitVertify",vertifyError);
      if (vertifyError.length == 0) {
        this.$emit("submit", e.target);
      }
    },
  },
};
</script>
<style scoped>
</style>