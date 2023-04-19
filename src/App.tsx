import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import { Navbar } from "./components";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <Navbar />
      <Layout>
        <div className="p-5">
          <Outlet />
        </div>
      </Layout>
    </div>
  );
};

export default App;
