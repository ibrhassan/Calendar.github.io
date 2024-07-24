let Month = document.querySelector('.Month');
const months_arr = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

let Year = document.querySelector('.Year');

let mon = new Date();
const today = new Date();

function lastDay(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function lastDay_index(month) {
    let currentDate = new Date();
    currentDate.setMonth(month - 1);
    currentDate.setDate(lastDay(currentDate.getFullYear(), month - 1));
    return currentDate.getDay();
}

function DaysinMonth(month) {
    let arr = [];
    let array_index = lastDay_index(month);
    let last_month = lastDay(mon.getFullYear(), month - 1);
    let curr_month = lastDay(mon.getFullYear(), month);
    for (let i = 0; i <= array_index; i++) {
        arr[i] = { day: last_month - array_index + i, class: 'prev-month' };
    }
    let index = 1;
    for (let i = array_index + 1; i <= curr_month + array_index + 1; i++) {
        let dayClass = 'current-month';
        if (mon.getFullYear() === today.getFullYear() && mon.getMonth() === today.getMonth() && index === today.getDate()) {
            dayClass = 'today';
        }
        arr[i] = { day: index, class: dayClass };
        index++;
    }
    index = 1;
    for (let i = curr_month + array_index + 1; i < 42; i++) {
        arr[i] = { day: index, class: 'next-month' };
        index++;
    }
    return arr;
}

function populateTable(month) {
    Month.textContent = months_arr[month];
    Year.textContent = mon.getFullYear();
    const daysArray = DaysinMonth(month);
    const tableBody = document.querySelector('#days table tbody');
    tableBody.innerHTML = '';
    for (let i = 0; i < daysArray.length; i += 7) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            const day = daysArray[i + j];
            cell.textContent = day.day;
            cell.classList.add(day.class);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

document.getElementById('prevMonth').addEventListener('click', function() {
    mon.setMonth(mon.getMonth() - 1);
    populateTable(mon.getMonth());
});

document.getElementById('nextMonth').addEventListener('click', function() {
    mon.setMonth(mon.getMonth() + 1);
    populateTable(mon.getMonth());
});

populateTable(mon.getMonth());
