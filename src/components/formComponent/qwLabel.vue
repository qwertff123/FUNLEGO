<template>
  <div class="qw-label">
    <span class="label">{{ label }}</span>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ["label", "qwClass"],
};
</script>
<style scoped lang="less">
.qw-label {
  display: flex;
  // height: 100%;
  .label {
    text-align-last: justify;
    display: inline-block;
  }
  .content{
      flex: 1 1 auto;
      height:100%;
  }
}
</style>