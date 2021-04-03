<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props : ["label","prop"],
    inject : ["tableData"],
    mounted(){
        /* 向父组件传递数据
            如果具有默认作用域插槽，则返回其相应的函数，使得父组件能向作用域插槽内传递数据
        */
        this.$parent.$emit("slotsFun",this.$scopedSlots.default && this.$scopedSlots.default);
    }
}
</script>