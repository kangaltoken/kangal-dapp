import { BigNumber, utils } from "ethers";

export function formatAmount(
  amount: BigNumber | number,
  maximumFractionDigits: number = 2,
  compact: boolean = true
): string {
  const number =
    amount instanceof BigNumber ? parseInt(utils.formatUnits(amount)) : amount;
  const notation = compact ? "compact" : "standard";
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maximumFractionDigits,
    notation: notation,
    compactDisplay: "short",
  }).format(number);
  return formatted;
}

export function formatUnits(
  units: BigNumber | null,
  maximumFractionDigits: number = 2,
  compact: boolean = true
): string {
  if (units) {
    return formatAmount(units, maximumFractionDigits, compact);
  }
  return "...";
}

export function shrinkAddress(
  address: string,
  charsFromStart: number = 6,
  charsFromEnd: number = 5
): string {
  return (
    address.slice(0, charsFromStart) +
    "..." +
    address.slice(42 - charsFromEnd, 42)
  );
}
