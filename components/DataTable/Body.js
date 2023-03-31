"use strict";

exports.__esModule = true;
exports.Body = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _utils = require("../../utils");
var _CheckBox = require("../CheckBox");
var _InfiniteScroll = require("../InfiniteScroll");
var _TableRow = require("../TableRow");
var _TableCell = require("../TableCell");
var _Keyboard = require("../Keyboard");
var _ExpanderCell = require("./ExpanderCell");
var _Cell = require("./Cell");
var _StyledDataTable = require("./StyledDataTable");
var _buildState = require("./buildState");
var _defaultProps = require("../../default-props");
var _excluded = ["cellProps", "columns", "data", "disabled", "onMore", "replace", "onClickRow", "onSelect", "pinnedOffset", "primaryProperty", "rowProps", "selected", "rowDetails", "show", "size", "step", "rowExpand", "setRowExpand", "verticalAlign"];
/* eslint-disable no-underscore-dangle */
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Row = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var cellProps = _ref.cellProps,
    primaryValue = _ref.primaryValue,
    index = _ref.index,
    rowRef = _ref.rowRef,
    size = _ref.size,
    active = _ref.active,
    onClickRow = _ref.onClickRow,
    datum = _ref.datum,
    selected = _ref.selected,
    onSelect = _ref.onSelect,
    isDisabled = _ref.isDisabled,
    isSelected = _ref.isSelected,
    rowDetails = _ref.rowDetails,
    isRowExpanded = _ref.isRowExpanded,
    setActive = _ref.setActive,
    setRowExpand = _ref.setRowExpand,
    rowExpand = _ref.rowExpand,
    columns = _ref.columns,
    pinnedOffset = _ref.pinnedOffset,
    primaryProperty = _ref.primaryProperty,
    data = _ref.data,
    verticalAlign = _ref.verticalAlign;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableRow, {
    ref: rowRef,
    size: size,
    active: active,
    "aria-disabled": onClickRow && isDisabled || undefined,
    onClick: onClickRow ? function (event) {
      if (onClickRow && !isDisabled) {
        if (typeof onClickRow === 'function') {
          // extract from React's synthetic event pool
          event.persist();
          var adjustedEvent = event;
          adjustedEvent.datum = datum;
          adjustedEvent.index = index;
          onClickRow(adjustedEvent);
        } else if (onClickRow === 'select') {
          if (isSelected) {
            onSelect(selected.filter(function (s) {
              return s !== primaryValue;
            }));
          } else onSelect([].concat(selected, [primaryValue]));
        }
      }
    } : undefined,
    onMouseEnter: onClickRow && !isDisabled ? function () {
      return setActive(index);
    } : undefined,
    onMouseLeave: onClickRow ? function () {
      return setActive(undefined);
    } : undefined
  }, (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_Cell.Cell, {
    background: (pinnedOffset == null ? void 0 : pinnedOffset._grommetDataTableSelect) && cellProps.pinned.background || cellProps.background,
    border: cellProps.pinned.border || cellProps.border,
    pinnedOffset: pinnedOffset == null ? void 0 : pinnedOffset._grommetDataTableSelect,
    "aria-disabled": isDisabled || !onSelect || undefined,
    column: {
      pin: Boolean(pinnedOffset == null ? void 0 : pinnedOffset._grommetDataTableSelect),
      plain: 'noPad',
      size: 'auto',
      render: function render() {
        return /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, {
          tabIndex: onClickRow === 'select' ? -1 : undefined,
          a11yTitle: (isSelected ? 'unselect' : 'select') + " " + primaryValue,
          checked: isSelected,
          disabled: isDisabled || !onSelect,
          onChange: function onChange() {
            if (isSelected) {
              onSelect(selected.filter(function (s) {
                return s !== primaryValue;
              }));
            } else onSelect([].concat(selected, [primaryValue]));
          },
          pad: cellProps.pad
        });
      }
    },
    verticalAlign: verticalAlign
  }), rowDetails && /*#__PURE__*/_react["default"].createElement(_ExpanderCell.ExpanderCell, {
    context: isRowExpanded ? 'groupHeader' : 'body',
    expanded: isRowExpanded,
    onToggle: function onToggle() {
      if (isRowExpanded) {
        setRowExpand(rowExpand.filter(function (s) {
          return s !== index;
        }));
      } else {
        setRowExpand([].concat(rowExpand, [index]));
      }
    },
    pad: cellProps.pad,
    verticalAlign: verticalAlign
  }), columns.map(function (column) {
    return /*#__PURE__*/_react["default"].createElement(_Cell.Cell, {
      key: column.property,
      background: column.pin && cellProps.pinned.background || cellProps.background,
      border: column.pin && cellProps.pinned.border || cellProps.border,
      context: "body",
      column: column,
      datum: datum,
      pad: column.pin && cellProps.pinned.pad || cellProps.pad,
      pinnedOffset: pinnedOffset && pinnedOffset[column.property],
      primaryProperty: primaryProperty,
      scope: column.primary || column.property === primaryProperty ? 'row' : undefined,
      verticalAlign: verticalAlign
    });
  })), rowDetails && isRowExpanded && /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableRow, {
    key: index.toString() + "_expand"
  }, (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, null), /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    colSpan: columns.length + 1
  }, rowDetails(data[index]))));
});
var Body = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var _ref3;
  var cellPropsProp = _ref2.cellProps,
    columns = _ref2.columns,
    data = _ref2.data,
    disabled = _ref2.disabled,
    onMore = _ref2.onMore,
    replace = _ref2.replace,
    onClickRow = _ref2.onClickRow,
    onSelect = _ref2.onSelect,
    pinnedOffset = _ref2.pinnedOffset,
    primaryProperty = _ref2.primaryProperty,
    rowProps = _ref2.rowProps,
    selected = _ref2.selected,
    rowDetails = _ref2.rowDetails,
    show = _ref2.show,
    size = _ref2.size,
    step = _ref2.step,
    rowExpand = _ref2.rowExpand,
    setRowExpand = _ref2.setRowExpand,
    verticalAlign = _ref2.verticalAlign,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var _React$useState = _react["default"].useState(),
    active = _React$useState[0],
    setActive = _React$useState[1];
  var _React$useState2 = _react["default"].useState(),
    lastActive = _React$useState2[0],
    setLastActive = _React$useState2[1];

  // Determine if using a keyboard to cover focus behavior
  var usingKeyboard = (0, _utils.useKeyboard)();
  var onFocusActive = (_ref3 = active != null ? active : lastActive) != null ? _ref3 : usingKeyboard ? 0 : undefined;
  var activePrimaryValue = active >= 0 ? (0, _buildState.datumValue)(data[active], primaryProperty) : undefined;
  var selectRow = function selectRow() {
    if (activePrimaryValue !== undefined) {
      if (selected && selected.includes(activePrimaryValue)) {
        onSelect(selected.filter(function (s) {
          return s !== activePrimaryValue;
        }));
      } else onSelect([].concat(selected, [activePrimaryValue]));
    }
  };
  var clickableRow = onClickRow && active >= 0 && (!disabled || activePrimaryValue !== undefined && !disabled.includes(activePrimaryValue));
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: clickableRow ? function (event) {
      if (clickableRow) {
        if (typeof onClickRow === 'function') {
          event.persist();
          var adjustedEvent = event;
          adjustedEvent.datum = data[active];
          onClickRow(adjustedEvent);
        } else if (onClickRow === 'select') {
          selectRow();
        }
      }
    } : undefined
    // The WCAG recommendation for checkboxes is to select them with "Space"
    ,
    onSpace: function onSpace() {
      if (clickableRow) {
        if (onClickRow === 'select') {
          selectRow();
        }
      }
    },
    onUp: onClickRow && active ? function () {
      return setActive(active - 1);
    } : undefined,
    onDown: onClickRow && data.length && active < data.length - 1 ? function () {
      return setActive((active != null ? active : -1) + 1);
    } : undefined
  }, /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableBody, _extends({
    ref: ref,
    size: size,
    tabIndex: onClickRow ? 0 : undefined,
    onFocus: function onFocus() {
      return setActive(onFocusActive);
    },
    onBlur: function onBlur() {
      setLastActive(active);
      setActive(undefined);
    }
  }, rest), /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
    items: data,
    onMore: onMore,
    replace: replace,
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/_react["default"].createElement(_TableRow.TableRow, null, /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, null, marker));
    },
    show: show,
    step: step
  }, function (datum, index, rowRef) {
    var primaryValue = primaryProperty ? (0, _buildState.datumValue)(datum, primaryProperty) : undefined;
    var isSelected = selected && selected.includes(primaryValue);
    var isDisabled = disabled && disabled.includes(primaryValue);
    var isRowExpanded = rowExpand && rowExpand.includes(index);
    var cellProps = (0, _buildState.normalizeRowCellProps)(rowProps, cellPropsProp, primaryValue, index);
    return /*#__PURE__*/_react["default"].createElement(Row, {
      key: index,
      setActive: setActive,
      rowRef: rowRef,
      cellProps: cellProps,
      primaryValue: primaryValue,
      isDisabled: isDisabled,
      isSelected: isSelected,
      isRowExpanded: isRowExpanded,
      index: index,
      size: size,
      active: active >= 0 ? active === index : undefined,
      onClickRow: onClickRow,
      datum: datum,
      selected: selected,
      onSelect: onSelect,
      rowDetails: rowDetails,
      setRowExpand: setRowExpand,
      rowExpand: rowExpand,
      columns: columns,
      primaryProperty: primaryProperty,
      rowProps: rowProps,
      data: data,
      theme: theme,
      pinnedOffset: pinnedOffset,
      verticalAlign: verticalAlign
    });
  })));
});
exports.Body = Body;