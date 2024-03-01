import React, { createContext, useContext, useState } from 'react';
import { Currency } from '@utils/Types';

type CTX = {
  fromCurrency: Currency | null;
  setFromCurrency: (currency: Currency | null) => void;
  toCurrency: Currency | null;
  setToCurrency: (currency: Currency | null) => void;
};

const Context = createContext<CTX>({
  fromCurrency: null,
  setFromCurrency: () => {},
  toCurrency: null,
  setToCurrency: () => {},
});

const ConverterProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);

  return (
    <Context.Provider value={{ fromCurrency, setFromCurrency, toCurrency, setToCurrency }}>{children}</Context.Provider>
  );
};

function useConverter(): CTX {
  return useContext(Context);
}

export { ConverterProvider, useConverter };
