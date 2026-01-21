// Balance calculation (equal + partial custom split)
export function calculateBalances(group) {
  const { members, expenses } = group;
  const balanceMap = {};
  members.forEach((m) => (balanceMap[m] = 0));

  expenses.forEach((exp) => {
    if (exp.splitType === "custom" && exp.customSplit) {
      let used = 0;
      const remaining = [];

      members.forEach((m) => {
        const v = exp.customSplit[m];
        if (v !== undefined && v > 0) {
          used += v;
          balanceMap[m] -= v;
        } else {
          remaining.push(m);
        }
      });

      const rest = exp.amount - used;
      const perHead = remaining.length > 0 ? rest / remaining.length : 0;

      remaining.forEach((m) => {
        balanceMap[m] -= perHead;
      });
    } else {
      const perHead = exp.amount / members.length;
      members.forEach((m) => (balanceMap[m] -= perHead));
    }

    balanceMap[exp.paidBy] += exp.amount;
  });

  return balanceMap;
}

export function simplifyBalances(balanceMap) {
  const creditors = [];
  const debtors = [];

  Object.entries(balanceMap).forEach(([n, a]) => {
    if (a > 0) creditors.push({ n, a });
    if (a < 0) debtors.push({ n, a: -a });
  });

  const result = [];
  let i = 0,
    j = 0;

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].a, creditors[j].a);
    result.push(`${debtors[i].n} owes ₹${pay.toFixed(0)} to ${creditors[j].n}`);
    debtors[i].a -= pay;
    creditors[j].a -= pay;
    if (debtors[i].a === 0) i++;
    if (creditors[j].a === 0) j++;
  }

  return result;
}

export function calculateMemberSummary(group) {
  const summary = {};
  group.members.forEach((m) => {
    summary[m] = { paid: 0, share: 0 };
  });

  group.expenses.forEach((exp) => {
    summary[exp.paidBy].paid += exp.amount;

    if (exp.splitType === "custom" && exp.customSplit) {
      let used = 0;
      const remaining = [];

      group.members.forEach((m) => {
        const v = exp.customSplit[m];
        if (v !== undefined && v > 0) {
          summary[m].share += v;
          used += v;
        } else {
          remaining.push(m);
        }
      });

      const rest = exp.amount - used;
      const perHead = remaining.length > 0 ? rest / remaining.length : 0;

      remaining.forEach((m) => {
        summary[m].share += perHead;
      });
    } else {
      const perHead = exp.amount / group.members.length;
      group.members.forEach((m) => {
        summary[m].share += perHead;
      });
    }
  });

  return summary;
}
