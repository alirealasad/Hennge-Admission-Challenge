const moment = require("moment");

export default date => {
  const then = new Date(parseInt(date));
  const now = new Date(Date.now());

  const yearDiff = then.getUTCFullYear() - now.getUTCFullYear();
  const monthDiff = then.getUTCMonth() - now.getUTCMonth();
  const dayDiff = then.getUTCDay() - now.getUTCDay();

// check if its same year
  if (yearDiff === 0) {
        // check if its same day in same month 
    if (monthDiff ===0 && dayDiff === 0) {
        return moment(then).format("h:mm");
    }
    return moment(then).format("MMM D");
  } else {
    return moment(then).calendar();
  }
};
