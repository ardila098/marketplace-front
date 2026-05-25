import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';

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
            {data.map((vertical) => {

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
                                {vertical?.map((product) => (
                                    <Col key={product._id} span={8}>
                                        <ProductImage
                                            // src={getProductImage(product)}
                                            alt={product.name}
                                            onClick={() => handleProductClick(product._id)}
                                        />
                                    </Col>
                                ))}
                            </ProductImagesRow>

                            <FeaturedStoresLabel>Tiendas destacadas</FeaturedStoresLabel>

                            <FeaturedStoresText>
                                {/* {getStoreNames()} */}
                            </FeaturedStoresText>
                        </FeaturedProductCard>
                    </FeaturedProductCol>
                );
            })}
        </FeaturedProductsRow>
    );
};

export default FeaturedProducts;