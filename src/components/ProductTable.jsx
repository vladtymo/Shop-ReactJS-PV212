import React, { useContext, useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import { AppstoreAddOutlined, DeleteFilled, EditFilled, InfoCircleFilled, LikeFilled, LikeOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../contexts/products.context';

const api = "https://shop-pd211-awdhcvf3ebdpb7es.polandcentral-01.azurewebsites.net/api/products/";


const ProductTable = () => {

    const { setCount, count } = useContext(ProductsContext);
    const [products, setProducts] = useState([]);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'image',
            render: (_, item) => <img height={50} src={item.imageUrl} alt={item.title}></img>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, item) => <Link to={`/products/${item.id}`}>{text}</Link>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>{text}$</span>,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (text) => <span>{text}%</span>,
        },
        {
            title: 'Stock',
            dataIndex: 'quantity',
            key: 'stock',
            render: (text) =>
                text > 0 ?
                    <Tag color="green">Available</Tag>
                    :
                    <Tag color="volcano">Out of Stock</Tag>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/products/${record.id}`}>
                        <Button color="default" variant="outlined" icon={<InfoCircleFilled />} />
                    </Link>
                    <Button style={{ color: '#61916e' }} variant="outlined" icon={<LikeFilled />} />
                    <Link to={`/edit/${record.id}`}>
                        <Button style={{ color: '#faad14' }} variant="outlined" icon={<EditFilled />} />
                    </Link>
                    <Popconfirm
                        title="Delete the product"
                        description={`Are you sure to delete ${record.title}?`}
                        onConfirm={() => deleteItem(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button color="danger" variant="outlined" icon={<DeleteFilled />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // load data from server
    useEffect(() => {
        fetch(api + "all")
            .then(res => res.json())
            .then(data => {
                setProducts(data.sort((x, y) => y.id - x.id));
                setCount(data.length);
            });
    }, []);

    const deleteItem = (id) => {

        fetch(api + id, {
            method: "DELETE"
        }).then(res => {
            if (res.status === 200) {
                setProducts(products.filter(x => x.id !== id));
                message.success('Product deleted successfuly!');
                setCount(count - 1);
            }
            else
                message.error("Something went wrong!");
        });

    }

    return (
        <>
            <div>
                <Link to="/create">
                    <Button type="primary" icon={<AppstoreAddOutlined />} style={{ marginBottom: '16px' }}>
                        Create New Product
                    </Button>
                </Link>
            </div>
            <Table columns={columns} dataSource={products} rowKey="id" />
        </>
    )
}
export default ProductTable;