<template>
    <div class="carousel" :class="qwClass">
        <slot></slot>
    </div>
</template>
<script>

export default {
    props : ["qwClass"],
}
</script>
<style scoped>
.carousel{
    width:100%;
    height:100%;
}
</style>