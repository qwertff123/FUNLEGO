<template>
  <label class="qw-checkbox" :class="qwClass">
    <input type="checkbox" :value="value" v-model="checked" />
    <span class="checkbox-label"><slot></slot></span>
  </label>
</template>
<script>
export default {
  props: ["value", "name","qwClass"],
  data(){
    return {
      prop : null,
    }
  },
  mounted(){
    this.prop = this.$parent.prop;
  },
  computed: {
    checked: {
      get() {
        return this.$parent.checked.includes(this.value);
      },
      set(val) {
        let result = [...this.$parent.checked];
        if (val) {
          result.push(this.value);
        } else {
          result = result.filter((val) => {
            return val != this.value;
          });
        }
        this.$parent.$emit("change", result);
      },
    },
  },
};
</script>
<style scoped lang="less">
.qw-checkbox {
  display: inline-block;
  margin: 5px 10px;

  .checkbox-label {
    margin-left: 5px;
  }
}
</style>