"use client"

import { PlusOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Col, Row, Statistic, Typography } from "antd"
import Link from "next/link"

const { Title } = Typography

export default function AdminDashboard() {
  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Title level={2}>Admin Dashboard</Title>
        <Link href="/admin/products/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add New Product
          </Button>
        </Link>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={120}
              prefix={<ShoppingOutlined />}
              suffix={<span style={{ fontSize: 14, color: "#52c41a" }}>+5</span>}
            />
            <div style={{ color: "#8c8c8c", fontSize: 12, marginTop: 4 }}>+5 from last month</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={540}
              prefix={<UserOutlined />}
              suffix={<span style={{ fontSize: 14, color: "#52c41a" }}>+12%</span>}
            />
            <div style={{ color: "#8c8c8c", fontSize: 12, marginTop: 4 }}>+12% from last month</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={345}
              prefix={<ShoppingCartOutlined />}
              suffix={<span style={{ fontSize: 14, color: "#52c41a" }}>+8%</span>}
            />
            <div style={{ color: "#8c8c8c", fontSize: 12, marginTop: 4 }}>+8% from last month</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={45231}
              precision={2}
              prefix="$"
              suffix={<span style={{ fontSize: 14, color: "#52c41a" }}>+10.5%</span>}
            />
            <div style={{ color: "#8c8c8c", fontSize: 12, marginTop: 4 }}>+10.5% from last month</div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
