'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _paperCore = require('paper/dist/paper-core');

var _PaperRenderer = require('./PaperRenderer');

var _PaperRenderer2 = _interopRequireDefault(_PaperRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_Component) {
  _inherits(View, _Component);

  function View() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, View);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = View.__proto__ || Object.getPrototypeOf(View)).call.apply(_ref, [this].concat(args))), _this), _this.canvasRef = function (ref) {
      if (ref) _this.canvas = ref;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(View, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          activeLayer = _props.activeLayer,
          activeTool = _props.activeTool,
          children = _props.children,
          width = _props.width,
          height = _props.height,
          settings = _props.settings;


      this.paper = new _paperCore.PaperScope();
      this.paper.setup(this.canvas);

      if (settings) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(settings)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            this.paper.settings[key] = settings[key];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      var _paper = this.paper,
          project = _paper.project,
          tools = _paper.tools,
          view = _paper.view;


      view.viewSize = new _paperCore.Size(width, height);

      this.mountNode = _PaperRenderer2.default.createContainer(this.paper);

      _PaperRenderer2.default.updateContainer(children, this.mountNode, this);

      // initial active layer
      if (typeof activeLayer === 'number') {
        var layer = project.layers.find(function (l) {
          return l.data.id === activeLayer;
        });
        if (layer) layer.activate();
      }

      // initial active tool
      if (typeof activeTool === 'string') {
        var tool = tools.find(function (t) {
          return t.name === activeTool;
        });
        if (tool) tool.activate();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props,
          children = _props2.children,
          width = _props2.width,
          height = _props2.height;
      var view = this.paper.view;


      _PaperRenderer2.default.updateContainer(children, this.mountNode, this);

      // size has changed, update center
      if (width !== prevProps.width || height !== prevProps.height) {
        var prevCenter = view.center;
        view.viewSize = new _paperCore.Size(width, height);
        view.translate(view.center.subtract(prevCenter));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _PaperRenderer2.default.updateContainer(null, this.mountNode, this);
    }
  }, {
    key: 'render',
    value: function render() {
      _PaperRenderer2.default.injectIntoDevTools({
        bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
        version: '0.10.0',
        rendererPackageName: 'react-paper-bindings',
        findHostInstanceByFiber: _PaperRenderer2.default.findHostInstance
      });

      var _props3 = this.props,
          activeLayer = _props3.activeLayer,
          activeTool = _props3.activeTool,
          children = _props3.children,
          width = _props3.width,
          height = _props3.height,
          other = _objectWithoutProperties(_props3, ['activeLayer', 'activeTool', 'children', 'width', 'height']);

      return _react2.default.createElement('canvas', _extends({}, other, { ref: this.canvasRef }));
    }
  }]);

  return View;
}(_react.Component);

exports.default = View;