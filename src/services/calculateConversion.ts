import cardConversion from "./cardConversion";
import moneyConversion from "./moneyConversion";

type ConversionStrategy = () => string;

export default function calculateConversion(type: string, dolar: number, tax: number, dolarValue: number): string {
  const CONVERSION_STRATEGIES: Record<string, ConversionStrategy> = {
    'money': () => moneyConversion(dolar, tax, dolarValue),
    'card': () => cardConversion(dolar, tax, dolarValue)
  };

  return CONVERSION_STRATEGIES[type]();
}