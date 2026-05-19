import { useEffect, useState } from 'react'
import useVerticals from "./hooks/useVerticals"
import { useNavigate } from "react-router-dom"
import { UPLOAD_ROUTES } from "../../constants/uploadRoutes"
import { Row, Col, Typography } from 'antd'
import { productService } from '../../services/productService'


const VerticalsPage = () => {
    const { data, loading} = useVerticals()
    const navigate = useNavigate()
    const [productsByVertical, setProductsByVertical] = useState({})

    useEffect(() => {
        if (!data.length) return

        const fetchProducts = async () => {
            const result = {}
            for (const vertical of data) {
                try {
                    const response = await productService.list({ vertical: vertical._id })
                    result[vertical._id] = (response?.data || []).slice(0, 3)
                } catch (error) {
                    console.error(`Error cargando productos de ${vertical.name}:`, error)
                    result[vertical._id] = []
                }
            }
            setProductsByVertical(result)
        }

        fetchProducts()
    }, [data])

    return (
     <div style={{padding: '48px 24px', margin: 'auto', maxWidth: '1200'}}>
         <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Encuentra lo que necesitas<br></br> en nuestras verticales
         </Typography.Title>

         <Typography.Paragraph style={{ textAlign: 'center', color: '#666', marginBottom: 48 }}>
            Explora categorías seleccionadas y marcas destacadas.
         </Typography.Paragraph>
     

        <div>
            <Row gutter={[24, 24]} justify = "center">
                {data.map((vertical) => (
                    <Col key={vertical._id} xs={24} sm={12} lg={6}>
                        <div
                            onClick = {() => navigate(`/vertical/${vertical._id}`)}

                            style = {{
                                position: 'relative',
                                borderRadius: 15,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                height: 300
                            }}>

                                <img
                                    src={`${UPLOAD_ROUTES.verticals.banners}/${vertical.banner}`}
                                    alt = {`Vertical: ${vertical.name}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'top'}}
                                />


                                <div style = {{

                                    position: 'absolute',
                                    bottom: 0, left: 0, right: 0,
                                    padding: '15px'
                                }}>
                                    <img
                                    src={`${UPLOAD_ROUTES.verticals.icons}/${vertical.icon}`}
                                    alt = {`Icono ${vertical.name}`}
                                    style={{ width: 24, height: 24 }}
                                    />

                                    <div>
                                        <div style = {{fontWeight: 600}}>{vertical.name}</div>
                                        <div style = {{fontSize: 12, color: '#000'}}>Explorar</div>
                                    </div>
                                </div>
                        </div>
                    </Col>
                ))}

            </Row>

            <div style = {{marginTop: 60}}>
                <Typography.Title level={3}>
                    Destacados por vertical
                </Typography.Title>

                <Row>
                    {data.map((vertical) => {
                        const productos = productsByVertical[vertical._id] || []


                        return (
                            <Col key={vertical._id} xs={24} sm={12} lg={6}>
                                <div style={{ background: '#ffffff', borderRadius: 12, padding: 16 }}>
                                    <div style= {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
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

                                    <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 4}}>Tiendas destacadas</div>
                                    <div style={{ fontSize: 12, color: '#444', cursor: 'pointer' }}>
                                        {productos.map((p) => p.store?.name || 'Tienda').join(' • ')}
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>

        </div>
      </div>

      
    )
}


export default VerticalsPage