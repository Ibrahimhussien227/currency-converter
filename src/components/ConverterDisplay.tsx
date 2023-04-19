import { Card, Typography } from "antd";

import { ConvertData } from "../global/types";

interface Props {
  convertedAmount: ConvertData;
}

const ConverterDisplay: React.FC<Props> = ({ convertedAmount }) => {
  return (
    <Card className="text-right" bordered={false}>
      <Typography className="text-lg font-bold">
        {convertedAmount.amount} {convertedAmount.from}
      </Typography>
      <Typography className="text-2xl font-bold" style={{ color: "#24a0ed" }}>
        {convertedAmount.value} {convertedAmount.to}
      </Typography>
      <Typography className="text-md">{convertedAmount.date}</Typography>
    </Card>
  );
};

export default ConverterDisplay;
