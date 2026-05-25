import { Typography } from 'antd'

const VerticalHeader = () => {
    return (
        <>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Encuentra lo que necesitas<br></br> en nuestras verticales
            </Typography.Title>

            <Typography.Paragraph style={{ textAlign: 'center', color: '#666', marginBottom: 48 }}>
                Explora categorías seleccionadas y marcas destacadas.
            </Typography.Paragraph>

        </>
    )
}

export default VerticalHeader
