import { Button, Card, Form, Input, Space, Typography, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { ROLES } from '../../constants/roles'
import { ROUTES } from '../../constants/routes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { login } from '../../store/slices/authSlice'
import { PageShell } from '../../styles/layoutStyles'

const redirectByRole = {
  [ROLES.ADMIN.value]: ROUTES.ADMIN_DASHBOARD,
  [ROLES.SELLER.value]: ROUTES.SELLER_DASHBOARD,
  [ROLES.BROKER.value]: ROUTES.BROKER_DASHBOARD,
  [ROLES.CUSTOMER.value]: ROUTES.MARKETPLACE,
}

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { translate } = useDictionaryTranslation()

  const loading = useSelector(state => state.auth.loading)
  const error = useSelector(state => state.auth.error)

  const handleSubmit = async values => {
    try {
      const response = await dispatch(login(values)).unwrap()
      const redirectTo = redirectByRole[response.user.role] || ROUTES.MARKETPLACE

      navigate(redirectTo, { replace: true })
    } catch (loginError) {
      message.error(loginError?.message || translate('auth.loginError'))
    }
  }

  return (
    <PageShell>
      <Card
        style={{ maxWidth: 480, margin: '0 auto', borderRadius: 20 }}
        bordered={false}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2}>
              {translate('auth.loginTitle')}
            </Typography.Title>

            <Typography.Paragraph type="secondary">
              {translate('auth.loginSubtitle')}
            </Typography.Paragraph>
          </div>

          {error && (
            <Typography.Text type="danger">
              {error}
            </Typography.Text>
          )}

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label={translate('auth.email')}
              name="email"
              rules={[
                { required: true, message: translate('auth.emailRequired') },
                { type: 'email', message: translate('auth.emailInvalid') },
              ]}
            >
              <Input autoComplete="email" />
            </Form.Item>

            <Form.Item
              label={translate('auth.password')}
              name="password"
              rules={[
                { required: true, message: translate('auth.passwordRequired') },
              ]}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {translate('auth.signIn')}
            </Button>
          </Form>

          <Typography.Text type="secondary">
            {translate('auth.noAccount')} <Link to={ROUTES.REGISTER}>{translate('auth.createAccount')}</Link>
          </Typography.Text>
        </Space>
      </Card>
    </PageShell>
  )
}

export default LoginPage
