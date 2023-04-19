import { Card, Typography } from "antd";

const ConverterHeader = () => {
  return (
    <Card bordered={false} className="flex flex-col text-center">
      <Typography className="font text-3xl md:text-2xl">
        Currency Converter & Exchange Rates
      </Typography>

      <Typography className="font-light text-xs">
        Up to date FX rates
      </Typography>
    </Card>
  );
};

export default ConverterHeader;
