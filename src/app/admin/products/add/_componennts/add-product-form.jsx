"use client"

import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Table,
  Typography,
  Upload,
} from "antd"
import Link from "next/link"
import { useState } from "react"
import { FaBox, FaList, FaPalette, FaShoppingCart, FaTag, FaTshirt, FaWeightHanging } from "react-icons/fa"

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select

const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "furniture", label: "Furniture" },
  { value: "accessories", label: "Accessories" },
  { value: "home", label: "Home & Kitchen" },
]

export default function AddProductPage() {
  const [form] = Form.useForm()
  const [formOutput, setFormOutput] = useState(null)
  const [fileList, setFileList] = useState([])

  // Watch form values for conditional rendering
  const hasVariants = Form.useWatch("hasVariants", form) || false
  const variantType = Form.useWatch("variantType", form) || "simple"
  const sku = Form.useWatch("sku", form) || ""
  const price = Form.useWatch("price", form) || 0
  const inventory = Form.useWatch("inventory", form) || 0
  const variants = Form.useWatch("variants", form) || []

  // Handle image upload
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  // Handle form submission
  const onFinish = (values) => {
    // Create a new object with form data and images
    const formData = {
      ...values,
      images: fileList.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.url || file.thumbUrl,
      })),
    }

    console.log("Form submitted with data:", formData)
    setFormOutput(formData)
    message.success("Product added successfully!")
  }

  // Generate variant table data
  const generateVariantTableData = () => {
    if (!variants || variants.length === 0) return []

    return variants.map((variant, index) => ({
      key: index,
      variant: {
        size: variant.size,
        color: variant.color,
        colorValue: variant.color,
      },
      sku: `${sku}-${variant.size}-${variant.color}`.replace(/\s+/g, "-").toLowerCase(),
      price: variant.price || price,
      stock: variant.stock || Math.floor(inventory / variants.length),
    }))
  }

  // Variant table columns
  const variantColumns = [
    {
      title: "Variant",
      dataIndex: "variant",
      key: "variant",
      render: (variant) => (
        <Space>
          <span>{variant.size}</span>
          <span>/</span>
          <span>{variant.color}</span>
        </Space>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
      align: "right",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      align: "right",
    },
  ]

  // Upload button
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <Link href="/admin/products">
          <Button icon={<ArrowLeftOutlined />} type="text" />
        </Link>
        <Title level={2} style={{ margin: 0, marginLeft: 8 }}>
          Add New Product
        </Title>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            price: 0,
            inventory: 0,
            hasVariants: false,
            variantType: "simple",
            variants: [],
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: "Please enter product name", min: 3 }]}
            >
              <Input prefix={<FaTag />} placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price ($)"
              rules={[{ required: true, message: "Please enter price", type: "number", min: 0.01 }]}
            >
              <InputNumber style={{ width: "100%" }} prefix="$" placeholder="0.00" precision={2} min={0.01} />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select a category">
                {CATEGORIES.map((category) => (
                  <Option key={category.value} value={category.value}>
                    {category.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="sku"
              label="SKU"
              rules={[{ required: true, message: "Please enter SKU", min: 3 }]}
              tooltip="Unique identifier for your product"
            >
              <Input prefix={<FaBox />} placeholder="Enter SKU" />
            </Form.Item>

            <Form.Item
              name="inventory"
              label="Inventory"
              rules={[{ required: true, message: "Please enter inventory", type: "number", min: 0 }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                prefix={<FaShoppingCart style={{ marginRight: 4 }} />}
                placeholder="0"
                min={0}
                precision={0}
              />
            </Form.Item>

            <Form.Item name="weight" label="Weight (kg)" tooltip="Optional product weight">
              <InputNumber
                style={{ width: "100%" }}
                prefix={<FaWeightHanging style={{ marginRight: 4 }} />}
                placeholder="Optional"
                min={0.01}
                precision={2}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description", min: 10 }]}
          >
            <TextArea prefix={<FaList />} placeholder="Enter product description" rows={6} showCount maxLength={1000} />
          </Form.Item>

          {/* Image Upload Section */}
          <Divider orientation="left">Product Images</Divider>
          <Form.Item label="Product Images" tooltip="Upload multiple product images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false} // Prevent auto upload
              multiple
              accept="image/*"
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Text type="secondary">You can upload up to 8 images</Text>
          </Form.Item>

          {/* Product Variants Section */}
          <Divider orientation="left">Product Variants</Divider>
          <Form.Item name="hasVariants" valuePropName="checked">
            <Checkbox>
              <Space align="start">
                <span>This product has variants</span>
                <Text type="secondary" style={{ display: "block" }}>
                  Enable if your product comes in different sizes, colors, etc.
                </Text>
              </Space>
            </Checkbox>
          </Form.Item>

          {hasVariants && (
            <div style={{ marginLeft: 24, borderLeft: "1px solid #f0f0f0", paddingLeft: 24 }}>
              <Form.List name="variants">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, "size"]}
                            rules={[{ required: true, message: "Size is required" }]}
                          >
                            <Input prefix={<FaTshirt />} placeholder="Size (e.g., Small, Medium, Large)" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, "color"]}
                            rules={[{ required: true, message: "Color is required" }]}
                          >
                            <Input prefix={<FaPalette />} placeholder="Color (e.g., Red, Blue, Black)" />
                          </Form.Item>
                        </Col>
                        <Col span={3}>
                          <Form.Item {...restField} name={[name, "price"]} label="Price">
                            <InputNumber style={{ width: "100%" }} placeholder="Optional" min={0.01} precision={2} />
                          </Form.Item>
                        </Col>
                        <Col span={3}>
                          <Form.Item {...restField} name={[name, "stock"]} label="Stock">
                            <InputNumber style={{ width: "100%" }} placeholder="Optional" min={0} precision={0} />
                          </Form.Item>
                        </Col>
                        <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                          <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(name)} />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Variant
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              {variants.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <Card
                    title="Product Variants"
                    size="small"
                    type="inner"
                    extra={<Text type="secondary">{variants.length} variants</Text>}
                  >
                    <Table
                      dataSource={generateVariantTableData()}
                      columns={variantColumns}
                      size="small"
                      pagination={false}
                      scroll={{ y: 240 }}
                    />
                  </Card>
                </div>
              )}
            </div>
          )}

          <Divider />

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {formOutput && (
        <Card style={{ marginTop: 24 }}>
          <Title level={4}>Form Output (Console)</Title>
          <pre
            style={{
              background: "#f5f5f5",
              padding: 16,
              borderRadius: 4,
              overflow: "auto",
              maxHeight: 400,
            }}
          >
            {JSON.stringify(formOutput, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  )
}
