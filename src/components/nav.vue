<template>
    <div id="nav">
        <a href="javascript:;" class="icon-link">
            <i class="iconfont home"></i>
        </a>
        <div class="user-info">
            <img class="user-icon" src="../assets/user.webp"/>
            <span class="nickname">qwertff</span>
            <i class="iconfont drap-arrow"></i>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped lang="less">
#nav{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height:100%;
    padding-right:20px;
    .user-info{
        display: flex;
        align-items: center;
        img{
            width:30px;
            height:30px;
            border-radius: 50%;
        }
        .nickname{
            margin:0 15px;
        }
        .drap-arrow{
            font-size:12px;
            color:rgb(206,210,221);
            cursor: pointer;
        }
    }

    .icon-link{
        display: inline-block;
        width:30px;
        height:30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin:0 15px;
        .iconfont{
            font-size:20px;
            color:black;
        }
    }
}
</style>