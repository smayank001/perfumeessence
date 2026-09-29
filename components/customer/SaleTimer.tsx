"use client";
import React, { useState, useEffect } from 'react';

const SaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Set target to 12:00 AM of the next day
      const tonight = new Date();
      tonight.setHours(24, 0, 0, 0); 

      const diff = tonight.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    // Run immediately then start interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
      <div className="space-y-0.5">
        <p className="text-red-600 font-bold text-sm uppercase tracking-tight flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          Limited Time Offer
        </p>
        <p className="text-zinc-500 text-[11px] font-medium">Sale ends at midnight!</p>
      </div>
      
      <div className="flex gap-1.5">
        {[
          { label: 'Hrs', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes }, // Note: fixed variable reference below
          { label: 'Sec', value: timeLeft.seconds }
        ].map((unit, idx) => (
           <div key={idx} className="flex flex-col items-center">
              <div className="bg-white border border-zinc-200 w-10 h-10 flex items-center justify-center rounded-lg shadow-sm">
                <span className="font-bold text-lg text-zinc-800 tabular-nums">
                   {unit.label === 'Hrs' ? format(timeLeft.hours) : 
                    unit.label === 'Min' ? format(timeLeft.minutes) : 
                    format(timeLeft.seconds)}
                </span>
              </div>
              <span className="text-[10px] mt-1 uppercase text-zinc-400 font-bold tracking-tighter">{unit.label}</span>
           </div>
        ))}
      </div>
    </div>
  );
};

export default SaleTimer;