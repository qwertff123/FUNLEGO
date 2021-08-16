<template>
    <div class="carousel-control" @click="moveControl">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props : ["move"],
    methods : {
        moveControl(){
            if(this.move == "prev"){
                this.$eventBus.$emit("prev",this);
            }
            else{
                this.$eventBus.$emit("next",this);
            }
        }
    }
}
</script>
<style scoped>

</style>