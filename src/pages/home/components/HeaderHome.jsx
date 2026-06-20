import { Hero } from '../../public/homePage/style/style'
import { Button, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'

const HeaderHome = () => {
    const { translate: t } = useDictionaryTranslation()

    return (
        <>

            <Hero>

                <Space direction="vertical" size={24}>
                    <Typography.Text type="secondary">Marketplace multi-vertical</Typography.Text>
                    <Typography.Title style={{ fontSize: 64, lineHeight: 1, letterSpacing: '-.07em', margin: 0 }}>
                        Una plataforma para múltiples marcas.
                    </Typography.Title>
                    <Typography.Paragraph style={{ fontSize: 18, color: '#555', maxWidth: 650 }}>
                        Vende productos desde diferentes verticales, permite que cada tienda tenga su espacio propio y mantén un solo backend, un solo frontend y una sola base escalable.
                    </Typography.Paragraph>
                    <Space>
                        <Link to={ROUTES.MARKETPLACE}><Button type="primary" size="large">Explorar productos</Button></Link>
                        <Link to={ROUTES.STORES}><Button size="large">Ver tiendas</Button></Link>
                    </Space>
                </Space>

            </Hero>

        </>
    )
}

export default HeaderHome
