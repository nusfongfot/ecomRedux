import dayjs from "dayjs";

export function calculateDiff(timeInMin) {
  const timestamDays = dayjs(timeInMin);
  const nowDayjs = dayjs();

  if (timestamDays.isBefore(nowDayjs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    };
  }

  return {
    seconds: getRemainSeconds(nowDayjs, timestamDays),
    minutes: getRemainMinutes(nowDayjs, timestamDays),
    hours: getRemainHours(nowDayjs, timestamDays),
    days: getRemainDays(nowDayjs, timestamDays),
  };
}

function getRemainSeconds(nowDayjs, timestamDays) {
  const seconds = timestamDays.diff(nowDayjs, "seconds") % 60;
  return padWithZeros(seconds, 2);
}
function getRemainMinutes(nowDayjs, timestamDays) {
  const minutes = timestamDays.diff(nowDayjs, "minutes") % 60;
  return padWithZeros(minutes, 2);
}
function getRemainHours(nowDayjs, timestamDays) {
  const hours = timestamDays.diff(nowDayjs, "hours") % 60;
  return padWithZeros(hours, 2);
}
function getRemainDays(nowDayjs, timestamDays) {
  const days = timestamDays.diff(nowDayjs, "days");
  return days.toString();
}

function padWithZeros(number, length) {
  const numberString = number.toString();
  if (numberString.length >= length) return numberString;
  return "0".repeat(length - numberString.length) + numberString;
}

export const getCountdown = () => {
  //   let today = new Date().getTime()
  let targetDay = new Date(2023, 9, 8, 25);
  let today = new Date().getTime();
  let timeCount = targetDay - today; //convert milliseconds to seconds
  let sec = 1000;
  let min = sec * 60;
  let hour = min * 60;
  let day = hour * 24;
  // 1 day = 24 hours = 24 * 60 mins = 24 * 60 * 60 sec

  let days = Math.floor(timeCount / day); //convert seconds to days
  let hours = Math.floor((timeCount % day) / hour); //convert seconds to hours
  let minutes = Math.floor((timeCount % hour) / min); //convert seconds to min
  let seconds = Math.floor((timeCount % min) / sec); //convert seconds to milliseconds

  return [
    padWithZeros(days, 2),
    padWithZeros(hours, 2),
    padWithZeros(minutes, 2),
    padWithZeros(seconds, 2),
  ];
};
