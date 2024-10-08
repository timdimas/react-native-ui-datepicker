"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CalendarContext = require("../CalendarContext");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const arrow_left = require('../assets/images/arrow_left.png');
const arrow_right = require('../assets/images/arrow_right.png');
const Header = ({
  buttonPrevIcon,
  buttonNextIcon
}) => {
  const {
    mode,
    date,
    currentDate,
    currentYear,
    onChangeMonth,
    onChangeYear,
    calendarView,
    setCalendarView,
    theme,
    locale,
    timePicker
  } = (0, _CalendarContext.useCalendarContext)();
  const currentMonthText = (0, _dayjs.default)(currentDate).locale(locale).format('MMMM');
  const renderPrevButton = /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    disabled: calendarView === 'time',
    onPress: () => calendarView === 'day' ? onChangeMonth(-1) : calendarView === 'month' ? onChangeYear(currentYear - 1) : calendarView === 'year' && onChangeYear(currentYear - _utils.YEAR_PAGE_SIZE),
    testID: "btn-prev",
    accessibilityRole: "button",
    accessibilityLabel: "Prev"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.iconContainer, styles.prev, theme === null || theme === void 0 ? void 0 : theme.headerButtonStyle]
  }, buttonPrevIcon || /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: arrow_left,
    style: {
      width: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      height: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      tintColor: theme === null || theme === void 0 ? void 0 : theme.headerButtonColor
    }
  })));
  const renderNextButton = /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    disabled: calendarView === 'time',
    onPress: () => calendarView === 'day' ? onChangeMonth(1) : calendarView === 'month' ? onChangeYear(currentYear + 1) : calendarView === 'year' && onChangeYear(currentYear + _utils.YEAR_PAGE_SIZE),
    testID: "btn-next",
    accessibilityRole: "button",
    accessibilityLabel: "Next"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.iconContainer, styles.next, theme === null || theme === void 0 ? void 0 : theme.headerButtonStyle]
  }, buttonNextIcon || /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: arrow_right,
    style: {
      width: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      height: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      tintColor: theme === null || theme === void 0 ? void 0 : theme.headerButtonColor
    }
  })));
  const yearSelector = (0, _react.useCallback)(() => {
    const years = (0, _utils.getYearRange)(currentYear);
    return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      onPress: () => {
        setCalendarView(calendarView === 'year' ? 'day' : 'year');
        onChangeYear((0, _utils.getDateYear)(currentDate));
      },
      testID: "btn-year",
      accessibilityRole: "button",
      accessibilityLabel: (0, _dayjs.default)(currentDate).format('YYYY')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
    }, calendarView === 'year' ? `${years[0]} - ${years[years.length - 1]}` : (0, _dayjs.default)(currentDate).format('YYYY'))));
  }, [calendarView, currentDate, currentYear, setCalendarView, onChangeYear, theme]);
  const monthSelector = /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: () => setCalendarView(calendarView === 'month' ? 'day' : 'month'),
    testID: "btn-month",
    accessibilityRole: "button",
    accessibilityLabel: currentMonthText
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, currentMonthText)));
  const renderSelectors = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.selectorContainer
  }, calendarView !== 'year' ? monthSelector : null, yearSelector()), timePicker && mode === 'single' && calendarView !== 'year' ? /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: () => setCalendarView(calendarView === 'time' ? 'day' : 'time'),
    accessibilityRole: "button",
    accessibilityLabel: (0, _dayjs.default)(date).format('HH:mm')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, (0, _dayjs.default)(date).format('HH:mm')))) : null);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.headerContainer, theme === null || theme === void 0 ? void 0 : theme.headerContainerStyle],
    accessibilityRole: "header"
  }, (theme === null || theme === void 0 ? void 0 : theme.headerButtonsPosition) === 'left' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, renderPrevButton, renderNextButton), renderSelectors) : (theme === null || theme === void 0 ? void 0 : theme.headerButtonsPosition) === 'right' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, renderSelectors, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, renderPrevButton, renderNextButton)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, renderPrevButton, renderSelectors, renderNextButton));
};
const styles = _reactNative.StyleSheet.create({
  headerContainer: {
    marginBottom: 5
  },
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    marginHorizontal: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15
  },
  iconContainer: {
    padding: 4
  },
  prev: {
    marginRight: 3
  },
  next: {
    marginLeft: 3
  },
  row: {
    flexDirection: 'row'
  }
});
var _default = exports.default = Header;
//# sourceMappingURL=Header.js.map