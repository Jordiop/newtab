// Clock Module - Analog and Digital Clock Management
import { config } from '../config/constants.js';
import { getCurrentLanguage } from './ui.js';
import { currentSettings } from './settings.js';

export function applyClockType(clockType) {
  const analogClock = document.getElementById("analog-clock");
  const digitalClock = document.getElementById("digital-clock");

  if (clockType === "digital") {
    if (analogClock) analogClock.style.display = "none";
    if (digitalClock) digitalClock.style.display = "block";
  } else {
    if (analogClock) analogClock.style.display = "block";
    if (digitalClock) digitalClock.style.display = "none";
  }
}

function updateClock() {
  const clockType = currentSettings.clockType || "analog";

  if (clockType === "digital") {
    updateDigitalClock();
  } else {
    updateAnalogClock();
  }
}

function updateAnalogClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  const hourHand = document.querySelector(".hour");
  const minuteHand = document.querySelector(".minute");
  const secondHand = document.querySelector(".second");

  if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
  if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  if (secondHand) secondHand.style.transform = `rotate(${secondAngle}deg)`;
}

function updateDigitalClock() {
  const now = new Date();
  const timeElement = document.getElementById("digital-time");
  const dateElement = document.getElementById("digital-date");

  if (timeElement) {
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  if (dateElement) {
    const currentLang = getCurrentLanguage();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const locale = currentLang === 'en' ? 'en-US' :
                   currentLang === 'es' ? 'es-ES' :
                   currentLang === 'ca' ? 'ca-ES' : 'en-US';
    const dateString = now.toLocaleDateString(locale, options);
    dateElement.textContent = dateString;
  }
}

export function startClock() {
  updateClock();
  setInterval(updateClock, config.clockUpdateInterval);
}
