<template>
    <div id="nav">
        <a href="javascript:;" class="icon-link">
            <i class="iconfont home"></i>
        </a>
        <div class="user-info">
            <img class="user-icon" src="../assets/user.webp"/>
            <span class="nickname">{{ this.$store.state.userInfo.nickname }}</span>
            <i class="iconfont drap-arrow"></i>
            <div class="drag-list">
                <span @click="logout">登出</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    // mounted(){
    //     console.log(this.$store.state)
    // }
    methods : {
        logout(){
            window.localStorage.removeItem("token");
            window.location.reload();
        }
    }
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
        position: relative;
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
        .drag-list{
            width:80px;
            position: absolute;
            right:10px;
            bottom:-30px;
            background-color:#eee;
            
            span{
                display: inline-block;
                height:30px;
                line-height: 30px;
                width: 100%;
                text-align: center;
                box-sizing: border-box;
                cursor: pointer;    
            }
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