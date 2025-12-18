import React, { useState } from 'react';
import { Calendar, Download } from 'lucide-react';

const CalendarGenerator = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDay, setStartDay] = useState(0);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Modified Dupont schedule pattern (28 days total)
  const dupontPattern = [
    // 4 nights (days 1-4)
    'N', 'N', 'N', 'N',
    // 3 off (days 5-7)
    'O', 'O', 'O',
    // 3 days (days 8-10)
    'D', 'D', 'D',
    // 1 off (day 11)
    'O',
    // 3 nights (days 12-14)
    'N', 'N', 'N',
    // 3 off (days 15-17)
    'O', 'O', 'O',
    // 4 days (days 18-21)
    'D', 'D', 'D', 'D',
    // Relief week (days 22-26, M-F 9-5)
    'R', 'R', 'R', 'R', 'R',
    // Off week (days 27-28, weekend of relief)
    'O', 'O'
  ];

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

  const generateCalendar = () => {
    setShowCalendar(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const maxDays = Math.max(...monthNames.map((_, i) => getDaysInMonth(year, i)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Control Panel - Hidden when printing */}
      <div className="print:hidden bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={28} />
              <h1 className="text-2xl font-bold text-gray-800">Calendar Generator</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="year" className="text-sm font-medium text-gray-700">
                  Year:
                </label>
                <input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1900"
                  max="2100"
                />
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="startDay" className="text-sm font-medium text-gray-700">
                  Jan 1 is day:
                </label>
                <select
                  id="startDay"
                  value={startDay}
                  onChange={(e) => setStartDay(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {dupontPattern.map((shift, index) => (
                    <option key={index} value={index}>
                      Day {index + 1} ({shift === 'N' ? 'Night' : shift === 'D' ? 'Day' : shift === 'R' ? 'Relief' : 'Off'})
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={generateCalendar}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Generate
              </button>
              
              {showCalendar && (
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Download size={18} />
                  Print/Save PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Display */}
      {showCalendar && (
        <div className="p-8 print:p-0">
          <div className="bg-white print:bg-white max-w-full mx-auto print:max-w-none">
            {/* Title - Centered for print */}
            <h2 className="text-3xl font-bold text-center mb-6 print:mb-4 print:text-4xl">
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
                        className="border-2 border-gray-800 bg-gray-100 p-2 text-sm font-bold text-gray-700 print:text-base"
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
                                className="border-2 border-gray-800 p-2 bg-gray-200 print:bg-gray-200"
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
                              className={`border-2 border-gray-800 p-2 text-left text-xs print:text-xs h-8 ${
                                isWeekend ? 'bg-blue-50 print:bg-blue-50' : ''
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
      )}

      {!showCalendar && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-gray-600 text-lg">
              Select a year and click "Generate" to create your calendar
            </p>
          </div>
        </div>
      )}

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
  );
};

export default CalendarGenerator;