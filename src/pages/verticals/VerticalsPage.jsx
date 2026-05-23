import { useEffect, useState } from 'react'
import useVerticals from "./hooks/useVerticals"
import { Typography } from 'antd'
import { productService } from '../../services/productService'
import VerticalsGrid from './components/VerticalsGrid'
import FeaturedProducts from './components/FeaturedProducts'


const VerticalsPage = () => {
    const { data, loading} = useVerticals()
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
            <VerticalsGrid data={data} />

            <div style={{ marginTop: 60 }}>
                <Typography.Title level={3}>
                    Destacados por vertical
                </Typography.Title>
                <FeaturedProducts data={data} productsByVertical={productsByVertical} />
            </div>
        </div>
      </div>

      
    )
}


export default VerticalsPage