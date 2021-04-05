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
  created() {
    this.$formBus.rules = this.rules;
  },
  methods: {
    submit(e) {
      const form = this.form;
      const totalRules = this.rules;
      const $formBus = this.$formBus;
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
      console.log("vertifyError",vertifyError);
       $formBus.vertifyError = vertifyError;
      if (this.$formBus.vertifyError.length == 0) {
        this.$emit("submit", e.target);
      }
    },
  },
};
</script>
<style scoped>
</style>