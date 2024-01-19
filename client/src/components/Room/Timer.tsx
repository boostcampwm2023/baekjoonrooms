import { useCallback, useEffect, useState } from 'react';

interface TimerProps {
  endTime: number; // 서버에서 받아온 endTime
}

export default function Timer({ endTime }: TimerProps) {
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date().getTime();
    const timeRemaining = endTime - now;

    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    return {
      hours,
      minutes,
      seconds,
    };
  }, [endTime]);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining();
      setTimeRemaining(newTimeRemaining);

      // 남은 시간이 0초면 타이머 멈춤
      if (
        newTimeRemaining.hours === 0 &&
        newTimeRemaining.minutes === 0 &&
        newTimeRemaining.seconds === 0
      ) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [calculateTimeRemaining]);

  return (
    <span>
      {timeRemaining.hours === 0 &&
      timeRemaining.minutes === 0 &&
      timeRemaining.seconds === 0 ? (
        <span> Time Over </span>
      ) : (
        <span>{`${timeRemaining.hours} : ${timeRemaining.minutes} : ${timeRemaining.seconds}`}</span>
      )}
    </span>
  );
}
