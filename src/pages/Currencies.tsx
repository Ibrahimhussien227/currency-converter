import React, { useEffect, useState } from "react";
import { Card, Row, Col, Input, Select, Button, Typography } from "antd";
import { SyncOutlined } from "@ant-design/icons";

import { useLazyGetCurrenciesQuery } from "../app/services/currencyApi";
import { Loader } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { SymbolContextType } from "../global/types";

const Currencies = () => {
  const [currencies, setCurrencies] = useState<
    { name: string; price: number }[]
  >([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("RUB");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { symbols, isFetchingSymbols } = useStateContext() as SymbolContextType;

  //

  const [getCurrencies, { data, isFetching: isFetchingCurrencies }] =
    useLazyGetCurrenciesQuery({ pollingInterval: 60000 });

  useEffect(() => {
    getCurrencies(selectedSymbol);
  }, [selectedSymbol]);

  useEffect(() => {
    if (data) {
      console.log(data);

      const filteredData = Object.entries(data?.response?.rates)
        .map((entry) => {
          return { name: entry[0], price: Number(entry[1]) };
        })
        .filter(({ name }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      setCurrencies(filteredData);
    }
  }, [data, searchTerm]);

  const onChange = (value: string) => {
    setSelectedSymbol(value);
  };

  const onRefreshCurrencies = () => {
    getCurrencies(selectedSymbol);
  };

  if (isFetchingCurrencies || isFetchingSymbols) return <Loader />;

  return (
    <>
      <div className="flex justify-center items-center">
        <Card size="small" hoverable onClick={onRefreshCurrencies}>
          <Row className="flex flex-row items-center justify-center gap-2">
            <SyncOutlined style={{ cursor: "pointer" }} />
            <Typography>Reload</Typography>
          </Row>
        </Card>
        <div className="w-64 mx-auto my-5">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          showSearch
          value={selectedSymbol}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={symbols}
        />
      </div>

      <Row gutter={[32, 32]} className="min-h-[65vh]">
        {currencies?.map(({ name, price }) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={price + name}
          >
            <Card title={name}>
              <p>
                Price: {price} {name}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Currencies;
