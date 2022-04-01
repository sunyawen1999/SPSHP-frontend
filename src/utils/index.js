/**
 * Created by jiachenpan on 16/11/18.
 */
var moment = require('moment');

export const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("输入不可以为空"));
  }
  setTimeout(() => {
    const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; //手机号码
    const isMob = /^0?1[3456789][0-9]\d{8}$/; // 座机格式
    const isPhoneCheck = isPhone.test(value);
    const isMobCheck = isMob.test(value);
    if (!isPhoneCheck && !isMobCheck) {
      callback(new Error("请输入正确电话号码"));
    } else {
      callback();
    }
  }, 100);
};
export const checkIdNo = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("输入不可以为空"));
  }
  setTimeout(() => {
    const id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    const idCheck = id.test(value);
    if (!idCheck) {
      callback(new Error("请输入正确身份证号"));
    } else {
      callback();
    }
  }, 100);
};
export const checkPyNo = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("输入不可以为空"));
  }
  setTimeout(() => {
    const isNo = /^[0-9a-zA-Z]{8}$/;
    const isNoCheck = isNo.test(value);
    if (!isNoCheck) {
      callback(new Error("请输入正确物理卡号"));
    } else {
      callback();
    }
  }, 100);
};
export const checkChinese = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("输入不可以为空"));
  }
  setTimeout(() => {
    const chinese = /^[\u4e00-\u9fa5]+$/;
    const chineseCheck = chinese.test(value);
    if (!chineseCheck) {
      callback(new Error("请输入中文"));
    } else {
      callback();
    }
  }, 100);
};
export const checkNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("输入不可以为空"));
  }
  setTimeout(() => {
    const num = /^(-)?(([0-9])|([1-9]([0-9]+)))(.[0-9]+)?$/;
    const numCheck = num.test(value);
    if (!numCheck) {
      callback(new Error("请输入数字"));
    } else {
      callback();
    }
  }, 100);
};

export function parseTime(time, cFormat) {
  // time = time.slice(0, 19)
  // if (arguments.length === 0) {
  //   return null;
  // }
  // const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";

  const otherFormat = cFormat || "YYYY-MM-DD HH:mm:ss";
  const dateTime = moment(time).format(otherFormat);
  return dateTime;

  // let date;
  // if (typeof time === "object") {
  //   date = time;
  // } else {
  //   if (("" + time).length === 10) time = parseInt(time) * 1000;
  //   date = new Date(time);
  // }
  // const formatObj = {
  //   y: date.getFullYear(),
  //   m: date.getMonth() + 1,
  //   d: date.getDate(),
  //   h: date.getHours(),
  //   i: date.getMinutes(),
  //   s: date.getSeconds(),
  //   a: date.getDay(),
  // };
  // const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
  //   let value = formatObj[key];
  //   // Note: getDay() returns 0 on Sunday
  //   if (key === "a") {
  //     return ["日", "一", "二", "三", "四", "五", "六"][value];
  //   }
  //   if (result.length > 0 && value < 10) {
  //     value = "0" + value;
  //   }
  //   return value || 0;
  // });
  // return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  );
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 生成时间段
 * @param{Number} s 开始时间
 * @param{Number} e 结束时间
 */
export function formatTimeRange(s, e) {
  const sTime = (s && parseInt(s, 10)) || 0;
  const eTime = (e && parseInt(e, 10)) || 24;
  const result = [];
  for (let i = sTime; i < eTime; i++) {
    const tmp = {
      begin: new Date(parseTime(new Date(), "{y}-{m}-{d}")).setHours(i),
      end: new Date(parseTime(new Date(), "{y}-{m}-{d}")).setHours(i + 1),
      label: `${parseTime(new Date().setHours(i), "{h}:00")} ~ ${parseTime(
        new Date().setHours(i + 1),
        "{h}:00"
      )}`,
    };
    result.push(tmp);
  }
  return result;
}

// 对象转formdata
export function ObjToFrom(obj) {
  const form = new FormData();
  const item = obj || {};
  for (const key in item) {
    form.append(key, item[key]);
  }
  return form;
}

/**
 * 数组去重
 * @param {Array} arr 数组
 * @param {String} key  对象数组去重key
 */
export function uniqueArr(arr, key) {
  const a = Object.prototype.toString.call(arr) === "[object Array]" ? arr : [];
  const obj = {};
  const r = [];
  a.forEach((item) => {
    if (!key) {
      if (!obj[item]) {
        r.push(item);
        obj[item] = 1;
      }
    } else {
      if (!obj[item[key]]) {
        r.push(item);
        obj[item[key]] = 1;
      }
    }
  });
  return r;
}

/**
 * 预览文件
 */
export function previewFile(path) {
  const imgReg = new RegExp(".(jpg|jpeg|png|gif|svg|pdf)$", "i");
  const officeReg = new RegExp(".(xlsx|docx|pptx|doc|xls|ppt)$", "i");
  if (imgReg.test(path)) {
    window.open(path);
  } else if (officeReg.test(path)) {
    window.open(
      `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
        path
      )}`
    );
  }
}

/**
 * 将时间戳改为正确格式
 */
export function formatDateTime(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (var k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      var str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

//数组对象去重
export function resetList(str, list) {
  let result = [];
  let obj = {};
  for (let i = 0; i < list.length; i++) {
    if (!obj[list[i][str].id]) {
      result.push(list[i][str]);
      obj[list[i][str].id] = true;
    }
  }
  return result;
}

//缓存设置页数信息
export const setContextData = (key, value) => {
  if (typeof value == "string") {
    sessionStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

// 从sessionStorage取值
export const getContextData = (key) => {
  const str = sessionStorage.getItem(key);
  if (typeof str == "string") {
    try {
      return parseInt(str);
    } catch (e) {
      if (typeof str !== number) {
        return 1
      }
      return str;
    }
  }
  return;
}


export function throttle(func, wait) {
  let timeout
  return function () {
    let that = this
    let args = arguments

    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(that, args)
      }, wait)
    }
  }
}

/**
 * 利用 document.title 做新消息提示
 * @export
 * @param {Number} count
 */
export function titleNotify(count) {
  const hasNewMessage = count > 0
  if (hasNewMessage) {
    if (document.title.search(/\((.*?)\)/) >= 0) {
      document.title = document.title.replace(/\((.*?)\)/, `(${count > 99 ? '99+' : count})`)
    } else {
      document.title = `(${count})${document.title}`
    }
  } else {
    document.title = document.title.replace(/\((.*?)\)/, '')
  }
}
