"use client"

import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons"
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Table,
  Typography,
  Upload,
  message,
} from "antd"
import Link from "next/link"
import { useState } from "react"
import { FaBox, FaList, FaPalette, FaShoppingCart, FaTag, FaTshirt, FaWeightHanging } from "react-icons/fa"

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select

const SIZES = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
]

const COLORS = [
  { id: "white", value: "#ffffff", label: "White" },
  { id: "black", value: "#000000", label: "Black" },
  { id: "gray", value: "#808080", label: "Gray" },
  { id: "red", value: "#ff0000", label: "Red" },
  { id: "blue", value: "#0000ff", label: "Blue" },
  { id: "green", value: "#008000", label: "Green" },
  { id: "yellow", value: "#ffff00", label: "Yellow" },
  { id: "purple", value: "#800080", label: "Purple" },
  { id: "pink", value: "#ffc0cb", label: "Pink" },
  { id: "orange", value: "#ffa500", label: "Orange" },
]

const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "furniture", label: "Furniture" },
  { value: "accessories", label: "Accessories" },
  { value: "home", label: "Home & Kitchen" },
]

export default function AddProductForm() {
  const [form] = Form.useForm()
  const [formOutput, setFormOutput] = useState(null)
  const [fileList, setFileList] = useState([])

  // Watch form values for conditional rendering
  const hasVariants = Form.useWatch("hasVariants", form) || false
  const variantType = Form.useWatch("variantType", form) || "simple"
  const selectedSizes = Form.useWatch("sizes", form) || []
  const selectedColors = Form.useWatch("colors", form) || []
  const sku = Form.useWatch("sku", form) || ""
  const price = Form.useWatch("price", form) || 0
  const inventory = Form.useWatch("inventory", form) || 0

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
    if (!selectedSizes.length || !selectedColors.length) return []

    return selectedSizes.flatMap((size) =>
      selectedColors.map((color) => ({
        key: `${size}-${color}`,
        variant: {
          size: SIZES.find((s) => s.id === size)?.label,
          color: COLORS.find((c) => c.id === color)?.label,
          colorValue: COLORS.find((c) => c.id === color)?.value,
        },
        sku: `${sku}-${size}-${color}`,
        price: price,
        stock: Math.floor(inventory / (selectedSizes.length * selectedColors.length)),
      })),
    )
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
          <Space>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: variant.colorValue,
                border: "1px solid #d9d9d9",
              }}
            />
            <span>{variant.color}</span>
          </Space>
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
            sizes: [],
            colors: [],
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
                <span>This product has multiple variants</span>
                <Text type="secondary" style={{ display: "block" }}>
                  Enable if your product comes in different sizes, colors, etc.
                </Text>
              </Space>
            </Checkbox>
          </Form.Item>

          {hasVariants && (
            <div style={{ marginLeft: 24, borderLeft: "1px solid #f0f0f0", paddingLeft: 24 }}>
              <Form.Item name="variantType" label="Variant Type">
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="simple">Simple (Size OR Color)</Radio>
                    <Radio value="matrix">Matrix (Size AND Color combinations)</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
                <Form.Item
                  name="sizes"
                  label={
                    <Space>
                      <FaTshirt /> Available Sizes
                    </Space>
                  }
                  rules={[{ required: hasVariants, message: "Please select at least one size", type: "array", min: 1 }]}
                >
                  <Checkbox.Group style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {SIZES.map((size) => (
                      <Checkbox key={size.id} value={size.id}>
                        {size.label}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item
                  name="colors"
                  label={
                    <Space>
                      <FaPalette /> Available Colors
                    </Space>
                  }
                  rules={[
                    { required: hasVariants, message: "Please select at least one color", type: "array", min: 1 },
                  ]}
                >
                  <Checkbox.Group style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {COLORS.map((color) => (
                      <Checkbox key={color.id} value={color.id}>
                        <Space>
                          <div
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              backgroundColor: color.value,
                              border: "1px solid #d9d9d9",
                            }}
                          />
                          {color.label}
                        </Space>
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </div>

              {variantType === "matrix" && selectedSizes.length > 0 && selectedColors.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <Card
                    title="Generated Variants"
                    size="small"
                    type="inner"
                    extra={<Text type="secondary">{selectedSizes.length * selectedColors.length} variants</Text>}
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
