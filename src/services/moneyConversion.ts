export default function moneyConversion(dolar: number, tax: number, dolarValue: number): string {
  const IOF = 0.10;
  const VALUE = (dolar + (dolar * (tax / 100))) * (dolarValue * (1 + IOF))
  return VALUE.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}