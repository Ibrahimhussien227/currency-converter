export interface ISymbol {
  label: string;
  value: string;
}
export type SymbolContextType = {
  symbols: ISymbol[];
  isFetchingSymbols: boolean;
};

export interface ConvertData {
  amount: number;
  from: string;
  to: string;
  value: number;
  date: string;
}
