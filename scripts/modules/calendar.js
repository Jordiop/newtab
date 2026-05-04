// Calendar Widget Module
import { getCurrentTranslations } from './ui.js';

let currentDate = new Date();
let calendarContainer = null;

export function renderCalendar(container) {
  calendarContainer = container;
  draw();
}

export function refreshCalendarTranslations() {
  if (calendarContainer) {
    draw();
  }
}

function draw() {
  const t = getCurrentTranslations();
  const months = t.calendarMonths || ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = t.calendarDays || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  // First day of month (0=Sun, adjust to Mon-based)
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = (firstDay + 6) % 7; // Monday-based offset
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = `
    <div class="calendar-header">
      <button class="calendar-nav" id="calendar-prev" aria-label="Previous month">
        <i class="fas fa-chevron-left"></i>
      </button>
      <span class="calendar-title">${months[month]} ${year}</span>
      <button class="calendar-nav" id="calendar-next" aria-label="Next month">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="calendar-days-header">
      ${days.map(d => `<span>${d}</span>`).join("")}
    </div>
    <div class="calendar-grid">
  `;

  // Empty cells before first day
  for (let i = 0; i < startOffset; i++) {
    html += `<span class="calendar-day empty"></span>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    html += `<span class="calendar-day${isToday ? " today" : ""}">${d}</span>`;
  }

  html += `</div>`;
  calendarContainer.innerHTML = html;

  // Attach nav listeners
  calendarContainer.querySelector("#calendar-prev").addEventListener("click", () => navigateMonth(-1));
  calendarContainer.querySelector("#calendar-next").addEventListener("click", () => navigateMonth(1));
}

function navigateMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  draw();
}
