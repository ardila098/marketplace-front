import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, Typography, message } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PREFERRED_CONTACT_OPTIONS } from '../../constants/agencyLeads'
import { agencyLeadService } from '../../services/agencyLeadService'

const FormShell = styled.section`
  background: #fff;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 16px;
  padding: 22px;
`

const CONSENT_TEXT = 'Acepto ser contactado por la agencia o plataforma para recibir informacion sobre este anuncio.'

const AgencyLeadForm = ({
  item,
  title = 'Te interesa este anuncio?',
  subtitle = 'Dejanos tus datos y un asesor te contactara.',
  compact = false,
}) => {
  const [form] = Form.useForm()

  const handleFinish = async values => {
    try {
      await agencyLeadService.create({
        itemId: item?._id,
        sourceType: 'item_detail',
        name: values.name,
        email: values.email,
        phone: values.phone,
        city: values.city,
        budget: values.budget,
        preferredContact: values.preferredContact,
        preferredDate: values.preferredDate?.toISOString?.(),
        wantsFinancing: values.wantsFinancing,
        hasTradeIn: values.hasTradeIn,
        message: values.message,
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
          initialValues={{ preferredContact: 'whatsapp' }}
          onFinish={handleFinish}
        >
          <Row gutter={14}>
            <Col xs={24} md={12}>
              <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingresa tu nombre' }]}>
                <Input autoComplete="name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Telefono" name="phone" rules={[{ required: true, message: 'Ingresa tu telefono' }]}>
                <Input autoComplete="tel" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Correo" name="email" rules={[{ type: 'email', message: 'Ingresa un correo valido' }]}>
                <Input autoComplete="email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Ciudad" name="city">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Como prefieres que te contacten?" name="preferredContact">
                <Select options={PREFERRED_CONTACT_OPTIONS} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Presupuesto aproximado" name="budget">
                <InputNumber min={0} prefix="$" controls={false} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Fecha ideal para contacto/visita" name="preferredDate">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={0} style={{ marginTop: 30 }}>
                <Form.Item name="wantsFinancing" valuePropName="checked" style={{ marginBottom: 4 }}>
                  <Checkbox>Quiero opciones de credito</Checkbox>
                </Form.Item>
                <Form.Item name="hasTradeIn" valuePropName="checked" style={{ marginBottom: 0 }}>
                  <Checkbox>Tengo permuta o inmueble/vehiculo para entregar</Checkbox>
                </Form.Item>
              </Space>
            </Col>
            <Col xs={24}>
              <Form.Item label="Mensaje" name="message">
                <Input.TextArea rows={3} placeholder={`Estoy interesado en ${item?.title || 'este anuncio'}.`} />
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
            Solicitar informacion
          </Button>
        </Form>
      </Space>
    </FormShell>
  )
}

AgencyLeadForm.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  compact: PropTypes.bool,
}

export default AgencyLeadForm
