<template>
    <div class="carousel-control" :class="qwClass" @click="moveControl">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props : ["move","qwClass"],
    methods : {
        moveControl(){
            if(this.move == "prev"){
                this.$eventBus.$emit("prev");
            }
            else{
                this.$eventBus.$emit("next");
            }
        }
    }
}
</script>
<style scoped>

</style>