<template>
    <div class="qw-label">
        <span class="label">{{ label }}</span>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props : ["label","qwClass"]
}
</script>
<style scoped lang="less">
.qw-label{
    display: flex;
    // height: 100%;
    .label{
        text-align-last:justify;
        display: inline-block;
    }
}
</style>