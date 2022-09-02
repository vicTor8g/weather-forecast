const textTimeString = document.querySelector('.content-text-time');

const newDate = new Date();

const currentHour = newDate.getHours();
const currentMinute = newDate.getMinutes();

const currentWeekDay = newDate.getDay();
const currentMonth = newDate.getMonth();
const currentMonthDay = newDate.getDate();
const currentYear = newDate.getFullYear();

const allWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

textTimeString.innerHTML = `
    ${currentHour}:${currentMinute} - ${allWeekDays[currentWeekDay]}, ${currentMonthDay} ${allMonths[currentMonth]} ${currentYear}'`;