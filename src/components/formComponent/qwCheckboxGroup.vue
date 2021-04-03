<template>
  <div class="qw-checkout-group content" :class="qwClass">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: ["checked","prop","qwClass"],
};
</script>
