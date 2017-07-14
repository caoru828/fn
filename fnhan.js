/**
 * Created by Administrator on 2017/7/14 0014.
 */
/**
 * Created by Administrator on 2017/7/13 0013.
 */




//   $函数支持 选择器选择 $(selector,context)   $  #xx||.xx||xx
function $(seletor, context) {
    context = context || document;
    switch (seletor.charAt(0)) {
        case '#':
//                     返回数组，每个case都返回数组，优化性能，这个[x]是数组，变量
//            *****
            return [document.getElementById(seletor.substring(1))];
            break;
        case '.':
            return getClass(seletor.substring(1), context);
            break;
        default :
            return context.getElementsByTagName(seletor);
            break;
    }

}
//去除首尾空格
function trim(str) {

    //    return  str.replace(/^\s+&&\s+$ /,'')
    return str.replace(/^\s+|\s+$|/g, '')

}

//  获取classname
function getClass(className, context) {
    context = context || document;
    var result = [];
    var reg = new RegExp("\\b" + className + "\\b");
//        var elements = context.getElementsByClassName("className");
    var elements = context.getElementsByTagName("*");
    //直接getclassname行不行呢
    for (var i = 0; i < elements.length; i++) {
        if (reg.text(elements[i].className)) {
            //if (reg.text(elements[i]).className) {       括号匹配出错
//               result[i]   =  elements[i];
            result.push(elements[i]);
        }
    }
    return result;
}
/**
 * 获取元素样式
 */
function getStyle(elem, attr) {
    if (elem.currentStyle) {
        return elem.currentStyle[attr];
        //    为啥是window.
    } else if (window.getComputedStyle) {
        // false是什么
        return getComputedStyle(elem, false)[attr]
    } else {
        //不变色
        return elem.style[attr];
    }
}


/**
 *
 * @param obj 克隆对象
 * @returns {Array}  克隆完的
 * @constructor
 */
function CloneObj(obj) {
    var NewObj = [];
    for (var p in obj) {
        if (obj[p] == "object") {
            NewObj[p] = CloneObj(obj[p]);
            //指向当前被调用的函数本身，要改函数名字时，不用该里边的
            // NewObj[p] = arguments.callee(obj[p]);
        } else {
            NewObj[p] = obj[p];
        }
    }
    return NewObj;
}
//  console.log( CloneObj(o2));
/**
 *
 * @param target  原对象
 * @param obj     合并它给target
 * @returns {*}   合并后的
 */
function hebing(target, obj) {
    for (var p in obj) {
        if (obj[p] == "object") {
            target[p] = CloneObj(obj[p]);
        } else {
            target[p] = obj[p];
        }
    }
    return target;
}
//反的？    console.log(hebing(o1,o2));

//找所有的兄弟
function sibiling(elem) {
    var arr = [];
    var elements = elem.parentNode;
    if (elem.sibiling) {//标准
        for (var i = 0; elements.length; i++) {
            if (elements[i] != elem) {
                arr[i] = elements[i];
            }
        }

    }
    return arr;
}
//删除元素
function remove(elem) {
    elem.parentNode.removeChild(elem);

}


//绑定事件
function addEvent(elem, type, fn) {
    if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);
    } else if (elem.attachEvent) {
        elem[type + fn] = function () {
            fn.call(elem);
        };
        elem.attachEvent("on" + type, elem[type + fn]);
    }
    else {
        elem["on" + type] = fn;

    }
}
//        移除事件
function removes(elem, type, fn) {
    if (elem.removeEvent) {
        elem.removeEventListener(type, fn, false);
    } else if (elem.detachEvent) {
        elem.detachEvent("on" + type, elem[type + fn]);
    } else {
        elem["on" + type] = null;
    }
}
//下一个兄弟
function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
}

// console.log(next(oH1));
//前一个兄弟
function previous(elem) {
    do {
        elem = elem.previousSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
}
console.log(previous(oP));

//找elem的第一个儿子
function first(elem) {
    elem = elem.firstChild;
    return elem && elem.nodeType == 1 ? elem : next(elem);
}
function last(elem) {
    elem = elem.lastChild;
    return elem && elem.nodeType == 1 ? elem : previous(elem);
}


function getStyleV(elem, type) {
    if (elem.currentStyle) {//IE
        return elem.currentStyle[type];
    } else if (window.getComputedStyle) {
        return getComputedStyle(elem, false)[type];
    } else {
        return elem.style[type];
    }
}
/**
 *  /*    css的三种可能
 1.   css(oDiv,"width","400px")  改值
 2.   css(oDiv,"width")      获取值
 3.   css(oDiv,{
     width:400,
     heigh:"300px"
     background : "#0ff"
     });        改变样式
 */

function css(elem, type, value) {
    if (value) {
        elem.style[type] = value;
    } else if (typeof(type)  == "string") {
        return getStyleV(elem, type);
    } else {
        for (var p in type) {
            switch (p) {
                case 'width':
                case 'height':
                case 'padding':
                case 'paddingLeft':
                case 'paddingRight':
                case 'paddingTop':
                case 'paddingBottom':
                    value = /\%/.test(type[p]) ? type[p] : Math.max(parseInt(type[p]), 0) + 'px';
                    break;
                case 'left':
                case 'top':
                case 'bottom':
                case 'right':
                case 'margin':
                case 'marginLeft':
                case 'marginRight':
                case 'marginTop':
                case 'marginBottom':
                    value = /\%/.test(type[p]) ? type[p] : parseInt(type[p]) + 'px';
                    break;
                default:
                    value = type[p];
            }
            elem.style[p] = value;
        }
    }
}