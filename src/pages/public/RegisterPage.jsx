import { Button, Card, Form, Input, Segmented, Space, Typography, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { ROLES } from '../../constants/roles'
import { ROUTES } from '../../constants/routes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { register as registerAccount } from '../../store/slices/authSlice'
import { PageShell } from '../../styles/layoutStyles'

const redirectByRole = {
  [ROLES.ADMIN.value]: ROUTES.ADMIN_DASHBOARD,
  [ROLES.SELLER.value]: ROUTES.SELLER_DASHBOARD,
  [ROLES.CUSTOMER.value]: ROUTES.MARKETPLACE,
}

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { translate } = useDictionaryTranslation()
  const [form] = Form.useForm()

  const selectedRole = Form.useWatch('role', form) || ROLES.CUSTOMER.value
  const loading = useSelector(state => state.auth.loading)

  const handleSubmit = async values => {
    try {
      const response = await dispatch(registerAccount(values)).unwrap()
      const redirectTo = redirectByRole[response.user.role] || ROUTES.MARKETPLACE

      message.success(translate('auth.registerSuccess'))
      navigate(redirectTo, { replace: true })
    } catch (error) {
      message.error(error?.message || translate('auth.registerError'))
    }
  }

  return (
    <PageShell>
      <Card
        bordered={false}
        style={{ maxWidth: 520, margin: '0 auto', borderRadius: 20 }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2}>
              {translate('auth.registerTitle')}
            </Typography.Title>
            <Typography.Paragraph type="secondary">
              {translate('auth.registerSubtitle')}
            </Typography.Paragraph>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ role: ROLES.CUSTOMER.value }}
          >
            <Form.Item
              label={translate('auth.accountType')}
              name="role"
              rules={[{ required: true, message: translate('auth.accountTypeRequired') }]}
            >
              <Segmented
                block
                options={[
                  {
                    label: translate('auth.customerAccount'),
                    value: ROLES.CUSTOMER.value,
                  },
                  {
                    label: translate('auth.sellerAccount'),
                    value: ROLES.SELLER.value,
                  },
                ]}
              />
            </Form.Item>

            <Typography.Paragraph type="secondary">
              {selectedRole === ROLES.SELLER.value
                ? translate('auth.sellerAccountHint')
                : translate('auth.customerAccountHint')}
            </Typography.Paragraph>

            <Form.Item
              label={translate('auth.name')}
              name="name"
              rules={[{ required: true, message: translate('auth.nameRequired') }]}
            >
              <Input autoComplete="name" />
            </Form.Item>

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

            <Form.Item label={translate('auth.phone')} name="phone">
              <Input autoComplete="tel" />
            </Form.Item>

            <Form.Item
              label={translate('auth.password')}
              name="password"
              rules={[
                { required: true, message: translate('auth.passwordRequired') },
                { min: 6, message: translate('auth.passwordMin') },
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} block>
              {translate('auth.createAccount')}
            </Button>
          </Form>

          <Typography.Text type="secondary">
            {translate('auth.haveAccount')} <Link to={ROUTES.LOGIN}>{translate('auth.signIn')}</Link>
          </Typography.Text>
        </Space>
      </Card>
    </PageShell>
  )
}

export default RegisterPage
