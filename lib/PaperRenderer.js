'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactReconciler = require('react-reconciler');

var _reactReconciler2 = _interopRequireDefault(_reactReconciler);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _emptyObject = require('fbjs/lib/emptyObject');

var _emptyObject2 = _interopRequireDefault(_emptyObject);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _paperCore = require('paper/dist/paper-core');

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function applyItemProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (props.blendMode !== prevProps.blendMode) {
    instance.blendMode = props.blendMode;
  }
  if (props.clipMask !== prevProps.clipMask) {
    instance.clipMask = props.clipMask;
  }
  if (props.opacity !== prevProps.opacity) {
    instance.opacity = props.opacity;
  }
  if (!new _paperCore.Point(props.pivot).equals(new _paperCore.Point(prevProps.pivot))) {
    instance.rotation = 0;
    instance.pivot = props.pivot;
    instance.rotation = props.rotation || 0;
  }
  if (!new _paperCore.Point(props.position).equals(new _paperCore.Point(prevProps.position))) {
    instance.position = props.position;
  }
  if (props.rotation !== prevProps.rotation) {
    instance.rotation = props.rotation;
  }
  if (props.selected !== prevProps.selected) {
    instance.selected = props.selected;
  }
  if (props.visible !== prevProps.visible) {
    instance.visible = props.visible;
  }
}

function applyStyleProps(instance, props) {
  if (props.fillColor) {
    instance.fillColor = props.fillColor;
  }
  if (props.strokeColor) {
    instance.strokeColor = props.strokeColor;
  }
  if (props.selected) {
    instance.selected = props.selected;
  }
}

function applyGroupProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  applyItemProps(instance, props, prevProps);
  if (!_lodash2.default.isEqual(props.center, prevProps.center)) {
    instance.translate([props.center[0] - prevProps.center[0], props.center[1] - prevProps.center[1]]);
  }
  if (props.rotation !== prevProps.rotation) {
    // in case null is set
    var rotation = props.rotation ? props.rotation : 0;
    var prevRotation = prevProps.rotation ? prevProps.rotation : 0;
    instance.rotate(rotation - prevRotation);
  }
  // TODO: check if this is ok
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor;
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor;
  }
}

function applyLayerProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  applyItemProps(instance, props, prevProps);
  if (props.active !== prevProps.active && props.active === true) {
    instance.activate();
  }
  if (props.locked !== prevProps.locked) {
    instance.locked = props.locked;
  }
  // TODO: check if this is ok
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor;
    instance.children.forEach(function (child) {
      if (child instanceof _paperCore.Path) {
        child.strokeColor = props.strokeColor;
      }
    });
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor;
  }
}

function applyPathProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  applyItemProps(instance, props, prevProps);
  if (props.closed !== prevProps.closed) {
    instance.closed = props.closed;
  }
  if (props.dashArray !== prevProps.dashArray) {
    instance.dashArray = props.dashArray;
  }
  if (props.dashOffset !== prevProps.dashOffset) {
    instance.dashOffset = props.dashOffset;
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor;
  }
  if (props.pathData !== prevProps.pathData) {
    instance.pathData = props.pathData;
  }
  if (props.strokeCap !== prevProps.strokeCap) {
    instance.strokeCap = props.strokeCap;
  }
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor;
  }
  if (props.strokeJoin !== prevProps.strokeJoin) {
    instance.strokeJoin = props.strokeJoin;
  }
  if (props.strokeScaling !== prevProps.strokeScaling) {
    instance.strokeScaling = props.strokeScaling;
  }
  if (props.strokeWidth !== prevProps.strokeWidth) {
    instance.strokeWidth = props.strokeWidth;
  }
}

function applyRectangleProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  applyPathProps(instance, props, prevProps);
  if (!_lodash2.default.isEqual(props.size, prevProps.size)) {
    instance.scale(props.size[0] / prevProps.size[0], props.size[1] / prevProps.size[1]);
  }
}

function applyCircleProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  applyPathProps(instance, props, prevProps);
  if (props.radius !== prevProps.radius) {
    instance.scale(props.radius / prevProps.radius);
  }
  if (!new _paperCore.Point(props.center).equals(new _paperCore.Point(prevProps.center))) {
    instance.position = props.center;
  }
}

function applyEllipseProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  applyRectangleProps(instance, props, prevProps);
}

function applyRasterProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  applyItemProps(instance, props, prevProps);
  if (props.source !== prevProps.source) {
    instance.source = props.source;
  }
  if (props.onLoad !== prevProps.onLoad) {
    instance.onLoad = props.onLoad;
  }
}

function applyPointTextProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  applyItemProps(instance, props, prevProps);
  if (props.content !== prevProps.content) {
    instance.content = props.content;
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor;
  }
  if (props.fontFamily !== prevProps.fontFamily) {
    instance.fontFamily = props.fontFamily;
  }
  if (props.fontSize !== prevProps.fontSize) {
    instance.fontSize = props.fontSize;
  }
  if (props.fontWeight !== prevProps.fontWeight) {
    instance.fontWeight = props.fontWeight;
  }
  if (!new _paperCore.Point(props.point).equals(prevProps.point)) {
    instance.translate(new _paperCore.Point(props.point).subtract(prevProps.point));
  }
}

function applyToolProps(instance, props) {
  var prevProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (props.active !== prevProps.active && props.active === true) {
    instance.activate();
  }
  if (props.onMouseDown !== prevProps.onMouseDown) {
    instance.onMouseDown = props.onMouseDown;
  }
  if (props.onMouseDrag !== prevProps.onMouseDrag) {
    instance.onMouseDrag = props.onMouseDrag;
  }
  if (props.onMouseMove !== prevProps.onMouseMove) {
    instance.onMouseMove = props.onMouseMove;
  }
  if (props.onMouseUp !== prevProps.onMouseUp) {
    instance.onMouseUp = props.onMouseUp;
  }
  if (props.onKeyUp !== prevProps.onKeyUp) {
    instance.onKeyUp = props.onKeyUp;
  }
  if (props.onKeyDown !== prevProps.onKeyDown) {
    instance.onKeyDown = props.onKeyDown;
  }
}

