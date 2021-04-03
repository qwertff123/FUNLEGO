
<script>
//利用模板形式无法插入VNode节点
// <template>
//   <table class="qw-table">
//     <thead>
//       <tr>
//         <td v-for="label in labels" :key="label">{{ label }}</td>
//       </tr>
//     </thead>
//     <tbody >
//       <tr v-for="currow in row" :key="currow">
//         <td v-for="(cell,index) in data" :key="index">{{ cell[currow - 1] }}</td>
//         <!-- <td>{{ slots }}</td> -->
//       </tr>
//       <slot></slot>

//     </tbody>
//   </table>
// </template>
/* eslint-disable no-unused-vars */
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    },
  },
  render() {
    return (
      <table class="qw-table">
        <thead>
          <tr>
            {this.labels.map((label) => (
              <th>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.tableData.map((val, currow) => {
            return (
              <tr
                onClick={() => this.$emit("selected", this.tableData[currow])}
              >
                {Object.keys(this.data).map((key) => (
                  <td>{this.data[key][currow]}</td>
                ))}

                {this.slots.map((slot) => (
                  <td vOn:click_capture={(e) => this.changeStatus(e, currow)}>
                    {slot}
                  </td>
                ))}
              </tr>
            );
          })}
          {/* 需要具有注入隐藏起来的默认插槽以能够获取子组件的信息来渲染表格 */}
          <tr style="display:none">{this.$slots.default}</tr>
        </tbody>
      </table>
    );
  },
  data() {
    return {
      labels: [], //记录表头标题
      props: [],
      row: null, //记录数据总行数
      data: {}, //记录经过处理整合的数据
      slotsFun: [], //接受通过子组件传递过来的作用域插槽函数
      slots: [], //记录所有通过调用作用域函数所返回的VNode数组，用于渲染页面
    };
  },
  provide: function () {
    return {
      tableData: this.tableData,
    };
  },
  watch: {
    tableData() {
      this.initData();
    },
  },
  methods: {
    //更改作用域插槽内的属性值，以便外界获取到最新的值
    changeStatus(e, currow) {
      //当前选中的行数

      //调用slotsFun所记录的所有作用域插槽函数，并向该作用域插槽传递数据
      this.slots = this.slotsFun.map((fun) => {
        /*
          向外传递参数：
            rowData  ：选中含行的数据
        */
        return fun({ rowData: this.tableData[currow] });
      });
    },
    initData() {
      this.props.forEach((prop) => {
        if (!prop) {
          return;
        }
        //将与单一标题匹配的数据集整合在一起
        //例如 label="city"  则整合的数据为["广州","深圳"]
        const result = this.tableData.map((val) => {
          return val[prop];
        });
        //利用对象记录每一个label所对应的整合数据
        this.data[prop] = result;
      });
    },
  },
  created() {
    //整合数据
    /** 整合的形式如下所示
     *  {
     *    city : ["广州","深圳"],
     *    age : [18,20]
     *  }
     */

    this.$on("slotsFun", (slotsFun) => {
      if (slotsFun && !this.slotsFun.includes(slotsFun)) {
        this.slotsFun.push(slotsFun);
      }
      return;
    });
    //计算表格的信息条数
    this.row = this.tableData.length;
  },
  mounted() {
    //遍历所有的子组件以将它们的label属性提取出来作为表头的内容
    this.$children.forEach((child) => {
      this.labels.push(child.label);
      this.props.push(child.prop);
    });

    //用于初始化通过插槽所传递的数据
    this.slots = this.slotsFun.map((fun) => {
      return fun();
    });

    this.initData();

    //移除监听自定义的slotsFun事件，避免因数据变化多次添加作用域插槽函数
    this.$off("slotsFun");
  },
};
</script>
<style scoped lang="less">
.qw-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 10px solid black;
  tr {
    height: 50px;
    width: 50px;
  }
  td,
  th {
    padding: 0 10px;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  thead {
    width: 100%;
    height: 50px;
    background-color: rgb(244, 244, 246);
    padding: 10px;
    border-radius: 15px;
    text-align: center;
  }
  tbody {
    text-align: center;
    tr {
      border-bottom: 1px solid rgb(71, 169, 250);
      cursor: pointer;
    }
    tr:hover {
      background-color: rgba(58, 205, 225, 0.1);
    }
    td {
      padding-top: 20px;
      padding-bottom: 20px;
      transition: all 0.3s;
    }
  }
}
</style>