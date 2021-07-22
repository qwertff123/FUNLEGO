<template>
  <div id="aside">
    <h1>qwertff</h1>
    <div class="aside-list">
      <qw-menu default-active="3-2" :active="$route.meta.index">
        <template v-for="(item, index) in $store.state.menuRoutes">
          <router-link
            :to="{ name: item.name }"
            custom
            v-slot="{ navigate }"
            :key="item.name"
            v-if="!item.children"
          >
            <qw-menu-item :index="index + 1" @click.native="navigate">
              <i class="iconfont" :class="item.meta.icon"></i
              >{{ item.meta.title }}
            </qw-menu-item>
          </router-link>
          <router-link
            v-else
            :to="{ name: item.name }"
            custom
            v-slot="{ navigate }"
            :key="item.name"
          >
            <qw-menu-item-group
              @click.native="navigate"
              :index="index + 1"
              :default-group-active="index + 1 + '-' + 1"
            >
              <template #title>
                <i class="iconfont" :class="item.meta.icon"></i
                >{{ item.meta.title }}
              </template>
              <router-link
                :to="{ name: subItem.name }"
                v-for="(subItem, subIndex) in item.children"
                :key="subItem.name"
                custom
                v-slot="{ navigate }"
              >
                <qw-menu-item
                  :index="index + 1 + '-' + (subIndex + 1)"
                  @click.native="navigate"
                >
                  <i class="iconfont" :class="subItem.meta.icon"></i
                  >{{ subItem.meta.title }}
                </qw-menu-item>
              </router-link>
            </qw-menu-item-group>
          </router-link>
        </template>
      </qw-menu>
    </div>
    <div class="bottom">
      <i class="iconfont menu-to-left"></i>
    </div>
  </div>
</template>
<script>
import Slide from "../slide";
const slide = new Slide(500);

import menuComponent from "@/components/menuComponent";
export default {
  components: {
    ...menuComponent,
  },
  data() {
    return {
      //记录当前的菜单栏的id
      curSelect: null,
    };
  },
  /* eslint-disable no-unused-vars */
  methods: {
    /**
     * 选中菜单标签所触发的回调函数
     * @param { Number } 菜单id
     */
    selectMenu(id) {
      //保存当前选中的菜单的id
      this.curSelect = id + "";
    },

    /**
     * 下拉时触发的before-enter事件
     * @param { Element } Dom元素
     */
    down(el) {
      slide.down(el);
    },
    /**
     * 上拉时触发的before-enter事件
     * @param { Element } Dom元素
     */
    up(el) {
      slide.up(el);
    },
  }
};
</script>
<style scoped lang="less">
.ml-auto {
  margin-left: auto;
}
#aside {
  height: 100%;
}

i {
  font-size:16px;
  margin-right:10px;
  &.goodsManage::after {
    content: "\e619";
  }
  &.saleManage::after {
    content: "\e61a";
  }
  &.saleStatistics::after {
    content: "\e61d";
  }
  &.orderManage::after {
    content: "\e634";
  }
  
  &.categoryManage::after{
    content: "\e617";
  }
}

.aside-list {
  .item {
    width: 80%;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    font-size: 14px;

    .title,
    &.drap .drap-item {
      height: 40px;
      width: 100%;
      display: flex;
      padding: 0 10px;
      align-items: center;
      border-radius: 8px;
      box-sizing: border-box;
      .left-icon {
        margin-right: 10px;
      }
    }

    &.selected .title {
      background-color: rgb(102, 94, 255);
      color: rgb(248, 249, 254);
      display: flex;
      align-items: center;
      /* 保证标题在下拉菜单上面 */
      position: relative;
    }

    &:not(.selected) .title:hover {
      // background-color: rgba(102, 94, 255, 0.2);
      background-color: rgb(224, 223, 255);
    }
    .drap-arrow {
      transition: transform 0.3s;
    }
    &.selected .drap-arrow {
      transform: rotate(180deg);
    }

    &.drap {
      position: relative;
      .drap-item.selected {
        color: rgb(102, 94, 255);
      }

      .drap-item:not(.selected):hover {
        color: rgba(102, 94, 255, 0.5);
      }

      .drap-list {
        width: 100%;
        position: relative;
        top: -5px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        overflow: hidden;
        transition: all 1s;
      }
      .drap-list::after {
        content: "";
        background-color: rgb(248, 249, 254);
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
      }
    }
  }
}
.bottom {
  position: absolute;
  bottom: 30px;
  right: 30px;
  .menu-to-left {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>