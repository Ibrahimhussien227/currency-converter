import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  MoneyCollectOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../images/cryptocurrency.png";

const items: MenuProps["items"] = [
  {
    label: <Link to="/">Currencies</Link>,
    key: "currencies",
    icon: <MoneyCollectOutlined />,
  },
  {
    label: <Link to="/exchange-rate">Exchange Rate</Link>,
    key: "exchange",
    icon: <FundOutlined />,
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number>(0);
  const [current, setCurrent] = useState<string>("currencies");

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-center items-center m-0 bg-[#001529]">
      <div className="flex items-center w-full p-5 bg-[#001529]">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="ml-4">
          <Link to="/">Currency Exchange</Link>
        </Typography.Title>
        <Button
          className="block sm:hidden absolute right-3 top-6 text-lg bg-[#f9f9f9] border-none"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          className="flex sm:flex-row flex-col absolute sm:relative top-20 z-50 sm:top-0"
          theme="dark"
          items={items}
        />
      )}
    </div>
  );
};

export default Navbar;
