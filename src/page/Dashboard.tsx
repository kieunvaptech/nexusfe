import { Card, Col, Row, Typography } from 'antd';
import Content from 'layout/Content';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
// import { DataPoint } from 'components/models/Datapoint.model';
import { useSelector } from 'react-redux';
import ketnoivoi from 'assets/icons/ketnoivoi.svg'
import danhmuc from 'assets/icons/danhmuc.svg'
import Vector from 'assets/icons/Vector.svg'
import Icons_reward from 'assets/images/Icons_reward.png'

const Dashboard: React.FC = () => {

  

  return (
    <Content className="pb-5">
        <div className="mx-1.5">
        <Typography.Title level={4} >Chào mừng bạn đến trang quản trị của nexus</Typography.Title>
        </div>
    </Content >
  );
};
export default Dashboard;






