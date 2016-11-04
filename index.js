'use strict';

/**
 * Credit to element ui
 */

var nodeList = [];
var ctx = '@CLICK_OUTSIDE@';

if (document.addEventListener) {
  document.addEventListener('click', function (e) {
    nodeList.forEach(function (node) {
      return node[ctx].documentHandler(e);
    });
  });
} else if (document.attachEvent) {
  document.attachEvent('onclick', function (e) {
    nodeList.forEach(function (node) {
      return node[ctx].documentHandler(e);
    });
  });
}

module.exports = {
  bind: function (el, binding, vnode) {
    var id = nodeList.push(el) - 1;
    var vctx = vnode.context;
    var documentHandler = function (e) {
      if (!vctx || el.contains(e.target) || vctx.popperElm && vctx.popperElm.contains(e.target)) {
        return;
      }

      if (binding.expression) {
        el[ctx].methodName && vctx[el[ctx].methodName] && vctx[el[ctx].methodName]();
      } else {
        el[ctx].bindingFn && el[ctx].bindingFn();
      }
    };
    el[ctx] = {
      id: id,
      documentHandler: documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    };
  },
  update: function (el, binding) {
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },
  unbind: function (el) {
    var len = nodeList.length;

    for (var i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
  }
};
