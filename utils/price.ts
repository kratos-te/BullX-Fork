const NumberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 5,
});

export function getPriceStr(price: number) {
  const absPrice = Math.abs(price);

  return NumberFormat.format(
    +price.toFixed(
      Math.max(1, 5 - (absPrice > 1 ? Math.floor(Math.log10(absPrice)) : 0)),
    ),
  );
}

export function getPercentageStr(percentage: number) {
  const sign = percentage > 0 ? 1 : -1;

  let amount = percentage * sign;

  if (amount > 100) {
    amount = Math.ceil(amount);
  } else if (amount > 10) {
    amount = Math.ceil(amount * 10) / 10;
  } else if (amount > 1) {
    amount = Math.ceil(amount * 100) / 100;
  } else if (amount > 0.1) {
    amount = Math.ceil(amount * 100) / 100;
  } else if (amount > 0.01) {
    amount = Math.ceil(amount * 1000) / 1000;
  } else {
    amount = Math.ceil(amount * 10000) / 10000;
  }

  if (percentage === 0) {
    return `${amount}`;
  }

  return `${sign > 0 ? "+" : "-"}${amount}`;
}

export function formatNumber(num: number, fixed?: number) {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(fixed ? fixed : 1)}G`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(fixed ? fixed : 1)}M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(fixed ? fixed : 1)}k`;
  } else if (num >= 100) {
    return num.toFixed(fixed ? fixed : 2);
  } else if (num >= 10) {
    return num.toFixed(fixed ? fixed : 3);
  } else if (num === 0) {
    return "0";
  } else {
    return num.toFixed(fixed ? fixed : 5);
  }
}

export function convertMinAndSec(remainSec: number) {
  const mins = Math.floor(remainSec / 60);
  const secs = remainSec - mins * 60;

  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
