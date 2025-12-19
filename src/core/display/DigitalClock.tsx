import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa6";

export const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brand-900 hidden items-center justify-center border-b border-slate-800 p-4 sm:flex xl:border-r xl:border-b-0">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-slate-800 p-3 text-blue-500">
          <FaClock className="h-4 w-4" />
        </div>
        <div>
          <p className="font-mono text-lg font-bold tracking-widest text-white">
            {time.toLocaleTimeString("en-US", {
              hour12: true,
              minute: "2-digit",
              hour: "numeric",
            })}
          </p>
          <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
            {time.toLocaleDateString("es-VE", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
