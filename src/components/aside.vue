<template>
  <div id="aside">
    <h1>qwertff</h1>
    <div class="aside-list">
      <template v-for="item in menuList">
        <!-- 没有下拉列表 -->
        <router-link
          :to="item.path"
          custom
          v-slot="{ navigate, isActive }"
          :key="item.id"
          v-if="!item.children"
        >
          <div
            class="item"
            :class="{
              selected: (!curSelect && isActive) || curSelect == item.id,
            }"
            @click="
              selectMenu(item.id);
              navigate($event);
            "
          >
            <div class="title">
              <i class="iconfont shop left-icon"></i>{{ item.title }}
            </div>
          </div>
        </router-link>
        <!-- 具有下拉列表 -->
        <router-link
          :to="item.path"
          :key="item.id"
          custom
          v-slot="{ navigate }"
          v-else
        >
          <div
            class="item drap"
            :class="{
              selected: curSelect && curSelect.split('-')[0] == item.id,
            }"
            @click="
              selectMenu(item.id);
              navigate($event);
            "
          >
            <div class="title">
              <i class="iconfont shop left-icon"></i>{{ item.title }}
              <i class="iconfont drap-arrow ml-auto"></i>
            </div>
            <transition name="drap" @before-enter="down" @before-leave="up">
              <div
                class="drap-list"
                v-show="curSelect && curSelect.split('-')[0] == item.id"
              >
                <router-link
                  :to="item.path"
                  v-for="item in item.children"
                  :key="item.id"
                  custom
                  v-slot="{ navigate,isActive }"
                >
                  <div
                    class="drap-item"
                    :class="{ selected: isActive || curSelect == item.id }"
                    @click.stop="selectMenu(item.id);navigate($event)"
                  >
                    {{ item.title }}
                  </div>
                </router-link>
              </div>
            </transition>
          </div>
        </router-link>
      </template>
    </div>
    <div class="bottom">
      <i class="iconfont menu-to-left"></i>
    </div>
  </div>
</template>
<script>
import Slide from "../slide";
const slide = new Slide(500);
export default {
  data() {
    return {
      //记录当前的菜单栏的id
      curSelect: null,
      menuList: [
        {
          path: "/goodsManage",
          title: "商品管理",
        },
        {
          path: "/orderManage",
          title: "订单管理",
        },
        {
          path: "/adManage",
          title: "广告banner位",
        },
        {
          path: "/userManage",
          title: "用户管理",
          children: [
            {
              path: "/userManger/merchant",
              title: "商家",
            },
            {
              path: "/userManger/super",
              title: "超级管理员",
            },
            {
              path: "/userManger/common",
              title: "普通用户",
            },
            {
              path: "/userManger/vip",
              title: "vip用户",
            },
          ],
        },
        {
          path: "/recommendManage",
          title: "推荐商品管理",
        },
      ],
    };
  },
  /* eslint-disable no-unused-vars */
  methods: {
    getMenu() {
      return this.menuList.map((val, index) => {
        let children = val.children;
        if (children) {
          children = val.children.map((val, childrenIndex) => {
            return {
              title: val.title,
              path: val.path,
              id: index + "-" + childrenIndex,
            };
          });
        }
        return {
          title: val.title,
          path: val.path,
          id: index,
          children,
        };
      });
    },

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
  },
  mounted() {
    this.menuList = this.getMenu();
  },
};
</script>
<style scoped lang="less">
.ml-auto {
  margin-left: auto;
}
#aside {
  height: 100%;
}
.aside-list {
  .item {
    width: 80%;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    font-size:14px;

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