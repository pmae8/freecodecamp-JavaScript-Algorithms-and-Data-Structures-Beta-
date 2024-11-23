let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

function checkCashRegister(price, cash, cid) {
  const currencyUnits = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  let changeDue = cash - price;
  let change = [];
  let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0);

  if (totalCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (totalCid === changeDue) {
    return { status: "CLOSED", change: cid };
  } else {
    cid = cid.reverse(); 

    for (let i = 0; i < cid.length; i++) {
      let currencyName = cid[i][0];
      let currencyTotal = cid[i][1];
      let currencyValue = currencyUnits[currencyName];
      let currencyAmount = 0;

      while (changeDue >= currencyValue && currencyTotal > 0) {
        changeDue -= currencyValue;
        changeDue = Math.round(changeDue * 100) / 100;
        currencyTotal -= currencyValue;
        currencyAmount += currencyValue;
      }

      if (currencyAmount > 0) {
        change.push([currencyName, currencyAmount]);
      }
    }

    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change: change };
  }
}

document.getElementById('purchase-btn').addEventListener('click', () => {
  const cash = parseFloat(document.getElementById('cash').value);
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === price) {
    document.getElementById('change-due').innerText = "No change due - customer paid with exact cash";
  } else {
    const result = checkCashRegister(price, cash, cid);

    // This is where the fix is:
    if (result.status === "CLOSED") {
      result.change = result.change.reverse().filter(unit => unit[1] !== 0);
    }

    let changeString = `Status: ${result.status} `;
    if (result.status === "OPEN" || result.status === "CLOSED") {
      changeString += result.change.map(unit => `${unit[0]}: $${unit[1].toFixed(2)}`).join(' ');
    }
    document.getElementById('change-due').innerText = changeString;
  }
});
