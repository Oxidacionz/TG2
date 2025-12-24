import { useState } from "react";
import { FaBell } from "react-icons/fa";

import { Notification } from "@/types";

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications: Notification[] = [];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
      >
        <FaBell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="animate-fade-in-down absolute right-0 z-20 mt-2 w-72 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-xl dark:border-slate-700 dark:bg-slate-800">
            <div className="border-b border-slate-200 px-4 py-2 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Notificaciones
              </h3>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-slate-500">
                  <p>No hay notificaciones en este momento.</p>
                </div>
              ) : (
                notifications.map((note, idx) => (
                  <div
                    key={idx}
                    className="border-b border-slate-100 px-4 py-3 last:border-0 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50"
                  >
                    <p className="text-sm text-slate-800 dark:text-white">
                      {note.content}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Hace un momento
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
