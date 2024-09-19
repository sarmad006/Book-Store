import React, { useState, useEffect } from 'react';

function TimeLeft({ date }) {
  const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now:number = Date.now();
      const futureTime = new Date(date);
      futureTime.setTime(futureTime.getTime() + parseInt(process.env.NEXT_PUBLIC_PENALTY_TIME) )
      const difference: number = futureTime.getTime() - now;
      const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setRemainingTime({ days: remainingDays, hours: remainingHours });
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [date]);

  return (
    <div>
      <span className='text-red-600 font-semibold'>{`${remainingTime.days < 0 ? "Penalty Added" : `${remainingTime.days} days ${remainingTime.hours} hours`}`}</span>
    </div>
  );
}

export default TimeLeft;
