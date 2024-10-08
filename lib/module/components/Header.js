import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import dayjs from 'dayjs';
import { getDateYear, getYearRange, YEAR_PAGE_SIZE } from '../utils';
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
  } = useCalendarContext();
  const currentMonthText = dayjs(currentDate).locale(locale).format('MMMM');
  const renderPrevButton = /*#__PURE__*/React.createElement(Pressable, {
    disabled: calendarView === 'time',
    onPress: () => calendarView === 'day' ? onChangeMonth(-1) : calendarView === 'month' ? onChangeYear(currentYear - 1) : calendarView === 'year' && onChangeYear(currentYear - YEAR_PAGE_SIZE),
    testID: "btn-prev",
    accessibilityRole: "button",
    accessibilityLabel: "Prev"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.iconContainer, styles.prev, theme === null || theme === void 0 ? void 0 : theme.headerButtonStyle]
  }, buttonPrevIcon || /*#__PURE__*/React.createElement(Image, {
    source: arrow_left,
    style: {
      width: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      height: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      tintColor: theme === null || theme === void 0 ? void 0 : theme.headerButtonColor
    }
  })));
  const renderNextButton = /*#__PURE__*/React.createElement(Pressable, {
    disabled: calendarView === 'time',
    onPress: () => calendarView === 'day' ? onChangeMonth(1) : calendarView === 'month' ? onChangeYear(currentYear + 1) : calendarView === 'year' && onChangeYear(currentYear + YEAR_PAGE_SIZE),
    testID: "btn-next",
    accessibilityRole: "button",
    accessibilityLabel: "Next"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.iconContainer, styles.next, theme === null || theme === void 0 ? void 0 : theme.headerButtonStyle]
  }, buttonNextIcon || /*#__PURE__*/React.createElement(Image, {
    source: arrow_right,
    style: {
      width: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      height: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      tintColor: theme === null || theme === void 0 ? void 0 : theme.headerButtonColor
    }
  })));
  const yearSelector = useCallback(() => {
    const years = getYearRange(currentYear);
    return /*#__PURE__*/React.createElement(Pressable, {
      onPress: () => {
        setCalendarView(calendarView === 'year' ? 'day' : 'year');
        onChangeYear(getDateYear(currentDate));
      },
      testID: "btn-year",
      accessibilityRole: "button",
      accessibilityLabel: dayjs(currentDate).format('YYYY')
    }, /*#__PURE__*/React.createElement(View, {
      style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
    }, calendarView === 'year' ? `${years[0]} - ${years[years.length - 1]}` : dayjs(currentDate).format('YYYY'))));
  }, [calendarView, currentDate, currentYear, setCalendarView, onChangeYear, theme]);
  const monthSelector = /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => setCalendarView(calendarView === 'month' ? 'day' : 'month'),
    testID: "btn-month",
    accessibilityRole: "button",
    accessibilityLabel: currentMonthText
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, currentMonthText)));
  const renderSelectors = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.selectorContainer
  }, calendarView !== 'year' ? monthSelector : null, yearSelector()), timePicker && mode === 'single' && calendarView !== 'year' ? /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => setCalendarView(calendarView === 'time' ? 'day' : 'time'),
    accessibilityRole: "button",
    accessibilityLabel: dayjs(date).format('HH:mm')
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, dayjs(date).format('HH:mm')))) : null);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.headerContainer, theme === null || theme === void 0 ? void 0 : theme.headerContainerStyle],
    accessibilityRole: "header"
  }, (theme === null || theme === void 0 ? void 0 : theme.headerButtonsPosition) === 'left' ? /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, renderPrevButton, renderNextButton), renderSelectors) : (theme === null || theme === void 0 ? void 0 : theme.headerButtonsPosition) === 'right' ? /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, renderSelectors, /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, renderPrevButton, renderNextButton)) : /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, renderPrevButton, renderSelectors, renderNextButton));
};
const styles = StyleSheet.create({
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
export default Header;
//# sourceMappingURL=Header.js.map