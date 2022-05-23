const statContainer = document.querySelector('.stat');
let today = new Date().getDay() - 1;
if (today === -1) today = 6;
let windowWidth = window.innerWidth;
let constant = windowWidth > 375 ? 8 : 7;

//functions
const fetchApi = async () => {
    try {
        let response = await fetch('./data.json');
        let stat_data = await response.json();
        renderStat(stat_data);
    } catch (error) {
        console.log(error);
    }
}
const renderStat = (stat_data) => {
    stat_data.map(({
        day,
        amount
    }, id) => {
        component(amount, day, id);
    })
}
const component = (amount, date, id) => {
    let stat_item = document.createElement('li');
    let day = document.createElement('p');
    let bar = document.createElement('div');
    let expense_amount = document.createElement('span');
    stat_item.className = 'stat-item';
    id === today && stat_item.classList.add('active');
    day.className = 'day';
    day.innerHTML = `${date}`;
    bar.className = 'bar';
    bar.style.height = `${amount / constant}em`;
    expense_amount.className = 'amount';
    expense_amount.innerHTML = `$${amount}`;
    stat_item.appendChild(expense_amount);
    stat_item.appendChild(bar);
    stat_item.appendChild(day);
    statContainer.appendChild(stat_item);
}

window.addEventListener('load', fetchApi);