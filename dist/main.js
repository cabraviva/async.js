"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Operation = /*#__PURE__*/function () {
  function Operation() {
    _classCallCheck(this, Operation);

    this.handlers = {};
    this.states = ['pending', 'successfully', 'failed'];
    this.state = this.states[0];
  }

  _createClass(Operation, [{
    key: "dispatch",
    value: function dispatch(e) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (e === 'success') {
        this.state = this.states[1];
      } else if (e === 'fail') {
        this.state = this.states[2];
      }

      var _iterator = _createForOfIteratorHelper(this.handlers[e] || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;
          handler(value, e);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "fail",
    value: function fail() {
      var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Error('Operation failed');
      this.dispatch('fail', err);
    }
  }, {
    key: "success",
    value: function success() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.dispatch('success', value);
    }
  }, {
    key: "on",
    value: function on(e, handler) {
      if (_typeof(this.handlers[e]) !== 'object') {
        this.handlers[e] = [];
      }

      this.handlers[e].push(handler);
    }
  }]);

  return Operation;
}();

var waitFor = function waitFor(operation, callback) {
  operation.on('success', callback);
};

var isSuccess = function isSuccess(operation) {
  return operation.state === operation.states[1];
};

var waitfor = waitFor;

if (window) {
  window.waitFor = waitFor;
  window.waitfor = waitfor;
  window.Operation = Operation;
  window.isSuccess = isSuccess;
}