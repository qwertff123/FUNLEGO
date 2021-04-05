/**
 * 
 * @param { Object } option { rule : 当前表单的规则, el : 触发表单校验的元素,success : 校验正确的回调函数,传入所属该表单所有校验是否都通过的Boolean值,error : 校验是失败的回调函数，返回的是错误信息 }
 *  
 */
/* eslint-disable no-unused-vars */
export function registerVertifyEvent(option) {
    const {
        instance,
        rules,
        el,
        success = () => {},
        error = () => {}
    } = option;

    //所有错误的集合
    //将规则所在总规则数组中的索引作为该集合的键值，通过该键值可以决定错误信息展示的优先级
    const errorMsgCollection = {};

    //当校验通过时函数内部调用的函数
    function vertifyError(index, msg) {
        errorMsgCollection[index] = msg;
        //根据下标来决定错误信息展示的优先级
        for (const key in errorMsgCollection) {
            if (errorMsgCollection[key]) {
                //找到优先展示的信息
                msg = errorMsgCollection[key];
                break;
            }
        }
        //返回错误信息
        error(msg);
    }

    //当校验失败时函数内部调用的函数
    function vertifyCorrect(index) {
        errorMsgCollection[index] = null;
        let arrow = true;
        //当一个错误被修正时，会遍历错误集合检验是否还有其他的错误
        for (const key in errorMsgCollection) {
            if (errorMsgCollection[key]) {
                arrow = false;
                break;
            }
        }
        //返回是否已经处理完所有的错误
        success(arrow);
    }

    rules && rules.forEach((rule, index) => {
        //如果具有require，则该表单值不能为空
        if (rule.require) {
            //触发事件可以为字符串也可以为一个数组
            if (typeof rule.trigger == "string") {
                el.addEventListener(rule.trigger, () => {
                    console.log(666);
                    if (!instance.value) {
                        vertifyError(index, rule.msg)
                    } else {
                        vertifyCorrect(index);
                    }
                });
            } else if (typeof rule.trigger == "object") {
                rule.trigger.forEach(trigger => {
                    el.addEventListener(trigger, () => {
                        if (!instance.value) {
                            vertifyError(index, rule.msg)
                        } else {
                            vertifyCorrect(index);
                        }
                    });
                })
            }
        } else if (rule.validator) {
            if (typeof rule.trigger == "string") {
                el.addEventListener(rule.trigger, () => {
                    if (!rule.validator(instance.value)) {
                        vertifyError(index, rule.msg);
                    } else {
                        vertifyCorrect(index);
                    }
                });
            } else if (typeof rule.trigger == "object") {
                rule.trigger.forEach(trigger => {
                    el.addEventListener(trigger, () => {
                        if (!rule.validator(instance.value)) {
                            vertifyError(index, rule.msg);
                        } else {
                            vertifyCorrect(index);
                        }
                    });
                })
            }

        }
    });

}