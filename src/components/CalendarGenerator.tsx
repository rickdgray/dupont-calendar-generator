import { useState, useEffect } from 'react';
import { Calendar, Download, Moon, Sun } from 'lucide-react';

const CalendarGenerator = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDay, setStartDay] = useState(0);
  const [darkMode, setDarkMode] = useState<'light' | 'dark' | 'system'>('system');
  const [effectiveDarkMode, setEffectiveDarkMode] = useState(false);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dupontPattern = [
    'N', 'N', 'N', 'N', 'O', 'O', 'O',
    'D', 'D', 'D', 'O', 'N', 'N', 'N',
    'O', 'O', 'O', 'D', 'D', 'D', 'D',
    'R', 'R', 'R', 'R', 'R', 'R', 'R',
    'O', 'O', 'O', 'O', 'O', 'O', 'O'
  ];

  useEffect(() => {
    const updateDarkMode = () => {
      if (darkMode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setEffectiveDarkMode(isDark);
      } else {
        setEffectiveDarkMode(darkMode === 'dark');
      }
    };

    updateDarkMode();

    if (darkMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateDarkMode);
      return () => mediaQuery.removeEventListener('change', updateDarkMode);
    }
  }, [darkMode]);

  const cycleDarkMode = () => {
    setDarkMode(current => {
      if (current === 'system') return 'light';
      if (current === 'light') return 'dark';
      return 'system';
    });
  };

  const getDupontShift = (dayOfYear: number, startDayIndex: number) => {
    const adjustedDay = (dayOfYear - 1 + startDayIndex) % dupontPattern.length;
    return dupontPattern[adjustedDay];
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayOfYear = (year: number, month: number, day: number) => {
    const start = new Date(year, 0, 0);
    const diff = new Date(year, month, day).getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const handlePrint = () => {
    window.print();
  };

  const maxDays = Math.max(...monthNames.map((_, i) => getDaysInMonth(year, i)));

  return (
    <div className={effectiveDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Control Panel - Hidden when printing */}
        <div className="print:hidden bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-10 transition-colors">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600 dark:text-blue-400" size={28} />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dupont Calendar Generator</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={cycleDarkMode}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title={`Theme: ${darkMode}`}
                >
                  {darkMode === 'system' && (
                    <div className="relative w-6 h-6">
                      <Sun className="absolute text-gray-700 dark:text-gray-300" size={20} />
                      <Moon className="absolute text-gray-700 dark:text-gray-300 opacity-50" size={20} style={{ transform: 'translate(6px, 6px) scale(0.7)' }} />
                    </div>
                  )}
                  {darkMode === 'light' && <Sun className="text-gray-700 dark:text-gray-300" size={20} />}
                  {darkMode === 'dark' && <Moon className="text-gray-700 dark:text-gray-300" size={20} />}
                </button>

                <div className="flex items-center gap-2">
                  <label htmlFor="year" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Year:
                  </label>
                  <input
                    id="year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
                    className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    min="1900"
                    max="2100"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="startDay" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Jan 1 is 
                  </label>
                  <select
                    id="startDay"
                    value={startDay}
                    onChange={(e) => setStartDay(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    {dupontPattern.map((shift, index) => (
                      <option key={index} value={index}>
                        Day {index + 1} ({shift === 'N' ? 'Night' : shift === 'D' ? 'Day' : shift === 'R' ? 'Relief' : 'Off'})
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
                >
                  <Download size={18} />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Display */}
        <div className="p-8 print:p-0">
          <div className="bg-white dark:bg-gray-800 print:bg-white max-w-full mx-auto print:max-w-none transition-colors">
            {/* Title - Centered for print */}
            <h2 className="text-3xl font-bold text-center mb-6 print:mb-4 print:text-4xl text-gray-900 dark:text-gray-100 print:text-gray-900">
              {year} Calendar
            </h2>
            
            {/* Calendar Table */}
            <div className="overflow-x-auto print:overflow-visible">
              <table className="w-full border-collapse table-fixed" style={{ pageBreakInside: 'avoid' }}>
                <thead>
                  <tr>
                    {monthNames.map((month) => (
                      <th
                        key={month}
                        className="border-2 border-gray-800 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 p-2 text-sm font-bold text-gray-700 dark:text-gray-200 print:text-base print:bg-gray-100 print:border-gray-800 print:text-gray-700"
                      >
                        {month}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: maxDays }, (_, dayIndex) => {
                    const dayNumber = dayIndex + 1;
                    return (
                      <tr key={dayNumber}>
                        {monthNames.map((_, monthIndex) => {
                          const daysInMonth = getDaysInMonth(year, monthIndex);
                          const isValidDay = dayNumber <= daysInMonth;
                          
                          if (!isValidDay) {
                            return (
                              <td
                                key={monthIndex}
                                className="border-2 border-gray-800 dark:border-gray-600 p-2 bg-gray-200 dark:bg-gray-900 print:bg-gray-200 print:border-gray-800"
                              />
                            );
                          }
                          
                          const date = new Date(year, monthIndex, dayNumber);
                          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })[0];
                          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                          const dayOfYear = getDayOfYear(year, monthIndex, dayNumber);
                          const shift = getDupontShift(dayOfYear, startDay);
                          
                          return (
                            <td
                              key={monthIndex}
                              className={`border-2 border-gray-800 dark:border-gray-600 p-2 text-left text-xs print:text-xs h-8 print:border-gray-800 dark:bg-gray-800 dark:text-gray-100 print:bg-white print:text-gray-900 ${
                                isWeekend ? 'bg-blue-50 dark:bg-blue-900/30 print:bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex items-center gap-1">
                                <span className="font-medium w-5">{dayNumber}</span>
                                <span className="font-medium w-3">{dayOfWeek}</span>
                                {shift !== 'O' && <span className="font-bold w-3">{shift}</span>}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Print Styles */}
        <style>{`
          @media print {
            @page {
              size: landscape;
              margin: 0.5cm;
            }
            
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            
            table {
              font-size: 10px;
            }
            
            th, td {
              padding: 4px !important;
            }
            
            td {
              height: 0.4cm !important;
              min-height: 0.4cm !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CalendarGenerator;