import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Space, Typography, message } from 'antd'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { experienceService } from '../../services/experienceService'

const Panel = styled.section`
  background: #fff;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 16px;
  padding: 22px;
`

const { RangePicker } = DatePicker

const disabledPastDate = current => current && current < dayjs().startOf('day')

const ExperienceBookingForm = ({ experience, compact = false, title = 'Solicitar reserva' }) => {
  const [form] = Form.useForm()

  const handleSubmit = async values => {
    const [checkIn, checkOut] = values.dates || []

    try {
      await experienceService.createBooking({
        listing: experience._id,
        customer: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          city: values.city,
        },
        stay: {
          checkIn: checkIn?.format('YYYY-MM-DD'),
          checkOut: checkOut?.format('YYYY-MM-DD'),
          guests: values.guests,
        },
        message: values.message,
        consentAccepted: values.consentAccepted,
      })

      message.success('Solicitud enviada. Te contactaremos pronto.')
      form.resetFields()
    } catch (error) {
      message.error(error?.message || 'No se pudo enviar la solicitud')
    }
  }

  return (
    <Panel>
      <Space direction="vertical" size={compact ? 12 : 18} style={{ width: '100%' }}>
        <div>
          <Typography.Title level={compact ? 4 : 3} style={{ margin: 0, letterSpacing: 0 }}>
            {title}
          </Typography.Title>
          <Typography.Text type="secondary">
            Deja tus datos y validamos disponibilidad antes de confirmar.
          </Typography.Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{ guests: 2, consentAccepted: true }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Fechas" name="dates" rules={[{ required: true, message: 'Selecciona las fechas' }]}>
            <RangePicker
              style={{ width: '100%' }}
              disabledDate={disabledPastDate}
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item label="Personas" name="guests" rules={[{ required: true }]}>
            <InputNumber min={1} max={experience.capacityGuests || 50} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Telefono" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Ciudad" name="city">
            <Input />
          </Form.Item>

          <Form.Item label="Mensaje" name="message">
            <Input.TextArea rows={3} placeholder="Cuentanos que fecha o plan tienes en mente" />
          </Form.Item>

          <Form.Item
            name="consentAccepted"
            valuePropName="checked"
            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Debes aceptar el tratamiento de datos')) }]}
          >
            <Checkbox>Acepto ser contactado para continuar con la reserva.</Checkbox>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Enviar solicitud
          </Button>
        </Form>
      </Space>
    </Panel>
  )
}

export default ExperienceBookingForm
