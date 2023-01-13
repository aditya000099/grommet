"use strict";

exports.__esModule = true;
exports.Data = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _DataFilters = require("../DataFilters");
var _DataSearch = require("../DataSearch");
var _DataSummary = require("../DataSummary");
var _Toolbar = require("../Toolbar");
var _DataContext = require("../../contexts/DataContext");
var _propTypes = require("./propTypes");
var _filter = require("./filter");
var _excluded = ["children", "data", "defaultView", "filteredTotal", "id", "messages", "onView", "properties", "toolbar", "total", "updateOn", "view"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var defaultDefaultView = {
  search: ''
};
var Data = function Data(_ref) {
  var children = _ref.children,
    dataProp = _ref.data,
    _ref$defaultView = _ref.defaultView,
    defaultView = _ref$defaultView === void 0 ? defaultDefaultView : _ref$defaultView,
    filteredTotal = _ref.filteredTotal,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? 'data' : _ref$id,
    messages = _ref.messages,
    onView = _ref.onView,
    properties = _ref.properties,
    toolbar = _ref.toolbar,
    total = _ref.total,
    _ref$updateOn = _ref.updateOn,
    updateOn = _ref$updateOn === void 0 ? 'submit' : _ref$updateOn,
    viewProp = _ref.view,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)(viewProp || defaultView),
    view = _useState[0],
    setView = _useState[1];
  (0, _react.useEffect)(function () {
    return setView(viewProp);
  }, [viewProp]);
  var result = (0, _react.useMemo)(function () {
    if (onView)
      // caller is filtering
      return {
        data: dataProp,
        total: total,
        filteredTotal: filteredTotal || dataProp.length
      };
    return (0, _filter.filter)(dataProp, view, properties);
  }, [dataProp, filteredTotal, onView, properties, total, view]);

  // what we use for DataContext value
  var contextValue = (0, _react.useMemo)(function () {
    var value = _extends({
      id: id,
      messages: messages,
      properties: properties,
      updateOn: updateOn,
      view: view
    }, result);
    value.clearFilters = function () {
      var nextView = defaultView;
      setView(nextView);
      if (onView) onView(nextView);
    };
    value.onView = function (nextView) {
      setView(nextView);
      if (onView) onView(nextView);
    };
    return value;
  }, [defaultView, id, messages, onView, properties, result, updateOn, view]);
  var toolbarContent;
  if (toolbar) {
    toolbarContent = [/*#__PURE__*/_react["default"].createElement(_Toolbar.Toolbar, {
      key: "toolbar"
    }, (toolbar === true || toolbar === 'search') && /*#__PURE__*/_react["default"].createElement(_DataSearch.DataSearch, null), (toolbar === true || toolbar === 'filters') && /*#__PURE__*/_react["default"].createElement(_DataFilters.DataFilters, {
      drop: true
    })), /*#__PURE__*/_react["default"].createElement(_DataSummary.DataSummary, {
      key: "summary"
    })];
  }
  return /*#__PURE__*/_react["default"].createElement(_DataContext.DataContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    id: id,
    flex: false
  }, rest), toolbarContent, children));
};
exports.Data = Data;
Data.propTypes = _propTypes.DataPropTypes;