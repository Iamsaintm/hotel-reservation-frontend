import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-us");

const formatTimeAgo = (date) => timeAgo.format(new Date(date), "mini-now");

export default formatTimeAgo;
