interface QuoteDisplayProps {
  rate: number | null;
  convertedAmount: number | null;
  fromCurrency: string;
  toCurrency: string;
}

const QuoteDisplay = ({ rate, convertedAmount, fromCurrency, toCurrency }: QuoteDisplayProps) => {
  if (rate === null || convertedAmount === null) {
    return <p>Crea una cotización para ver los resultados.</p>;
  }

  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-semibold">Resultado de la Cotización</h3>
      <p>
        Tasa de cambio: 1 {fromCurrency} = {rate} {toCurrency}
      </p>
      <p>
        Monto convertido: {convertedAmount} {toCurrency}
      </p>
    </div>
  );
};

export default QuoteDisplay;
