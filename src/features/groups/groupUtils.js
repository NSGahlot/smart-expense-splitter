// Calculate net balance per member
export function calculateBalances(group) {
  const { members, expenses } = group;

  const balanceMap = {};
  members.forEach((m) => (balanceMap[m] = 0));

  expenses.forEach((exp) => {
    // 🔥 CUSTOM SPLIT (PARTIAL INPUT SUPPORTED)
    if (exp.splitType === "custom" && exp.customSplit) {
      let usedAmount = 0;
      const remainingMembers = [];

      members.forEach((m) => {
        const value = exp.customSplit[m];

        // Sirf valid + positive values consider karo
        if (value !== undefined && value > 0) {
          usedAmount += value;
          balanceMap[m] -= value;
        } else {
          // Jinhone value nahi di, unme baad me split hoga
          remainingMembers.push(m);
        }
      });

      const remainingAmount = exp.amount - usedAmount;
      const equalShare =
        remainingMembers.length > 0
          ? remainingAmount / remainingMembers.length
          : 0;

      remainingMembers.forEach((m) => {
        balanceMap[m] -= equalShare;
      });
    } else {
      // ✅ EQUAL SPLIT (DEFAULT)
      const splitAmount = exp.amount / members.length;
      members.forEach((m) => {
        balanceMap[m] -= splitAmount;
      });
    }

    // 💰 Paid by member gets full credit
    balanceMap[exp.paidBy] += exp.amount;
  });

  return balanceMap;
}

// Convert balances to "who owes whom"
export function simplifyBalances(balanceMap) {
  const creditors = [];
  const debtors = [];

  Object.entries(balanceMap).forEach(([name, amount]) => {
    if (amount > 0) creditors.push({ name, amount });
    if (amount < 0) debtors.push({ name, amount: -amount });
  });

  const result = [];
  let i = 0;
  let j = 0;

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
