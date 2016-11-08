'use strict';

/**
 * Inspired by element ui clickoutside
 */

var EVENTS = {};
var nodeList = [];

function registerEvent(name) {
  if (EVENTS[name]) return;

  var mark = genMark(name);
  var handler = function (e) {
    nodeList.forEach(function (node) {
      return node[mark].documentHandler(e);
    });
  }
  if (document.addEventListener) {
    document.addEventListener(name, handler);
  } else if (document.attachEvent) {
    document.attachEvent('on' + name, handler);
  }
  EVENTS[name] = true;
}

function genMark(name) {
  return '@@' + name + '@@';
}

module.exports = {
  bind: function (el, binding, vnode) {
    registerEvent(binding.arg);

    var id = nodeList.push(el) - 1;
    var vctx = vnode.context;
    var mark = genMark(binding.arg);
    var documentHandler = function (e) {
      if (!vctx || el.contains(e.target) || vctx.popperElm && vctx.popperElm.contains(e.target)) {
        return;
      }

      if (binding.expression) {
        el[mark].methodName && vctx[el[mark].methodName] && vctx[el[mark].methodName]();
      } else {
        el[mark].bindingFn && el[mark].bindingFn();
      }
    };
    el[mark] = {
      id: id,
      documentHandler: documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    };
  },
  update: function (el, binding) {
    var mark = genMark(binding.arg);
    el[mark].methodName = binding.expression;
    el[mark].bindingFn = binding.value;
  },
  unbind: function (el, binding) {
    var mark = genMark(binding.arg);
    var len = nodeList.length;

    for (var i = 0; i < len; i++) {
      if (nodeList[i][mark].id === el[mark].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
  }
};
