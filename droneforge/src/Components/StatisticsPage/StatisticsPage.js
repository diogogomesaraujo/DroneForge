import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import SalesChart from './SalesChart';
import { FaCheck, FaClock, FaWrench, FaSmile } from 'react-icons/fa'; // Using FontAwesome icons
import './StatisticsPage.css'; // Import the CSS file

const statistics = [
    {
        name: 'Assembly Success Rate',
        value: '98.75%',
        description: 'The percentage of drones successfully assembled.',
        icon: <FaCheck size={30} />,
        change: '+2.1%', // Example data for change
        changeDirection: 'up', // 'up' or 'down'
        bgColor: '#e0bbff', // Lighter purple
        textColor: 'dark'
    },
    {
        name: 'Avg Assembly Time',
        value: '01:25:30',
        description: 'The average time taken to assemble a drone.',
        icon: <FaClock size={30} />,
        change: '-1.2%', // Example data for change
        changeDirection: 'down', // 'up' or 'down'
        bgColor: 'white',
        textColor: 'dark'
    },
    {
        name: 'Total Drones Assembled',
        value: '5,432 drones',
        description: 'The total number of drones assembled.',
        icon: <FaWrench size={30} />,
        change: '+5.6%', // Example data for change
        changeDirection: 'up', // 'up' or 'down'
        bgColor: 'white',
        textColor: 'dark'
    },
    {
        name: 'User Satisfaction',
        value: '93.2%',
        description: 'The percentage of users who rated positively.',
        icon: <FaSmile size={30} />,
        change: '+3.4%', // Example data for change
        changeDirection: 'up', // 'up' or 'down'
        bgColor: 'white',
        textColor: 'dark'
    },
];

const StatisticsPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper" className="bg-light">
                    <Sidebar />
                </Col>
                <Col xs={10} id="page-content-wrapper" className="pt-3 page-content">
                    <Row>
                        <Col xs={12}>
                            <h1>Project Statistic</h1>
                        </Col>
                    </Row>
                    <Row className="mt-4 d-flex flex-wrap">
                        <Col xs={12} md={6} className="d-flex flex-column">
                            <SalesChart />
                        </Col>
                        <Col xs={12} md={6} className="d-flex flex-wrap justify-content-between align-items-stretch">
                            {statistics.map((stat, index) => (
                                <div className="stat-card" key={index} style={{ backgroundColor: stat.bgColor, color: stat.textColor }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        {stat.icon}
                                        <div className={`text-${stat.changeDirection === 'up' ? 'success' : 'danger'}`} style={{ fontSize: '12px' }}>
                                            {stat.changeDirection === 'up' ? '▲' : '▼'} {stat.change}
                                        </div>
                                    </div>
                                    <h2 style={{ marginTop: '5px', marginBottom: '5px' }}>
                                        {stat.value}
                                    </h2>
                                    <h5>{stat.name}</h5>
                                    <p>{stat.description}</p>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default StatisticsPage;
