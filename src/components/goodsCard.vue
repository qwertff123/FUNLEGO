<template>
  <div class="info">
    <div class="back" @click="onback">返回</div>
    <div class="card" v-if="goods">
      <div class="id">ID : {{ goods.id }}</div>
      <div class="top">
        <div class="img">
          <img :src="goods.images[0]" alt="" />
        </div>
        <div class="base-info">
          <div class="item long">
            <span class="title">标题</span>
            <span class="content">
              {{ goods.title }}
            </span>
          </div>
          <div class="item long">
            <span class="title">描述</span>
            <span class="content">{{ goods.desc }}</span>
          </div>
          <div class="item long">
            <span class="title">标签名</span>
            <span class="content">
              <template v-if="goods.tags.length">
                <i class="badge" v-for="tag in goods.tags" :key="tag">{{
                  tag
                }}</i>
              </template>
              <span class="empty" v-else>空空如也</span>
            </span>
          </div>
          <div class="item">
            <span class="title">价格</span>
            <span class="content">{{ goods.price }}</span>
          </div>
          <div class="item">
            <span class="title">折扣价</span>
            <span class="content">{{ goods.price_off }}</span>
          </div>
          <div class="item">
            <span class="title">单位</span>
            <span class="content">{{ goods.unit }}</span>
          </div>
          <div class="item">
            <span class="title">类别</span>
            <span class="content">{{ goods.category }}</span>
          </div>

          <div class="item status">
            <span class="content">
              <span class="content">
                <i class="badge sale" v-if="goods.issale">已上架</i>
                <i class="badge not-sale" v-else>未上架</i>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="sale-info"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    //商品信息
    goods: {
      require: true,
    },
    //点击返回按钮时所触发的事件
    onback: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
};
</script>
<style scoped lang="less">
.info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .back {
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: rgb(88, 115, 255);
    color: white;
    cursor: pointer;

    &:active {
      opacity: 0.6;
    }
  }
  .card {
    flex: 1 1 auto;
    border: 1px solid rgba(102, 94, 255, 0.6);
    box-shadow: 0 0 8px 1px rgba(101, 94, 255, 0.6);
    border-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .id {
      align-self: flex-start;
      height: 30px;
      line-height: 30px;
      width: auto;
      margin-bottom: 10px;
      font-size: 20px;
      background-color: rgb(206, 210, 221);
      border-radius: 5px;
      padding: 0 20px;
      font-weight: bolder;
      color: white;
    }

    .top {
      display: flex;
      margin-bottom: 50px;
      height: 200px;

      .img {
        flex: 0 0 auto;
        width: 200px;
        height: 200px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .base-info {
        flex: 1 1 auto;
        margin-left: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .item {
          flex: 0 0 45%;
          height: 35px;
          display: flex;
          align-items: center;

          // margin-right:15px;
          &.long {
            flex: 1 1 100%;
          }

          &.status {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 0 0 100%;

            .content {
              background-color: transparent;
              text-align: center;

              .badge {
                width: 200px;
                padding: 5px 0;
                font-size: 16px;
                font-weight: bolder;
              }
            }
          }

          .title {
            display: inline-block;
            width: 80px;
            text-align: center;
            background-color: rgb(224, 223, 255);
            // color:rgb(68,79,99);
            color: rgb(120, 132, 158);
            padding: 5px 15px;
            box-sizing: border-box;
            font-weight: bolder;
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
          }

          .content {
            background-color: rgb(248, 249, 254);
            padding: 5px 15px;
            flex: 1 1 auto;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            font-weight: 700;

            .empty {
              color: #ccc;
            }
            
            .badge {
              display: inline-block;
              font-style: normal;
              font-style: normal;
              padding: 2px 5px;
              box-sizing: border-box;
              font-size: 12px;
              border-radius: 5px;
              margin-right: 10px;
              background-color: rgb(255, 144, 88);
              color: white;
              font-weight: 400;

              &.sale {
                background-color: rgb(34, 239, 209);
              }

              &.not-sale {
                background-color: rgb(229, 79, 80);
              }
            }
          }
        }
      }
    }

    .sale-info {
      flex: 1 1 auto;
      border: 1px solid black;
    }
  }
}
</style>