<template>
  <div class="page">
    <div class="left"></div>
    <div class="right">
      <div class="form">
        <p class="title">QWERTFF</p>
        <qw-form
          class="normal"
          v-model="form"
          :rules="rules"
          @submit="login"
          v-if="status == 'login'"
        >
          <p class="control-title">登录</p>
          <qw-input v-model="form.email" placeholder="请输入邮箱" prop="email">
            <i class="iconfont email"></i>
          </qw-input>
          <qw-input
            v-model="form.password"
            placeholder="请输入密码"
            prop="password"
          >
            <i class="iconfont password"></i>
          </qw-input>
          <div class="find-password" @click="status = 'findPassword'">
            <span>忘记密码?</span>
          </div>

          <div class="bottom">
            <qw-button
              class="normal active"
              type="submit"
              label="登录"
            ></qw-button>
            <qw-button
              class="normal no-active float-right"
              label="注册"
              type="button"
              @click="status = 'register'"
            ></qw-button>
          </div>
        </qw-form>
        <qw-form class="normal" @submit="register" v-if="status == 'register'">
          <p class="control-title">注册</p>

          <qw-input v-model="form.username" placeholder="请输入用户名">
            <i class="iconfont username"></i>
          </qw-input>

          <qw-input v-model="form.email" placeholder="请输入邮箱">
            <i class="iconfont email"></i>
          </qw-input>
            <qw-input v-model="form.password" placeholder="请输入密码">
              <i class="iconfont password"></i>
            </qw-input>

            <qw-input
              v-model="form.passwordConfirm"
              placeholder="请重新输入密码"
            >
              <i class="iconfont password"></i>
            </qw-input>
          <label class="verify-code">
            <qw-input v-model="form.code" placeholder="请输入验证码">
               <i class="iconfont password"></i>
            </qw-input>
            <qw-button
              v-model="form.code"
              class="normal"
              label="发送"
              type="button"
              @click="getCode"
            ></qw-button>
          </label>
          <div class="bottom">
            <qw-button
              class="normal no-active"
              type="button"
              label="登录"
              @click="status = 'login'"
            ></qw-button>
            <qw-button
              class="normal active float-right"
              type="submit"
              label="注册"
            ></qw-button>
          </div>
        </qw-form>
        <qw-form
          class="normal"
          @submit="findPassword"
          v-if="status == 'findPassword'"
        >
          <p class="control-title">找回密码</p>
          <label>
            <i class="iconfont email"></i>
            <qw-input v-model="form.email" placeholder="请输入邮箱" />
          </label>
          <label>
            <i class="iconfont password"></i>
            <qw-input v-model="form.password" placeholder="请输入密码" />
          </label>
          <label>
            <i class="iconfont password"></i>
            <qw-input
              v-model="form.passwordConfirm"
              placeholder="请重新输入密码"
            />
          </label>
          <label class="verify-code">
            <i class="iconfont password"></i>
            <qw-input v-model="form.code" placeholder="请输入验证码" />
            <qw-button
              v-model="form.code"
              class="normal"
              label="发送"
              type="button"
              @click="getCode"
            ></qw-button>
          </label>
          <div class="bottom">
            <qw-button
              class="normal no-active"
              type="button"
              label="返回"
              @click="status = 'login'"
            ></qw-button>
            <qw-button
              class="normal active float-right"
              type="submit"
              label="提交"
            ></qw-button>
          </div>
        </qw-form>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/user";
import formComponent from "@/components/formComponent";

export default {
  components: {
    ...formComponent,
  },
  data() {
    return {
      status: "login",
      form: {
        username: "",
        email: "1648494263@qq.com",
        password: "1234",
        passwordConfirm: "",
        code: "",
      },
      rules: {
        email: [
          { require: true, msg: "需填上邮箱", trigger: ["blur", "input"] },
          {
            validator: (val) => {
              return /[\w+]+@\w+\.\w+/.test(val);
            },
            msg: "请输入正确格式的邮箱",
            trigger: "input",
          },
        ],
        password: [
          { require: true, msg: "需填上密码", trigger: ["blur", "input"] },
        ],
      },
    };
  },
  watch: {
    status() {
      this.form.code = "";
    },
  },
  methods: {
    getCode() {
      api.getCode(this.form.email).then((data) => {
        console.log(data);
      });
    },
    login() {
      const { email, password } = this.form;
      api.login({ email, password }).then((result) => {
        if (result.status == "fail") {
          alert(result.msg);
        } else {
          alert("登录成功");
          window.document.cookie = "appkey=" + result.data.appkey;
          this.$router.push("/");
        }
      });
    },
    register() {
      console.log("注册了");
      const { username, email, password, code } = this.form;
      api.register({ username, email, password, code }).then((result) => {
        if (result.status == "fail") {
          alert("信息填写不全");
        } else {
          alert("注册成功");
          this.status = "login";
        }
      });
    },
    findPassword() {
      const { email, password, code } = this.form;
      api.findPassword({ email, password, code }).then((data) => {
        console.log(data);
      });
    },
  },
  mounted() {
    window.vm = this;
  },
};
</script>
<style scoped lang="less">
.page {
  width: 100%;
  height: 100vh;
  background-color: white;
  .right {
    float: right;
    width: 400px;
    height: 100%;
    background-color: rgb(248, 249, 254);
    .title {
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
      margin-bottom: 20px;
      margin-top: 150px;
    }
    form {
      width: 100%;
      height: 400px;
      .float-right {
        float: right;
      }

      .control-title {
        text-align: center;
        font-size: 18px;
        color: rgb(102, 94, 255);
        font-weight: bolder;
      }
      .qw-input {
        width: 230px;
        height: 40px;
        margin: 20px auto;
        font-size: 12px;
        border-radius: 8px;
        position: relative;
        background-color: white;
        box-sizing: border-box;
      }
      .find-password {
        width: 230px;
        height: 40px;
        margin: 20px auto;
        font-size: 12px;
        text-align: right;

        span {
          cursor: pointer;
        }
      }
      // label {
      //   display: block;
      //   &.verify-code {
      //     display: flex;
      // }
      .qw-button {
        flex-shrink: 0;
        flex-grow: 0;
        width: 80px;
        white-space: nowrap;
        margin-left: 15px;
        background-color: rgb(102, 94, 255);
        color: white;
        border-radius: 10px;
        transform: scale(0.8);
      }
      i {
        display: inline-block;
        height: 20px;
        left: 10px;
        top: 50%;
        line-height: 20px;
        margin-top: -10px;
        &.username::after {
          content: "\e6b3";
        }
        &.email::after {
          content: "\e66a";
        }
        &.password::after {
          content: "\e630";
        }
      }
      .bottom {
        width: 230px;
        height: 40px;
        margin-top: 60px;
        margin-left: auto;
        margin-right: auto;

        .qw-button {
          display: inline-block;
          font-size: 12px;
          width: 80px;
          height: 100%;
          border-radius: 10px;
          background-color: transparent;
          cursor: pointer;
          &:active {
            opacity: 0.8;
          }
          &.active {
            background-color: rgb(102, 94, 255);
            color: white;
          }
          &.no-active {
            border: 1px solid rgb(102, 94, 255);
            color: rgb(102, 94, 255);
          }
        }
      }
    }
  }
}
</style>