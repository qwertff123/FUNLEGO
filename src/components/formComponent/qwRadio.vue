<template>
  <label class="qw-radio" :class="qwClass">
    <input type="radio" :value="value" v-model="checked"/>
    <span class="radio-label">
      <slot></slot>
    </span>
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
        return this.$parent.checked;
      },
      set(val) {
        this.$parent.$emit("change",val);
      },
    },
  },
};
</script>
<style scoped lang="less">
.qw-radio {
  display: inline-block;
  margin: 5px 10px;
  .radio-label {
    margin-left: 5px;
  }
}
</style>