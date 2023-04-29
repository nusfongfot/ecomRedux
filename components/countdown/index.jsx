import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./count.module.scss";
import { calculateDiff, getCountdown } from "./utils";

function CountDown() {
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  useEffect(() => {
    const intervalTask = setInterval(() => {
      const [days, hours, minutes, seconds] = getCountdown();
      setCountDown({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }, 1000);
    return () => clearInterval(intervalTask);
  }, []);

  return (
    <Box className={styles.countdown}>
      <Box component="span">{countDown.days}</Box>
      <b>:</b>
      <Box component="span">{countDown.hours}</Box>

      <b>:</b>
      <Box component="span">{countDown.minutes}</Box>

      <b>:</b>
      <Box component="span">{countDown.seconds}</Box>
    </Box>
  );
}
export default CountDown;
