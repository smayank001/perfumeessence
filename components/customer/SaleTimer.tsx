'use client';

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

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-4 flex items-center justify-between shadow-sm font-serif select-none">
      <div className="space-y-0.5 pr-2">
        <p className="text-[#C8A45D] text-[11px] uppercase tracking-[0.2em] font-normal flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] inline-block animate-pulse" />
          Limited Reserve Edition
        </p>
        <p className="text-[#6E6472] text-xs font-normal">Complimentary luxury gift with orders today</p>
      </div>

      <div className="flex gap-1.5">
        {[
          { label: 'Hrs', value: format(timeLeft.hours) },
          { label: 'Min', value: format(timeLeft.minutes) },
          { label: 'Sec', value: format(timeLeft.seconds) },
        ].map((unit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="bg-[#F5F0F7] border border-[#D8CEDA] w-9 h-9 flex items-center justify-center">
              <span className="text-sm font-normal text-[#21132F] tabular-nums">
                {unit.value}
              </span>
            </div>
            <span className="text-[8px] mt-1 uppercase text-[#68447F] tracking-widest">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleTimer;