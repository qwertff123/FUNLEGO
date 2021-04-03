<template>
  <div class="qw-radio-group content" :class="qwClass">
      <slot></slot>
  </div>
</template>
<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: ["checked", "prop","qwClass"],
};
</script>
<style scoped lang="less">
</style>