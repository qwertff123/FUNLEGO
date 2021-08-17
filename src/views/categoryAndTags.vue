<template>
  <div class="category-tags">
    <div class="top">
      <div class="checkout-box">
        <span class="active">类名</span>
        <span>标签</span>
        <span class="bottom"></span>
      </div>
    </div>
    <div class="content">
      <div class="category">
        <div class="search">
          <input
            type="text"
            class="search"
            placeholder="关键字（类名或子类名）"
          />
        </div>
        <ul class="list">
          <li>
            <div class="image">
              <img
                src="https://img.zcool.cn/community/0192fe5c89f067a80121416812bc95.png@1280w_1l_2o_100sh.png"
                alt=""
              />
            </div>
            哈哈哈
          </li>
          <li>哈哈哈</li>
          <li>哈哈哈</li>
          <li>哈哈哈</li>
          <li>哈哈哈</li>
        </ul>
      </div>
      <div class="mask">
        <qw-form
          class="category-edit"
          @submit="categorySubmit"
          :rules="rules"
          v-model="form"
        >
          <div class="category-e">
            <div class="image">
              <img
                src="https://img.zcool.cn/community/0192fe5c89f067a80121416812bc95.png@1280w_1l_2o_100sh.png"
              />
              <qw-button type="file" field="img" class="replace-img" @change="uploadImage"></qw-button>
            </div>

            <qw-label label="类名">
              <qw-input
                type="text"
                v-model="form.category"
                prop="category"
              ></qw-input>
            </qw-label>
          </div>
          <div class="subCategory-e">
            <div class="add-tool">
              <qw-input
                placeholder="请输入子类名"
                v-model="subCategory"
                prop="subCategories"
              ></qw-input>
              <button type="button" class="btn add" @click="addSubCategory">
                添加
              </button>
            </div>
            <qw-tags-list v-model="form.subCategories"></qw-tags-list>
          </div>
          <button type="submit" class="btn submit">提交</button>
        </qw-form>
      </div>
    </div>
  </div>
</template>
<script>
// import "@/assets/css/categoryAndTags.css";
import formComponent from "@/components/formComponent";

import { addCategory,uploadImg } from "@/api/goods";
export default {
  components: {
    ...formComponent,
  },
  data() {
    return {
      form: {
        category: "",
        subCategories: [],
      },
      subCategory: "",
      rules: {
        category: [{ require: true, msg: "必须填写类目", trigger: "input" }],
        subCategories: [
          {
            validator: (val) => {
              return !!val.length;
            },
            msg: "必须添加至少一个子类",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    addSubCategory() {
      if (this.form.subCategories.includes(this.subCategory)) {
        this.$message.error("重复标签名，添加失败！！");
        this.subCategory = "";
        return;
      }
      this.form.subCategories.push(this.subCategory);
      this.subCategory = "";
    },
    async categorySubmit() {
      console.log(this.form);
      const result = await addCategory(this.form);
      console.log(result);
    },
    async uploadImage(formData){
      const src = (await uploadImg(formData)).data;
      console.log(src);
    }
  },
};
</script>
<!-- 注意！！！

用于引入的是css文件，但编写的是less文件，因此当更新less文件时，都需要执行
npx lessc "D:\web\web\DuYi-18\简历项目\FUNLEGO商品管理系统\FUNLEGO--B端\app\src\assets\css\categoryAndTags.less" "D:\web\web\DuYi-18\简历项目\FUNLEGO商品管理系统\FUNLEGO--B端\app\src\assets\css\categoryAndTags.css" 
将less文件编译成css文件
 -->
 <!--
  <style src="@/assets/css/categoryAndTags.css" scoped>
</style>
 -->

 <style scoped lang="less">
.category-tags {
  width: 100%;
  height: 90%;
  background-color: white;

  .top {
    padding: 25px 0;
    text-align: center;
    font-size: 14px;
    background-color: transparent;

    .checkout-box {
      display: inline-block;
      position: relative;
      width: 120px;
      background-color: transparent;
      z-index: 100;

      span {
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        border: 1px solid #665eff;
        background-color: transparent;
        cursor: pointer;

        &.active {
          color: white;
        }

        &.bottom {
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          height: 30px;
          background-color: #665eff;
          z-index: -1;
        }
      }
    }
  }

  .content {
    border: 1px solid black;
    width: 80%;
    height: 400px;
    margin: 0 auto;
    user-select: none;
    position: relative;

    .search {
      height: 40px;
      width: 100%;
      background-color: #eee;
      outline: none;
      border: none;
      box-sizing: border-box;
      padding-left: 10px;
      margin-bottom: 20px;
    }

    .list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 160px;
        height: 60px;
        flex: 0 0 auto;
        margin-left: 18px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        border-radius: 15px;
        background-color: rgba(102, 94, 255, 0.2);
        cursor: pointer;

        &:hover {
          box-shadow: 0px 0px 5px 1px rgba(100, 92, 255, 0.4);
        }

        .image {
          width: 45px;
          height: 45px;
          border: 2px solid #eee;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .mask {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);

      .category-edit {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        background-color: white;
        text-align: center;
        .btn {
          font-size: 14px;
          padding: 5px 10px;
          background-color: #3acde1;
          color: white;
          font-weight: bolder;
        }
        .category-e {
          width: 100%;
          // height: 100px;
          display: flex;
          align-items: center;

          .qw-label {
            width: 200px;
            height: 40px;
            display: flex;
            align-items: center;
            margin-left: 50px;
            font-weight: bolder;
            .qw-input {
              width: 100%;
              height: 100%;
              font-size: 16px;
              text-align: center;
            }
          }
          .image {
            width: 120px;
            height: 120px;
            border: 1px solid #eee;
            margin: 15px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .replace-img {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              width: 100%;
              background-color:transparent;
            }
            &:hover .replace-img {
              background: rgba(255, 255, 255, 0.6)
                url("../assets/imgReplace.png") center/40px 40px no-repeat;
            }
          }
        }
        .subCategory-e {
          width: 100%;
          height: 200px;
          .add-tool {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            .qw-input {
              height: 40px;
              width: 20%;
              border: none;
              padding-left: 10px;
              background-color: #eee;
            }
          }
          .qw-tags-list {
            margin: 10px auto;
            border: 1px dashed #eee;
            padding: 10px;
            box-sizing: border-box;
            width: 80%;
            height: 70%;
          }
        }
      }
    }
  }
}
</style>

