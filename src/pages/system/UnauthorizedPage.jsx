import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const UnauthorizedPage = () => (
  <Result
    status="403"
    title="No tienes acceso"
    subTitle="Tu usuario no tiene permisos para ver este módulo."
    extra={<Link to={ROUTES.HOME}><Button type="primary">Volver al inicio</Button></Link>}
  />
)

export default UnauthorizedPage
