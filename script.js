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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////



const deposits = accounts[0].movements.filter(mov => mov > 0);
const withdrawals = accounts[0].movements.filter(mov => mov < 0);
const getFinalBalance = movements => movements.reduce((acc, mov) => acc + mov)

//inserting user's movements (cash transfers):

function displayMovements(movements) {
  containerMovements.innerHTML = ''; // clean hardcoded html made (the skeleton on which we based that contained both  movement types)
  for (const [index, value] of Object.entries(movements)) {
    const type = value < 0 ? 'withdrawal' : 'deposit'
    const movementsString = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${+index + 1} ${type}</div>
      <div class="movements__value">${value + "€"}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', movementsString);
  }
}
function displayBalance(movements) {
  labelBalance.textContent = getFinalBalance(movements) + "€"
}

const generateUsername = username => "".concat(username)
  .replace('-', ' ')
  .toLowerCase().split(' ')
  .map(word => word[0])
  .join('');

const createUsernames = accs => {
  accs.forEach(acc => { acc.username = generateUsername(acc.owner) });
}
const displaySummary = movements => {
  const sumIn = movements.filter(el => el>0).reduce((acc, item) => acc+item);
  const sumOut = movements.filter(el=>el<0).reduce((acc, item) => acc+item);
  const interest = movements.filter(el=>el>0).map(dep => dep*0.012).filter(int => int>=1).reduce((acc, item) => acc+item);
  labelSumIn.textContent=sumIn + "€";
  labelSumOut.textContent=Math.abs(sumOut) + "€";
  labelSumInterest.textContent=interest+"€";

  
}

// update visual data:
createUsernames(accounts)
displayMovements(accounts[0].movements);
displayBalance(accounts[0].movements);
displaySummary(accounts[0].movements);




