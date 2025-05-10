"use client"
import { Button, Space, Table, Tag } from "antd";
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

// Sample product data
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 199.99,
    category: "Electronics",
    status: "In Stock",
    inventory: 45,
  },
  {
    id: "2",
    name: "Ergonomic Chair",
    price: 249.99,
    category: "Furniture",
    status: "Low Stock",
    inventory: 8,
  },
  {
    id: "3",
    name: "Smartphone Case",
    price: 24.99,
    category: "Accessories",
    status: "In Stock",
    inventory: 120,
  },
  {
    id: "4",
    name: "Wireless Keyboard",
    price: 89.99,
    category: "Electronics",
    status: "Out of Stock",
    inventory: 0,
  },
  {
    id: "5",
    name: "Desk Lamp",
    price: 39.99,
    category: "Home",
    status: "In Stock",
    inventory: 32,
  },
];

export default function ManageProducts() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      key: "price",
      render: (record) => `$${record.price.toFixed(2)}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      key: "status",
      render: (record) => {
        let color = "";
        if (record.status === "In Stock") color = "green";
        if (record.status === "Low Stock") color = "orange";
        if (record.status === "Out of Stock") color = "red";
        return <Tag color={color}>{record.status}</Tag>;
      },
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<FaEdit />} />
          <Button type="text" icon={<FaTrash />} danger />
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/add">
          <Button type="primary" icon={<FaPlus />}>
            Add Product
          </Button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
}