import { Button, Space, Spin } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

import {
  DetailContainer,
  DetailHeader,
  HeaderInfo,
  HeaderMeta,
  OrderNumber,
  DetailGrid,
  Panel,
  PanelTitle,
  ProductList,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductMeta,
  ProductPrice,
  InfoBlock,
  InfoRow,
  InfoLabel,
  InfoValue,
  ActionBox,
  WarningText,
} from '../style'
import useOrders from '../hooks/useOrders'
import StatusTag from '../../../components/common/StatusTag'
import { currency } from '../../../utils/formatters'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'

const OrdersDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { order, loading } = useOrders(id)


  return (
    <DetailContainer>
      <Spin spinning={loading}>
        <DetailHeader>
          <HeaderInfo>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
              Volver
            </Button>

            <OrderNumber>{order?.orderNumber}</OrderNumber>

            <HeaderMeta>Total tienda: {currency(order?.sellerSubtotal || 0)}</HeaderMeta>

            <Space wrap>
              <StatusTag status={order?.paymentStatus} />
              <StatusTag status={order?.fulfillmentStatus} />
            </Space>
          </HeaderInfo>

          <Button
            type="primary"
            size="large"
            // loading={dispatching}
            // disabled={!order?.canSellerDispatch}
            // onClick={dispatchOrder}
          >
            Marcar como despachado
          </Button>
        </DetailHeader>

        <DetailGrid>
          <Panel>
            <PanelTitle>Productos a despachar</PanelTitle>

            <ProductList>
              {(order?.items || []).map(item => (
                <ProductItem key={item._id}>
                  <ProductImage
                    src={getUploadUrl(UPLOAD_ROUTES.products.images, item.imageSnapshot)}
                    preview={false}
                  />

                  <ProductInfo>
                    <ProductName>
                      {item.productNameSnapshot || item.productName || 'Producto'}
                    </ProductName>

                    <ProductMeta>{item.itemNameSnapshot || 'Sin opción seleccionada'}</ProductMeta>

                    <ProductMeta>
                      Referencia: {item.itemNameSnapshot || 'Sin referencia'}
                    </ProductMeta>

                    {item.selectedItems?.map(selectedItem => (
                      <ProductMeta key={selectedItem.partId}>
                        • {selectedItem.partNameSnapshot}: {selectedItem.optionLabelSnapshot}
                      </ProductMeta>
                    ))}

                    <ProductPrice>{currency(item.subtotal || 0)}</ProductPrice>
                  </ProductInfo>
                </ProductItem>
              ))}
            </ProductList>
          </Panel>

          <Space direction="vertical" size="middle">
            <Panel>
              <PanelTitle>Cliente</PanelTitle>

              <InfoBlock>
                <InfoRow>
                  <InfoLabel>Nombre</InfoLabel>
                  <InfoValue>{order?.customer?.name || 'Cliente'}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Correo</InfoLabel>
                  <InfoValue>{order?.customer?.email || 'No disponible'}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Teléfono</InfoLabel>
                  <InfoValue>{order?.customer?.phone || 'No disponible'}</InfoValue>
                </InfoRow>
              </InfoBlock>
            </Panel>

            <Panel>
              <PanelTitle>Dirección de envío</PanelTitle>

              <InfoBlock>
                <InfoRow>
                  <InfoLabel>Dirección</InfoLabel>
                  <InfoValue>
                    {order?.shippingAddress?.address || 'No disponible'}
                    {order?.shippingAddress?.neighborhood
                      ? `, ${order?.shippingAddress.neighborhood}`
                      : ''}
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Ciudad</InfoLabel>
                  <InfoValue>
                    {order?.shippingAddress?.city || 'No disponible'}
                    {order?.shippingAddress?.department
                      ? `, ${order?.shippingAddress.department}`
                      : ''}
                  </InfoValue>
                </InfoRow>

                {order?.shippingAddress?.notes && (
                  <InfoRow>
                    <InfoLabel>Notas</InfoLabel>
                    <InfoValue>{order?.shippingAddress.notes}</InfoValue>
                  </InfoRow>
                )}
              </InfoBlock>

              <ActionBox>
                {!order?.canSellerDispatch && (
                  <WarningText>
                    Esta orden tiene productos de varias tiendas. El despacho será gestionado por la
                    plataforma.
                  </WarningText>
                )}
              </ActionBox>
            </Panel>
          </Space>
        </DetailGrid>
      </Spin>
    </DetailContainer>
  )
}

export default OrdersDetails
