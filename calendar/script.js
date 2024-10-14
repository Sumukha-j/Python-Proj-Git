document.addEventListener("DOMContentLoaded", function() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const currentDate = new Date();
    const yearElement = document.getElementById('current-year');
    const monthElement = document.getElementById('current-month');
    const dayElement = document.getElementById('current-day');
    
    yearElement.textContent = currentDate.getFullYear();
    monthElement.textContent = monthNames[currentDate.getMonth()];
    dayElement.textContent = currentDate.getDate();
});
