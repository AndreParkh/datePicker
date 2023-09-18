import { useState } from "react";
import "./scss/styles.css";

import { Calendar } from "./components/Calendar";
import { CalendarIcon } from "./components/Icon";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isShownCalendar, setIsShownCalendar] = useState(false);

  return (
    <div className="App">
      <div className="calendar">
        {isShownCalendar && (
          <Calendar
            selectedDate={selectedDate}
            selectDate={(date) => setSelectedDate(date)}
          />
        )}
        <button
          onClick={() => {
            setIsShownCalendar(!isShownCalendar);
            if (isShownCalendar) setSelectedDate(new Date());
          }}
          className={[
            "btnShowCalendar",
            isShownCalendar ? "btnShowCalendar__active" : "",
          ].join(" ")}
        >
          <CalendarIcon />
        </button>
      </div>
    </div>
  );
}
export default App;
