"use client"

import { CloseOutlined, ShoppingOutlined } from "@ant-design/icons"
import { Avatar, Button, Drawer, InputNumber, List, Space, Typography } from "antd"
import { useEffect, useState } from "react"

const { Text } = Typography

export function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([])

  // Load cart items from localStorage when component mounts or opens
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCartItems(savedCart)
  }, [isOpen]) // Refresh when drawer opens

  // Update localStorage whenever cart items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
  }

  const updateQuantity = (id, value) => {
    if (value < 1) return
    const updatedCart = cartItems.map((item) => 
      item.id === id ? { ...item, quantity: value } : item
    )
    setCartItems(updatedCart)
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <Drawer
      title={
        <Space>
          <ShoppingOutlined />
          <span>{cartItems.length} ITEMS</span>
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={400}
      closable={false}
      extra={
        <Button type="text" onClick={onClose}>
          Close
        </Button>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button 
                key={`remove-${item.id}`}
                type="text" 
                danger 
                icon={<CloseOutlined />} 
                onClick={() => removeItem(item.id)}
              />
            ]}
          >
            <List.Item.Meta
              avatar={
                <Space direction="vertical" align="center">
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.id, value)}
                  />
                  <Avatar 
                    shape="square" 
                    size={80} 
                    src={item.image} 
                  />
                </Space>
              }
              title={
                <Text strong>
                  {item.title || item.name}
                </Text>
              }
              description={
                <>
                  <Space>
                    <Text strong>TK. {(item.price * item.quantity).toLocaleString()}</Text>
                    {item.originalPrice && (
                      <Text delete type="secondary">
                        TK. {item.originalPrice.toLocaleString()}
                      </Text>
                    )}
                  </Space>
                  {item.size && <div>Size: {item.size}</div>}
                </>
              }
            />
          </List.Item>
        )}
      />

      <div style={{ padding: 16 }}>
        <div className="flex justify-between mb-4">
          <Text strong>Total:</Text>
          <Text strong>TK. {calculateTotal().toLocaleString()}</Text>
        </div>
        <Button 
          type="primary" 
          block 
          size="large"
          style={{ marginTop: 16 }}
        >
          Proceed to Checkout
        </Button>
      </div>
    </Drawer>
  )
}