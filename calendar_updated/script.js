// DOM Elements
const calendarGrid = document.getElementById("calendar-grid");
const eventList = document.getElementById("event-list");
const addEventBtn = document.getElementById("add-event-btn");
const eventModal = document.getElementById("event-modal");
const closeModal = document.getElementById("close-modal");
const saveEventBtn = document.getElementById("save-event-btn");

const eventNameInput = document.getElementById("event-name");
const eventDateInput = document.getElementById("event-date");

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
document.getElementById('current-year').innerText = `${monthNames[currentMonth]} ${currentYear}`;

let events = [];

// Event modal handling
addEventBtn.addEventListener("click", () => {
    eventModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
    eventModal.classList.add("hidden");
});

saveEventBtn.addEventListener("click", () => {
    const eventName = eventNameInput.value;
    const eventDate = eventDateInput.value;

    if (eventName && eventDate) {
        events.push({ name: eventName, date: eventDate });
        updateEventList();
        eventModal.classList.add("hidden");
        eventNameInput.value = '';
        eventDateInput.value = '';
    }
});

// Render the event list
function updateEventList() {
    eventList.innerHTML = '';
    events.forEach(event => {
        const li = document.createElement('li');
        li.innerText = `${event.name} - ${event.date}`;
        eventList.appendChild(li);
    });
}

// Populate calendar grid
function populateCalendar() {
    calendarGrid.innerHTML = '';
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.innerText = i;
        dayCell.addEventListener('click', () => {
            eventDateInput.value = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
            eventModal.classList.remove("hidden");
        });
        calendarGrid.appendChild(dayCell);
    }
}

populateCalendar();

// Handle Month Change
document.getElementById("prev-month").addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    document.getElementById('current-year').innerText = `${monthNames[currentMonth]} ${currentYear}`;
    populateCalendar();
});

document.getElementById("next-month").addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    document.getElementById('current-year').innerText = `${monthNames[currentMonth]} ${currentYear}`;
    populateCalendar();
});
