interface Currencies {
  name: string;
}

interface Rates {
  rates: Currencies;
}

export interface CurrenciesResponse {
  response: Rates;
}

interface Currency {
  name: string;
}

interface Fiats {
  fiats: Currency;
}

export interface SymbolsResponse {
  response: Fiats;
}

interface ConvertData {
  amount: number;
  from: string;
  to: string;
  value: number;
  date: string;
}

export interface ConverterResponse {
  response: ConvertData;
}
