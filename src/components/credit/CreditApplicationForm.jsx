import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, Space, Typography, message } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CREDIT_TYPE_OPTIONS } from '../../constants/creditApplications'
import { creditApplicationService } from '../../services/creditApplicationService'

const FormShell = styled.section`
  border: 1px solid #ececec;
  border-radius: 18px;
  background: #fff;
  padding: 24px;
`

const CONSENT_TEXT = 'Acepto ser contactado por un asesor para recibir orientacion sobre alternativas de credito. Entiendo que la aprobacion depende de entidades o aliados financieros autorizados.'

const CreditApplicationForm = ({
  brokerSlug,
  storeId,
  sourceType,
  title = 'Solicita asesoria de credito',
  subtitle = 'Dejanos tus datos y un asesor te contactara para orientarte.',
  compact = false,
}) => {
  const [form] = Form.useForm()

  const handleFinish = async values => {
    try {
      await creditApplicationService.create({
        brokerSlug,
        storeId,
        sourceType,
        ...values,
        consentAccepted: values.consentAccepted,
        consent: {
          accepted: values.consentAccepted,
          text: CONSENT_TEXT,
        },
      })

      form.resetFields()
      message.success('Solicitud enviada correctamente')
    } catch (error) {
      message.error(error?.message || 'No se pudo enviar la solicitud')
    }
  }

  return (
    <FormShell>
      <Space direction="vertical" size={18} style={{ width: '100%' }}>
        <div>
          <Typography.Title level={compact ? 4 : 3} style={{ margin: 0, letterSpacing: 0 }}>
            {title}
          </Typography.Title>
          <Typography.Text type="secondary">{subtitle}</Typography.Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{ creditType: 'vehicle' }}
          onFinish={handleFinish}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingresa tu nombre' }]}>
                <Input autoComplete="name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Correo"
                name="email"
                rules={[
                  { required: true, message: 'Ingresa tu correo' },
                  { type: 'email', message: 'Ingresa un correo valido' },
                ]}
              >
                <Input autoComplete="email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Telefono" name="phone" rules={[{ required: true, message: 'Ingresa tu telefono' }]}>
                <Input autoComplete="tel" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Ciudad" name="city">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Tipo de credito" name="creditType">
                <Select options={CREDIT_TYPE_OPTIONS} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Valor aproximado del activo" name="assetValue">
                <InputNumber min={0} prefix="$" controls={false} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Valor a financiar" name="requestedAmount">
                <InputNumber min={0} prefix="$" controls={false} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Cuota inicial" name="downPayment">
                <InputNumber min={0} prefix="$" controls={false} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Plazo estimado en meses" name="termMonths">
                <InputNumber min={0} controls={false} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Mensaje" name="message">
                <Input.TextArea rows={3} placeholder="Cuentanos que estas buscando o que quieres financiar." />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="consentAccepted"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) => value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Debes aceptar el tratamiento de datos')),
                  },
                ]}
              >
                <Checkbox>{CONSENT_TEXT}</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            Enviar solicitud
          </Button>
        </Form>
      </Space>
    </FormShell>
  )
}

CreditApplicationForm.propTypes = {
  brokerSlug: PropTypes.string,
  storeId: PropTypes.string,
  sourceType: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  compact: PropTypes.bool,
}

export default CreditApplicationForm
