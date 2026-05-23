import React from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = ({ data, productsByVertical }) => {
    const navigate = useNavigate();

    return (
        <Row>
            {data.map((vertical) => {
                const productos = productsByVertical[vertical._id] || [];

                return (
                    <Col key={vertical._id} xs={24} sm={12} lg={6}>
                        <div style={{ background: '#ffffff', borderRadius: 12, padding: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <span style={{ fontWeight: 700, fontSize: 15 }}> {vertical.name} </span>
                                <span style={{ fontSize: 12, color: '#666', cursor: 'pointer' }}>Ver mas</span>
                            </div>

                            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                                {productos.map((product) => (
                                    <img
                                        key={product._id}
                                        src={product.images?.[0]?.url || 'https://via.placeholder.com/150'}
                                        alt={product.name}
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        style={{ width: '32%', aspectRatio: '1', objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                                    />
                                ))}
                            </div>

                            <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 4 }}>Tiendas destacadas</div>
                            <div style={{ fontSize: 12, color: '#444', cursor: 'pointer' }}>
                                {productos.map((p) => p.store?.name || 'Tienda').join(' • ')}
                            </div>
                        </div>
                    </Col>
                );
            })}
        </Row>
    );
};

export default FeaturedProducts;
