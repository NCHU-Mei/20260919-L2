/**
 * Personal Horizon - Real-Time Dashboard Logic
 * Handles precision clock updates, name personalization with localStorage,
 * time-of-day greetings, theme management, and desk-clock zen mode.
 */

(function () {
  'use strict';

  // --- DOM Elements ---
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const periodIndicator = document.getElementById('period-indicator');
  const secondsProgressFill = document.getElementById('seconds-progress-fill');
  
  const greetingIcon = document.getElementById('greeting-icon');
  const greetingText = document.getElementById('greeting-text');
  
  const userNameEl = document.getElementById('user-name');
  const nameContainer = document.getElementById('name-container');
  const editNameBtn = document.getElementById('edit-name-btn');
  const nameEditBox = document.getElementById('name-edit-box');
  const nameInput = document.getElementById('name-input');
  const saveNameBtn = document.getElementById('save-name-btn');
  const cancelNameBtn = document.getElementById('cancel-name-btn');

  const calendarDateEl = document.getElementById('calendar-date');
  const dayOfYearPill = document.getElementById('day-of-year-pill');
  const weekNumberPill = document.getElementById('week-number-pill');
  const yearProgressPill = document.getElementById('year-progress-pill');
  const timezoneBadge = document.getElementById('timezone-badge');
  const personalMottoEl = document.getElementById('personal-motto');

  const formatToggleBtn = document.getElementById('format-toggle-btn');
  const formatLabel = document.getElementById('format-label');
  const themeMenuBtn = document.getElementById('theme-menu-btn');
  const currentThemeLabel = document.getElementById('current-theme-label');
  const themeDropdown = document.getElementById('theme-dropdown');
  const zenModeBtn = document.getElementById('zen-mode-btn');

  // --- State Configuration ---
  const STORAGE_KEYS = {
    NAME: 'personal_horizon_name',
    FORMAT_24H: 'personal_horizon_24h',
    THEME: 'personal_horizon_theme',
    MOTTO: 'personal_horizon_motto'
  };

  let is24Hour = localStorage.getItem(STORAGE_KEYS_FORMAT()) === 'true';
  let currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'aurora';
  let userName = localStorage.getItem(STORAGE_KEYS.NAME) || 'Explorer';
  let userMotto = localStorage.getItem(STORAGE_KEYS.MOTTO) || 
    '"The future belongs to those who build it with precision and presence."';

  function STORAGE_KEYS_FORMAT() {
    return STORAGE_KEYS.FORMAT_24H;
  }

  // --- Initialize Application ---
  function init() {
    initTheme(currentTheme);
    initName();
    initMotto();
    initTimezone();
    updateClock();
    
    // Ticking interval: exactly on the second
    setInterval(updateClock, 1000);

    setupEventListeners();
  }

  // --- Clock & Greeting Logic ---
  function updateClock() {
    const now = new Date();

    const rawHours = now.getHours();
    const rawMinutes = now.getMinutes();
    const rawSeconds = now.getSeconds();

    // Format Hours & AM/PM
    let displayHours = rawHours;
    let period = '';

    if (!is24Hour) {
      period = rawHours >= 12 ? 'PM' : 'AM';
      displayHours = rawHours % 12;
      displayHours = displayHours ? displayHours : 12; // 0 becomes 12
      periodIndicator.style.display = 'inline-block';
      periodIndicator.textContent = period;
      formatLabel.textContent = '12H';
    } else {
      periodIndicator.style.display = 'none';
      formatLabel.textContent = '24H';
    }

    hoursEl.textContent = String(displayHours).padStart(2, '0');
    minutesEl.textContent = String(rawMinutes).padStart(2, '0');
    secondsEl.textContent = String(rawSeconds).padStart(2, '0');

    // Progress bar for current minute
    const minutePercent = ((rawSeconds / 60) * 100).toFixed(1);
    secondsProgressFill.style.width = `${minutePercent}%`;

    // Dynamic greeting based on current hour
    updateGreeting(rawHours);

    // Update Date and Calendar Insights
    updateCalendarMetrics(now);
  }

  function updateGreeting(hours) {
    let phrase = 'Hello,';
    let icon = '✨';

    if (hours >= 5 && hours < 12) {
      phrase = 'Good morning,';
      icon = '🌅';
    } else if (hours >= 12 && hours < 17) {
      phrase = 'Good afternoon,';
      icon = '☀️';
    } else if (hours >= 17 && hours < 22) {
      phrase = 'Good evening,';
      icon = '🌆';
    } else {
      phrase = 'Good night,';
      icon = '🌙';
    }

    greetingText.textContent = phrase;
    greetingIcon.textContent = icon;
  }

  function updateCalendarMetrics(now) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    calendarDateEl.textContent = now.toLocaleDateString(undefined, options);

    // Day of Year
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
    const isLeap = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || (now.getFullYear() % 400 === 0);
    const totalDays = isLeap ? 366 : 365;
    dayOfYearPill.textContent = `Day ${dayOfYear} of ${totalDays}`;

    // ISO Week Number
    const target = new Date(now.valueOf());
    const dayNr = (now.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);
    weekNumberPill.textContent = `Week ${weekNumber}`;

    // Year Progress
    const yearProgress = ((dayOfYear / totalDays) * 100).toFixed(1);
    yearProgressPill.textContent = `${yearProgress}% of ${now.getFullYear()}`;
  }

  function initTimezone() {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offsetMinutes = new Date().getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
      const offsetRemainderMinutes = Math.abs(offsetMinutes % 60);
      const sign = offsetMinutes <= 0 ? '+' : '-';
      const offsetString = `UTC${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetRemainderMinutes).padStart(2, '0')}`;
      
      timezoneBadge.textContent = `${offsetString} (${timeZone})`;
    } catch (e) {
      timezoneBadge.textContent = 'Local Time';
    }
  }

  // --- Name Personalization ---
  function initName() {
    userNameEl.textContent = userName;
    nameInput.value = userName;
  }

  function showNameEdit() {
    nameContainer.style.display = 'none';
    nameEditBox.style.display = 'flex';
    nameInput.value = userName;
    nameInput.focus();
    nameInput.select();
  }

  function hideNameEdit() {
    nameEditBox.style.display = 'none';
    nameContainer.style.display = 'inline-flex';
  }

  function saveName() {
    const trimmed = nameInput.value.trim();
    if (trimmed) {
      userName = trimmed;
      localStorage.setItem(STORAGE_KEYS.NAME, userName);
      userNameEl.textContent = userName;
    }
    hideNameEdit();
  }

  // --- Custom Motto ---
  function initMotto() {
    personalMottoEl.textContent = userMotto;
  }

  function editMotto() {
    const updated = prompt('Enter your personal motto or inspiring phrase:', userMotto.replace(/^"|"$/g, ''));
    if (updated !== null && updated.trim()) {
      userMotto = `"${updated.trim()}"`;
      localStorage.setItem(STORAGE_KEYS.MOTTO, userMotto);
      personalMottoEl.textContent = userMotto;
    }
  }

  // --- Theme Management ---
  const THEME_LABELS = {
    aurora: 'Aurora',
    cyberpunk: 'Cyberpunk',
    sunset: 'Sunset',
    minimal: 'Minimal'
  };

  function initTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    currentThemeLabel.textContent = THEME_LABELS[theme] || 'Theme';

    // Highlight active option in dropdown
    document.querySelectorAll('.theme-opt').forEach(opt => {
      if (opt.getAttribute('data-theme-val') === theme) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  }

  // --- Zen Mode ---
  function toggleZenMode() {
    document.body.classList.toggle('zen-mode');
  }

  // --- Event Listeners Setup ---
  function setupEventListeners() {
    // 12h/24h toggle
    formatToggleBtn.addEventListener('click', () => {
      is24Hour = !is24Hour;
      localStorage.setItem(STORAGE_KEYS_FORMAT(), is24Hour);
      updateClock();
    });

    // Name editing
    nameContainer.addEventListener('click', showNameEdit);
    editNameBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNameEdit();
    });
    saveNameBtn.addEventListener('click', saveName);
    cancelNameBtn.addEventListener('click', hideNameEdit);
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveName();
      if (e.key === 'Escape') hideNameEdit();
    });

    // Motto editing
    personalMottoEl.addEventListener('click', editMotto);

    // Theme dropdown
    themeMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('open');
    });

    document.querySelectorAll('.theme-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-theme-val');
        initTheme(selected);
        themeDropdown.classList.remove('open');
      });
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!themeDropdown.contains(e.target) && e.target !== themeMenuBtn) {
        themeDropdown.classList.remove('open');
      }
    });

    // Zen mode toggle
    zenModeBtn.addEventListener('click', toggleZenMode);

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Avoid firing shortcuts when typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
      }

      if (e.key === 't' || e.key === 'T') {
        formatToggleBtn.click();
      } else if (e.key === 'z' || e.key === 'Z') {
        toggleZenMode();
      } else if (e.key === 'Escape' && document.body.classList.contains('zen-mode')) {
        document.body.classList.remove('zen-mode');
      }
    });
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
