import { Row, Select } from "antd";

import { ISymbol } from "../global/types";

interface Props {
  symbols: ISymbol[];
  onCurrencyChange: (value: string) => void;
  currency: string;
}

const ConverterOption: React.FC<Props> = ({
  symbols,
  onCurrencyChange,
  currency,
}) => {
  return (
    <Row>
      <Select
        className="w-[40rem] lg:w-[30rem] md:w-[25rem]"
        showSearch
        value={currency}
        optionFilterProp="children"
        onChange={(value: string) => onCurrencyChange(value)}
        filterOption={(input, option) =>
          (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={symbols}
      />
    </Row>
  );
};

export default ConverterOption;
