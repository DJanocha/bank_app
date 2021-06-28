'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Daniel Janocha',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-06-25T17:01:17.194Z',
    '2021-06-26T23:36:17.929Z',
    '2021-06-27T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pl-PL', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////




//functions:

const getFinalBalance = movements => movements.reduce((acc, mov) => acc + mov)

const generateUsername = username => "".concat(username)
  .replace('-', ' ')
  .toLowerCase().split(' ')
  .map(word => word[0])
  .join('');



const createUsernames = accs => {
  accs.forEach(acc => { acc.username = generateUsername(acc.owner) });
}
const transferMoney = () => {
  let amount = Number(inputTransferAmount.value);
  let dest = inputTransferTo.value;
  if (amount > 0 && amount <= currentUser.balance && accounts.find(acc => acc.username === dest)) {
    const findresult = accounts.find(acc => acc.username === dest)

    //add movement to curr user (negative value) and give new timestamp to curr user 
    currentUser.movements.push(0 - amount);//
    currentUser.movementsDates.push(new Date().toISOString())
    // //add movement to destination user (positive value)and give new timestamp to other  user 
    findresult.movements.push(amount)
    findresult.movementsDates.push(new Date().toISOString())


    updateUI(currentUser);
  }
  inputTransferAmount.value = inputTransferTo.value = ''; //whether transfer was successful or not, we have to clean those input fields and ...
  inputTransferAmount.blur(); //and get the focus out of this one
}

createUsernames(accounts);
// update visual data:
function hideUI() {
  containerApp.style.opacity = 0;
}
function updateUI(user) {
  displayMovements(user)
  displaySummary(user);
  displayBalance(user);
  displayCurrentDate();
  displayCurrentDate();
}

function renderDate(construct, locale) {
  const now = new Date(construct);
  return new Intl.DateTimeFormat(locale).format(now);
  // const year = now.getFullYear();
  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const day = `${now.getDate()}`.padStart(2, 0);
  // const hour = `${now.getHours()}`.padStart(2, 0);
  // const minutes = `${now.getMinutes()}`.padStart(2, 0);
  // return `${day}/${month}/${year} ${hour}:${minutes}`
}
function displayCurrentDate() {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric', //or e.g. '2-digit'
    month: 'long', //or e.g. '2-digit'/ 'short'
    day: 'numeric', //or e.g. '2-digit',
    weekday: 'long' // or e.g. 'short'/ 'narrow'
  }
  // labelDate.textContent=`As of ${renderDate
  // (now)}`
  // const userLocale = navigator.locale
  labelDate.textContent = `As of ${new Intl.DateTimeFormat(currentUser.locale, options).format(now)}`
}
function when(date, locale) {
  console.log('in when')
  const now = new Date();
  const then = new Date(date);
  const daysBetween = (before, after) => {
    return Math.floor(Math.abs((before - after) / (1000 * 3600 * 24)))
  }
  const diff = daysBetween(then, now);
  let answer = '';
  if (diff < 0) answer = 'not yet'
  else if (diff === 0) answer = 'today'
  else if (diff === 1) answer = 'yesterday'
  else if (diff < 8) answer = `${diff} days ago`
  else answer = renderDate(then, locale);
  return answer;
}
function displayMovements(account, sort = false) {
  const sortedMovements = sort ? account.movements.splice().sort((a, b) => a - b) : account.movements;
  containerMovements.innerHTML = ''; // clean hardcoded html made (the skeleton on which we based that contained both  movement types)
  for (const [index, value] of Object.entries(sortedMovements)) {
    const type = value < 0 ? 'withdrawal' : 'deposit'
    const movementsString = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${+index + 1} ${type}</div>
      <div class="movements__date">${when(account.movementsDates[index], account.locale)}</div>
      <div class="movements__value">${value + "€"}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', movementsString);
  }
}
const displaySummary = user => {
  const sumIn = user.movements.filter(el => el > 0).reduce((acc, item) => acc + item);
  const sumOut = user.movements.filter(el => el < 0).reduce((acc, item) => acc + item);
  const interest = user.movements.filter(el => el > 0).map(dep => dep * user.interestRate * 0.01).filter(int => int >= 1).reduce((acc, item) => acc + item);
  labelSumIn.textContent = sumIn + "€";
  labelSumOut.textContent = Math.abs(sumOut) + "€";
  labelSumInterest.textContent = interest + "€";
}
function displayBalance(account) {
  account.balance = getFinalBalance(account.movements);
  labelBalance.textContent = account.balance + "€"
}
function handleSorting(container) {
  if (typeof (handleSorting.sortedDesc) === undefined)
    handleSorting.sortedDesc = false;
  if (handleSorting.sortedDESC === false) { }
}

//event listeners:
let currentUser;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const login = inputLoginUsername.value;
  const password = Number(inputLoginPin.value);
  currentUser = accounts.find(acc => (acc.username === login && acc.pin === password));
  if (!currentUser) return;
  containerApp.style.opacity = "100"; // show content after logging
  labelWelcome.textContent = `Welcome, ${currentUser.owner.split(' ')[0]}!`

  inputLoginUsername.value = ''; //clean username label after logging
  inputLoginPin.value = ''; //clean password label after logging
  inputLoginPin.blur(); //unfocus password label after logging

  updateUI(currentUser);

});

//if we want to get a loan, the rule is:
//"if any of the movement is 10% of requested loan, we can give it to you"
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const loanRate = 0.1//0.1=10%;
  const requestedAmmount = Number.floor(Math.abs(inputLoanAmount.value));
  currentUser.movements.some(move => move >= loanRate * requestedAmmount) && setTimeout(() => {
    currentUser.movements.push(requestedAmmount);
    updateUI(currentUser);
  }, 1500);
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  setTimeout(transferMoney, 1000);

});
btnSort.addEventListener('click', () => {
  if (addEventListener.sortedDesc === undefined) { // if static variable (ifSortedDesc), define it with true
    addEventListener.sortedDesc = true;
    currentUser.movements.sort((a, b) => a - b) // and sort descending 
    // console.log('from undefined to true')
  }
  else if (addEventListener.sortedDesc === true) { // if it's sorted descending, change it to ascending (kind of 'toogle boolean)
    currentUser.movements.sort((a, b) => b - a)
    addEventListener.sortedDesc = false
    // console.log('from true to false')
  } else {
    currentUser.movements.sort((a, b) => a - b) // other toggle
    addEventListener.sortedDesc = true
    // console.log('from false to true')
  }
  //sort movements of current user
  // currentUser.movements.sort((a, b) => a - b);
  //updateUI
  updateUI(currentUser); //nonetheless, just update UI if any of ifs' took place
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const givenUsername = inputCloseUsername.value;
  const givenPassword = Number(inputClosePin.value);

  if (givenUsername === currentUser.username && givenPassword === currentUser.pin) {
    setTimeout(() => {
      if (confirm("are you sure?")) {
        const index = accounts.findIndex(acc => acc.username === currentUser.username);
        console.log(index)
        accounts.splice(index, 1)
        console.log(`removedd ${index}. user`);
        hideUI();
        labelWelcome.textContent = 'Feel free to log in :)';
      }
    }, 1000);
  }
})

////////////////////////////////////////////////////////////////////// TRYING ONLY:



const fakeLogin = () => {
  currentUser = accounts[0];
  updateUI(currentUser);
  containerApp.style.opacity = 1;

}
fakeLogin()