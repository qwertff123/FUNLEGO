/**
 * 深拷贝
 * @param { * }  需要深拷贝的数据
 * @return { * }  返回拷贝的结果
 */
export function deepClone(origin) {
    if (Object.prototype.toString.call(origin) == "[object Array]") {
        const arr = [];
        for (const key in origin) {
            arr.push(deepClone(origin[key]));
        }
        return arr;
    } else if (Object.prototype.toString.call(origin) == "[object Object]") {
        const obj = {};
        for (const key in origin) {
            obj[key] = deepClone(origin[key]);
        }
        return obj;
    }
    return origin;
}

/**
 * @param { Dom } 上传文件的表单元素
 * @return { Promise } 将文件的base64格式返回
 */
export function getBase64(el) {
    return new Promise((resolve) => {
        console.log("元素",el);
        const files = el.files[0];

        //利用该对象可以用于读取文件的ArrayBuffer以及文本字符串
        const reader = new FileReader();

        reader.onload = function () {
            const type = files.type;
            resolve(`data:${type};base64,${window.btoa(reader.result)}`);
        };
        //用于读取文件的文本字符串
        reader.readAsBinaryString(files);
    });
}

/**
 * 根据所给出的key数组过滤对象
 * @param { Object } obj 对象
 * @param { Array } keys  键名
 */
export function filterObj(obj,keys){
    const result = {};
    keys.forEach(key=>{
        result[key] = obj[key];
    })
    return result;
}