import React from 'react';
import { PlusOutlined, UpCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Upload,
} from 'antd';

const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e[0];
    }
    return e?.file;
};

const CreateProduct = () => {

    const onSubmit = (item) => {
        console.log(item);

        // upload to server

    }
    return (
        <>
            <h2>Create New Product</h2>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"

                style={{
                    maxWidth: 600,
                }}
                onFinish={onSubmit}
            >
                <Form.Item label="Title" name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Price" name="price">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Discount" name="discount">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Quantity" name="quantity">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Category" name="categoryId">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Image" name="image" valuePropName="file" getValueFromEvent={normFile}>
                    <Upload maxCount={1}>
                        <Button icon={<UpCircleOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};
export default CreateProduct;