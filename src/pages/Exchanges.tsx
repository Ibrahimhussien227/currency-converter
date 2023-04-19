import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spin } from "antd";

import { SyncOutlined } from "@ant-design/icons";

import {
  ConverterDisplay,
  ConverterHeader,
  ConverterInput,
  ConverterOption,
  Loader,
} from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import { useGetConverterCurrencyQuery } from "../app/services/currencyApi";
import { SymbolContextType } from "../global/types";

interface ConvertData {
  amount: number;
  from: string;
  to: string;
  value: number;
  date: string;
}

// interface Response

const Exchanges = () => {
  const [amount, setAmount] = useState<number>(1);
  const [currencyOne, setCurrencyOne] = useState<string>("USD");
  const [currencyTwo, setCurrencyTwo] = useState<string>("RUB");
  const [convertedAmount, setConvertedAmount] = useState<ConvertData>({
    amount: 0,
    from: "",
    to: "",
    value: 0,
    date: "",
  });

  const { symbols, isFetchingSymbols } = useStateContext() as SymbolContextType;

  const { data, isFetching } = useGetConverterCurrencyQuery({
    currencyOne,
    currencyTwo,
    amount,
  });

  useEffect(() => {
    if (data) {
      console.log(data);

      setConvertedAmount(data.response);
    }
  }, [data, currencyOne, currencyTwo, amount]);

  const handleSwitch = (from: string, to: string) => {
    setCurrencyOne(to);
    setCurrencyTwo(from);
  };

  if (isFetchingSymbols) return <Loader />;

  return (
    <Card className="w-full mx-auto">
      <ConverterHeader />

      <div className=" flex flex-col md:flex-row p-10 bg-white gap-4 rounded-lg items-center justify-between">
        <Col className="flex justify-center items-center">
          <ConverterOption
            symbols={symbols}
            onCurrencyChange={setCurrencyOne}
            currency={currencyOne}
          />
        </Col>

        <Col className="block justify-center items-center">
          <SyncOutlined
            className="text-2xl cursor-pointer"
            spin={isFetching}
            onClick={() => handleSwitch(currencyOne, currencyTwo)}
          />
        </Col>

        <Col className="justify-center items-center">
          <ConverterOption
            symbols={symbols}
            onCurrencyChange={setCurrencyTwo}
            currency={currencyTwo}
          />
        </Col>
      </div>
      <Row className="p-10 bg-white gap-4 rounded-lg flex justify-between">
        <Col>
          <ConverterInput value={amount} onAmountChange={setAmount} />
        </Col>
        {isFetching ? (
          <Spin />
        ) : (
          <Col className="float-right">
            <ConverterDisplay convertedAmount={convertedAmount} />
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default Exchanges;
