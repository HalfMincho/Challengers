import qs from "qs";

export function showDate(reg_date) {
  const year = reg_date.substr(12, 4);
  const month = reg_date.substr(8, 3);
  const date = reg_date.substr(5, 2);

  function MonthToNum(getmonth) {
    switch (getmonth) {
      case "Jan":
        return "01";
      case "Feb":
        return "02";
      case "Mar":
        return "03";
      case "Apr":
        return "04";
      case "May":
        return "05";
      case "Jun":
        return "06";
      case "Jul":
        return "07";
      case "Aug":
        return "08";
      case "Sep":
        return "09";
      case "Oct":
        return "10";
      case "Nov":
        return "11";
      case "Dec":
        return "12";
      default:
        return "";
    }
  }

  const fullDate = `${year}-${MonthToNum(month)}-${date}`;
  return fullDate;
}

export function getCurrentPage(location) {
  const queryParsing = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).page;
  if (isNaN(queryParsing)) {
    return 1;
  } else {
    return parseInt(queryParsing);
  }
}

export function loadComponent(loading, LodingComponent, Component) {
  if (loading === false) {
    return Component;
  } else {
    return LodingComponent;
  }
}
