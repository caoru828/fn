/**
 * Created by Administrator on 2017/7/14 0014.
 */
/**
 * Created by Administrator on 2017/7/13 0013.
 */




//   $����֧�� ѡ����ѡ�� $(selector,context)   $  #xx||.xx||xx
function $(seletor, context) {
    context = context || document;
    switch (seletor.charAt(0)) {
        case '#':
//                     �������飬ÿ��case���������飬�Ż����ܣ����[x]�����飬����
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
//ȥ����β�ո�
function trim(str) {

    //    return  str.replace(/^\s+&&\s+$ /,'')
    return str.replace(/^\s+|\s+$|/g, '')

}

//  ��ȡclassname
function getClass(className, context) {
    context = context || document;
    var result = [];
    var reg = new RegExp("\\b" + className + "\\b");
//        var elements = context.getElementsByClassName("className");
    var elements = context.getElementsByTagName("*");
    //ֱ��getclassname�в�����
    for (var i = 0; i < elements.length; i++) {
        if (reg.text(elements[i].className)) {
            //if (reg.text(elements[i]).className) {       ����ƥ�����
//               result[i]   =  elements[i];
            result.push(elements[i]);
        }
    }
    return result;
}
/**
 * ��ȡԪ����ʽ
 */
function getStyle(elem, attr) {
    if (elem.currentStyle) {
        return elem.currentStyle[attr];
        //    Ϊɶ��window.
    } else if (window.getComputedStyle) {
        // false��ʲô
        return getComputedStyle(elem, false)[attr]
    } else {
        //����ɫ
        return elem.style[attr];
    }
}


/**
 *
 * @param obj ��¡����
 * @returns {Array}  ��¡���
 * @constructor
 */
function CloneObj(obj) {
    var NewObj = [];
    for (var p in obj) {
        if (obj[p] == "object") {
            NewObj[p] = CloneObj(obj[p]);
            //ָ��ǰ�����õĺ�������Ҫ�ĺ�������ʱ�����ø���ߵ�
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
 * @param target  ԭ����
 * @param obj     �ϲ�����target
 * @returns {*}   �ϲ����
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
//���ģ�    console.log(hebing(o1,o2));

//�����е��ֵ�
function sibiling(elem) {
    var arr = [];
    var elements = elem.parentNode;
    if (elem.sibiling) {//��׼
        for (var i = 0; elements.length; i++) {
            if (elements[i] != elem) {
                arr[i] = elements[i];
            }
        }

    }
    return arr;
}
//ɾ��Ԫ��
function remove(elem) {
    elem.parentNode.removeChild(elem);

}


//���¼�
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
//        �Ƴ��¼�
function removes(elem, type, fn) {
    if (elem.removeEvent) {
        elem.removeEventListener(type, fn, false);
    } else if (elem.detachEvent) {
        elem.detachEvent("on" + type, elem[type + fn]);
    } else {
        elem["on" + type] = null;
    }
}
//��һ���ֵ�
function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
}

// console.log(next(oH1));
//ǰһ���ֵ�
function previous(elem) {
    do {
        elem = elem.previousSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
}
console.log(previous(oP));

//��elem�ĵ�һ������
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
 *  /*    css�����ֿ���
 1.   css(oDiv,"width","400px")  ��ֵ
 2.   css(oDiv,"width")      ��ȡֵ
 3.   css(oDiv,{
     width:400,
     heigh:"300px"
     background : "#0ff"
     });        �ı���ʽ
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