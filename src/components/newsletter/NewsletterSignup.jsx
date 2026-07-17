import { Alert, Button, Form, Input, Typography } from 'antd'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { newsletterService } from '../../services/newsletterService'

const Wrapper = styled.section`
  border-top: 1px solid rgba(17, 24, 39, 0.08);
  border-bottom: 1px solid rgba(17, 24, 39, 0.08);
  padding: 22px 0;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 420px);
  gap: 22px;
  align-items: center;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`

const Heading = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const IconBox = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.primaryColor || '#111111'};
  background: ${({ theme }) => theme.surfaceColor || '#f7f7f8'};
  flex: 0 0 auto;
`

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor || '#111827'};
  font-size: 17px;
  font-weight: 650;
  line-height: 1.25;
  margin: 0 0 4px;
`

const Description = styled.p`
  color: ${({ theme }) => theme.mutedTextColor || '#6b7280'};
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`

const InlineForm = styled(Form)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: start;

  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-input,
  .ant-btn {
    border-radius: 999px;
    height: 40px;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;

    .ant-btn {
      width: 100%;
    }
  }
`

const NewsletterSignup = ({
  source = 'marketplace',
  store,
  storeSlug,
  title,
}) => {
  const { translate } = useDictionaryTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const activeStoreSlug = storeSlug || store?.slug

  const handleSubmit = async values => {
    setLoading(true)
    setResult(null)

    try {
      const response = await newsletterService.subscribe({
        email: values.email,
        source,
        storeSlug: activeStoreSlug,
      })

      setResult({
        type: 'success',
        couponCode: response.data?.couponCode,
        alreadySubscribed: response.data?.alreadySubscribed,
      })
      form.resetFields()
    } catch (error) {
      setResult({
        type: 'error',
        message: error?.message || translate('newsletter.error'),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Content>
        <Heading>
          <IconBox>
            <Mail size={17} />
          </IconBox>
          <div>
            <Title>{title || translate(store ? 'newsletter.storeTitle' : 'newsletter.title')}</Title>
            <Description>{translate('newsletter.subtitle')}</Description>
          </div>
        </Heading>

        <div>
          <InlineForm form={form} onFinish={handleSubmit}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: translate('orders.lookup.emailRequired') },
                { type: 'email', message: translate('orders.lookup.emailInvalid') },
              ]}
            >
              <Input placeholder={translate('newsletter.emailPlaceholder')} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {translate('newsletter.submit')}
            </Button>
          </InlineForm>

          {result?.type === 'success' && (
            <Alert
              style={{ marginTop: 12 }}
              type="success"
              showIcon
              message={`${translate(result.alreadySubscribed ? 'newsletter.alreadySubscribed' : 'newsletter.success')} ${result.couponCode || ''}`}
            />
          )}

          {result?.type === 'error' && (
            <Alert
              style={{ marginTop: 12 }}
              type="error"
              showIcon
              message={result.message}
            />
          )}

          <Typography.Text type="secondary" style={{ display: 'block', marginTop: 8, fontSize: 12 }}>
            {translate('newsletter.privacy')}
          </Typography.Text>
        </div>
      </Content>
    </Wrapper>
  )
}

export default NewsletterSignup
