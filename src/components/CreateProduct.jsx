import React, { useEffect, useState } from 'react';
import { PlusOutlined, UpCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Select,
    Space,
    Upload,
} from 'antd';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e[0];
    }
    return e?.file;
};

const api = "https://shop-pd211-awdhcvf3ebdpb7es.polandcentral-01.azurewebsites.net/api/products/";

const CreateProduct = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(api + 'categories').then(res => res.json()).then(data => {
            setCategories(data.map(x => { return { label: x.name, value: x.id } }));
        });
    }, []);

    const onSubmit = (item) => {
        console.log(item);

        // TODO: upload to server
        fetch(api, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.status === 200) {
                message.success("Product created successfuly!");
                navigate(-1);
            }
            else {
                res.json().then(res => {
                    const msg = res.errors[Object.keys(res.errors)[0]][0];
                    message.error(msg);
                })
            }
        })

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
                    <Select options={categories}></Select>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                {/* <Form.Item label="Image" name="image" valuePropName="file" getValueFromEvent={normFile}>
                    <Upload maxCount={1}>
                        <Button icon={<UpCircleOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item> */}
                <Form.Item label="Image" name="imageUrl">
                    <Input />
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