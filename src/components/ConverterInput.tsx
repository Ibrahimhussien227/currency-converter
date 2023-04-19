import { Input } from "antd";

interface Props {
  value: number;
  onAmountChange: (value: number) => void;
}

const ConverterInput: React.FC<Props> = ({ value, onAmountChange }) => {
  return (
    <>
      <label htmlFor="amount">Amount</label>
      <Input
        id="amount"
        type="number"
        min={0}
        value={value}
        onChange={(e) => onAmountChange(Number(e.target.value))}
      />
    </>
  );
};

export default ConverterInput;
