import React from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

function LayoutComp({ children }) {
  return (
    <Layout style={{minHeight:"100vh", height:"100%", overflow: "auto" }} className="layout">
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2020 Created by Roberto Parlato</Footer>
    </Layout>
  );
}

export default LayoutComp;
