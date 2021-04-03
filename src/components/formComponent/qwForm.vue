<template>
    <form class="qw-form" :class="qwClass" @submit.prevent="$emit('submit',$event.target)">
        <slot></slot>
    </form>
</template>
<script>
export default {
    props : ["qwClass"]
}
</script>
<style scoped>

</style>