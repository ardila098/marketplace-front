import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UPLOAD_ROUTES } from '../../../constants/uploadRoutes';

import {
    FeaturedProductsRow,
    FeaturedProductCol,
    FeaturedProductCard,
    FeaturedProductHeader,
    VerticalName,
    ViewMoreText,
    ProductImagesRow,
    ProductImage,
    FeaturedStoresLabel,
    FeaturedStoresText,
} from './../styles/styleFeaturedProducts';



const FeaturedProducts = ({ data = [], }) => {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleViewMoreClick = (verticalId) => {
        navigate(`/vertical/${verticalId}`);
    };

    return (
        <FeaturedProductsRow gutter={[16, 16]}>
            {data.map((item) => {
                const { vertical, products } = item;
                
                return (
                    <FeaturedProductCol key={vertical._id} xs={24} sm={12} lg={6}>
                        <FeaturedProductCard>
                            <FeaturedProductHeader justify="space-between" align="middle">
                                <VerticalName>{vertical.name}</VerticalName>

                                <ViewMoreText onClick={() => handleViewMoreClick(vertical._id)}>
                                    Ver más
                                </ViewMoreText>
                            </FeaturedProductHeader>

                            <ProductImagesRow gutter={8}>
                                {products?.slice(0, 3).map((product) => (
                                    <Col key={product._id} span={8}>
                                        <ProductImage
                                            src={product.image ? `${UPLOAD_ROUTES.products.images}/${product.image}` : 'https://via.placeholder.com/150'}
                                            alt={product.name}
                                            onClick={() => handleProductClick(product._id)}
                                        />
                                    </Col>
                                ))}
                            </ProductImagesRow>

                            <FeaturedStoresLabel>Tiendas destacadas</FeaturedStoresLabel>

                            <FeaturedStoresText>
                                {products?.[0]?.store?.name || 'Múltiples Tiendas'}
                            </FeaturedStoresText>
                        </FeaturedProductCard>
                    </FeaturedProductCol>
                );
            })}
        </FeaturedProductsRow>
    );
};

export default FeaturedProducts;