var PaperRenderer = (0, _reactReconciler2.default)({
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    if (typeof child === 'string') {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      (0, _invariant2.default)(false, 'Text children should already be flattened.');
    } else if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Item) {
      child.addTo(parentInstance);
    }
  },
  createInstance: function createInstance(type, props, paperScope) {
    var children = props.children,
        paperProps = _objectWithoutProperties(props, ['children']);

    var instance = {};

    switch (type) {
      case _types2.default.TOOL:
        instance = new _paperCore.Tool(paperProps);
        instance._applyProps = applyToolProps;
        break;
      case _types2.default.CIRCLE:
        instance = new _paperCore.Path.Circle(paperProps);
        instance._applyProps = applyCircleProps;
        break;
      case _types2.default.ELLIPSE:
        instance = new _paperCore.Path.Ellipse(paperProps);
        instance._applyProps = applyEllipseProps;
        break;
      case _types2.default.GROUP:
        instance = new _paperCore.Group(paperProps);
        instance._applyProps = applyGroupProps;
        break;
      case _types2.default.LAYER:
        instance = new _paperCore.Layer(paperProps);
        instance._applyProps = applyLayerProps;
        break;
      case _types2.default.LINE:
        instance = new _paperCore.Path.Line(paperProps);
        instance._applyProps = applyPathProps;
        break;
      case _types2.default.ARC:
        instance = new _paperCore.Path.Arc(paperProps);
        instance._applyProps = applyPathProps;
        break;
      case _types2.default.PATH:
        instance = new _paperCore.Path(paperProps);
        instance._applyProps = applyPathProps;
        break;
      case _types2.default.POINTTEXT:
        instance = new _paperCore.PointText(paperProps);
        instance._applyProps = applyPointTextProps;
        break;
      case _types2.default.RECTANGLE:
        instance = new _paperCore.Path.Rectangle(paperProps);
        instance._applyProps = applyRectangleProps;
        break;
      case _types2.default.RASTER:
        var onLoad = paperProps.onLoad,
            rasterProps = _objectWithoutProperties(paperProps, ['onLoad']);

        instance = new _paperCore.Raster(rasterProps);
        instance._applyProps = applyRasterProps;
        if (typeof onLoad === 'function') {
          instance.onLoad = function () {
            return onLoad(instance);
          };
        }
        break;
      default:
        (0, _invariant2.default)(instance, 'PaperRenderer does not support the type "%s"', type);
        break;
    }

    if (instance.data && !instance.data.type) {
      instance.data.type = type;
    }

    (0, _invariant2.default)(instance, 'PaperRenderer does not support the type "%s"', type);

    return instance;
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, paperScope) {
    return text;
  },
  finalizeInitialChildren: function finalizeInitialChildren(domElement, type, props) {
    // If applyMatrix=true, group props should be applied after all children have benn added.
    // If applyMatrix=false, only style-related props (ex. fillColor, strokeColor) should be applied.
    // TODO: add case for Layer
    switch (type) {
      case _types2.default.GROUP:
        if (domElement.applyMatrix) {
          applyGroupProps(domElement, props);
        } else {
          applyStyleProps(domElement, props);
        }
        break;
      default:
        break;
    }
    return false;
  },
  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },
  prepareForCommit: function prepareForCommit() {
    // Noop
  },
  prepareUpdate: function prepareUpdate(domElement, type, oldProps, newProps) {
    return true;
  },
  resetAfterCommit: function resetAfterCommit() {
    // Noop
  },
  resetTextContent: function resetTextContent(domElement) {
    // Noop
  },
  shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree(type, props) {
    return false;
  },
  getRootHostContext: function getRootHostContext() {
    return _emptyObject2.default;
  },
  getChildHostContext: function getChildHostContext() {
    return _emptyObject2.default;
  },


  scheduleDeferredCallback: typeof window !== 'undefined' ? window.requestIdleCallback : null,

  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },


  useSyncScheduling: true,

  now: Date.now,

  mutation: {
    appendChild: function appendChild(parentInstance, child) {
      if (child.parentNode === parentInstance) {
        child.remove();
      }
      if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Item) {
        child.addTo(parentInstance);
      }
    },
    appendChildToContainer: function appendChildToContainer(parentInstance, child) {
      if (child.parentNode === parentInstance) {
        child.remove();
      }
      if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Item) {
        child.addTo(parentInstance);
      }
    },
    insertBefore: function insertBefore(parentInstance, child, beforeChild) {
      (0, _invariant2.default)(child !== beforeChild, 'PaperRenderer: Can not insert node before itself');
      if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Path && beforeChild instanceof _paperCore.Path) {
        child.insertAbove(beforeChild);
      }
    },
    insertInContainerBefore: function insertInContainerBefore(parentInstance, child, beforeChild) {
      (0, _invariant2.default)(child !== beforeChild, 'PaperRenderer: Can not insert node before itself');
      if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Path && beforeChild instanceof _paperCore.Path) {
        child.insertAbove(beforeChild);
      }
    },
    removeChild: function removeChild(parentInstance, child) {
      child.remove();
    },
    removeChildFromContainer: function removeChildFromContainer(parentInstance, child) {
      child.remove();
    },
    commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
      // Noop
    },
    commitMount: function commitMount(instance, type, newProps) {
      // Noop
    },
    commitUpdate: function commitUpdate(instance, updatePayload, type, oldProps, newProps, paperScope) {
      instance._applyProps(instance, newProps, oldProps);
    }
  }
});

exports.default = PaperRenderer;