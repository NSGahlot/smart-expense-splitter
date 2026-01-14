export function calculateBalances(group) {
  const { members, expenses } = group;

  // init balances
  const balanceMap = {};
  members.forEach((m) => (balanceMap[m] = 0));

  expenses.forEach((exp) => {
    const splitAmount = exp.amount / members.length;

    members.forEach((m) => {
      balanceMap[m] -= splitAmount;
    });

    balanceMap[exp.paidBy] += exp.amount;
  });

  return balanceMap;
}

export function simplifyBalances(balanceMap) {
  const creditors = [];
  const debtors = [];

  Object.entries(balanceMap).forEach(([name, amount]) => {
    if (amount > 0) creditors.push({ name, amount });
    if (amount < 0) debtors.push({ name, amount: -amount });
  });

  const result = [];
  let i = 0,
    j = 0;

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);

    result.push(
      `${debtors[i].name} owes ₹${pay.toFixed(0)} to ${creditors[j].name}`
    );

    debtors[i].amount -= pay;
    creditors[j].amount -= pay;

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }

  return result;
}
