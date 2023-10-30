export function formatCurrency(amount) {
  let amountNumber = +amount;

  // check if it's NaN
  if (isNaN(amountNumber)) {
    return "Invalid";
  }

  return amountNumber.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
