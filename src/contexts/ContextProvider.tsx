import React, { createContext, useContext, useEffect, useState } from "react";

import { useGetSymbolsQuery } from "../app/services/currencyApi";
import { ISymbol, SymbolContextType } from "../global/types";

interface Props {
  children: React.ReactNode;
}

const StateContext = createContext<SymbolContextType | null>(null);

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [symbols, setSymbols] = useState<ISymbol[]>([]);

  const { data: symbolsList, isFetching: isFetchingSymbols } =
    useGetSymbolsQuery();

  useEffect(() => {
    if (symbolsList) {
      const symbolsArray = Object.entries(symbolsList?.response?.fiats).map(
        (entry) => {
          return {
            label: `${entry[1].currency_code} - ${entry[1].currency_name}`,
            value: entry[0],
          };
        }
      );
      setSymbols(symbolsArray);
    }
  }, [symbolsList]);

  return (
    <StateContext.Provider value={{ symbols, isFetchingSymbols }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
