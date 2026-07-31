import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Switch,
  Typography,
  message,
} from 'antd'
import { BriefcaseBusiness, Plus, ShieldCheck } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import ImageUploadField from '../../components/uploads/ImageUploadField/ImageUploadField'
import { UPLOAD_FOLDERS, UPLOAD_ROUTES, getUploadUrl } from '../../constants/uploadRoutes'
import { brokerService } from '../../services/brokerService'

const DEFAULT_SPECIALTIES = [
  {
    title: 'Credito vehicular',
    description: 'Acompanamiento para comprar carro o moto con financiacion.',
  },
  {
    title: 'Perfil financiero',
    description: 'Revision de ingresos, capacidad de pago y documentos base.',
  },
]

const ProfilePreview = styled(Card)`
  .ant-card-body {
    display: flex;
    gap: 18px;
    align-items: center;
  }

  @media (max-width: 640px) {
    .ant-card-body {
      align-items: flex-start;
      flex-direction: column;
    }
  }
`

const SpecialtyBox = styled.div`
  border: 1px solid #edf0f2;
  border-radius: 16px;
  padding: 16px;
  background: #fff;
`

const getSpecialties = profile => {
  const specialties = Array.isArray(profile?.specialties)
    ? profile.specialties.filter(item => item?.title)
    : []

  return specialties.length ? specialties : DEFAULT_SPECIALTIES
}

const getProfileValues = profile => ({
  slug: profile?.slug,
  displayName: profile?.displayName,
  title: profile?.title,
  companyName: profile?.companyName,
  profileImage: profile?.profileImage || '',
  summary: profile?.summary,
  city: profile?.city,
  phone: profile?.phone,
  whatsapp: profile?.whatsapp,
  email: profile?.email,
  experienceYears: profile?.experienceYears || 0,
  completedCases: profile?.completedCases || 0,
  servicesText: (profile?.services || []).join('\n'),
  specialties: getSpecialties(profile),
  isPublished: profile?.isPublished !== false,
})

const BrokerProfilePage = () => {
  const [form] = Form.useForm()
  const profileImage = Form.useWatch('profileImage', form)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadProfile = useCallback(async () => {
    setLoading(true)

    try {
      const response = await brokerService.getMyProfile()
      setProfile(response.data)
      form.setFieldsValue(getProfileValues(response.data))
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar tu perfil')
    } finally {
      setLoading(false)
    }
  }, [form])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const handleSave = async values => {
    setSaving(true)

    try {
      const response = await brokerService.updateMyProfile({
        ...values,
        services: String(values.servicesText || '')
          .split('\n')
          .map(value => value.trim())
          .filter(Boolean),
        specialties: (values.specialties || [])
          .map(item => ({
            title: String(item?.title || '').trim(),
            description: String(item?.description || '').trim(),
          }))
          .filter(item => item.title),
      })

      setProfile(response.data)
      form.setFieldsValue(getProfileValues(response.data))
      message.success('Perfil actualizado correctamente')
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar tu perfil')
    } finally {
      setSaving(false)
    }
  }

  const avatarUrl = getUploadUrl(UPLOAD_ROUTES.brokers.profileImages, profileImage)

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Perfil broker
        </Typography.Title>
        <Typography.Text type="secondary">
          Completa tu perfil publico para que los clientes entiendan tu experiencia y como puedes asesorarlos.
        </Typography.Text>
      </div>

      <ProfilePreview loading={loading}>
        <Avatar
          size={82}
          src={avatarUrl}
          icon={<BriefcaseBusiness size={32} />}
          style={{ background: '#111', flex: '0 0 auto' }}
        />
        <div style={{ minWidth: 0 }}>
          <Space size={8} wrap>
            <ShieldCheck size={16} />
            <Typography.Text strong>Perfil profesional</Typography.Text>
          </Space>
          <Typography.Paragraph type="secondary" style={{ margin: '6px 0 0' }}>
            Publica una foto clara, una descripcion concreta y especialidades faciles de entender.
          </Typography.Paragraph>
          {profile?.publicPath && (
            <Typography.Paragraph copyable style={{ margin: '8px 0 0' }}>
              {`${window.location.origin}${profile.publicPath}`}
            </Typography.Paragraph>
          )}
        </div>
      </ProfilePreview>

      <Card loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            isPublished: true,
            experienceYears: 0,
            completedCases: 0,
            specialties: DEFAULT_SPECIALTIES,
          }}
        >
          <Row gutter={20}>
            <Col xs={24} lg={7}>
              <ImageUploadField
                label="Foto profesional"
                name="profileImage"
                folder={UPLOAD_FOLDERS.brokers.profileImages}
                uploadRoute={UPLOAD_ROUTES.brokers.profileImages}
                maxCount={1}
                multiple={false}
              />
              <Typography.Text type="secondary">
                Puedes subir PNG, JPG o WEBP. Usaremos una version optimizada para la web.
              </Typography.Text>
            </Col>

            <Col xs={24} lg={17}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Nombre visible" name="displayName" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
                    <Input addonBefore="/brokers/" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Titulo profesional" name="title">
                    <Input placeholder="Asesor de credito vehicular" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Empresa o marca" name="companyName">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Ciudad" name="city">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Telefono" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="WhatsApp" name="whatsapp">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Correo publico" name="email">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Item label="Anos de experiencia" name="experienceYears">
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Item label="Casos asesorados" name="completedCases">
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Perfil publicado" name="isPublished" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />

          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item label="Descripcion profesional" name="summary">
                <Input.TextArea
                  rows={6}
                  placeholder="Cuenta en pocas lineas que tipo de clientes acompanas y como es tu proceso."
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="Servicios" name="servicesText" extra="Escribe un servicio por linea.">
                <Input.TextArea rows={6} />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Especialidades</Divider>

          <Form.List name="specialties">
            {(fields, { add, remove }) => (
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Row gutter={[16, 16]}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Col xs={24} md={12} key={key}>
                      <SpecialtyBox>
                        <Form.Item
                          {...restField}
                          label="Titulo"
                          name={[name, 'title']}
                          rules={[{ required: true, message: 'Escribe una especialidad' }]}
                        >
                          <Input placeholder="Credito vehicular" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="Descripcion"
                          name={[name, 'description']}
                        >
                          <Input.TextArea rows={3} placeholder="Explica brevemente esta especialidad." />
                        </Form.Item>
                        <Button type="text" danger onClick={() => remove(name)}>
                          Quitar
                        </Button>
                      </SpecialtyBox>
                    </Col>
                  ))}
                </Row>

                <Button icon={<Plus size={16} />} onClick={() => add({ title: '', description: '' })}>
                  Agregar especialidad
                </Button>
              </Space>
            )}
          </Form.List>

          <Divider />

          <Button type="primary" htmlType="submit" loading={saving}>
            Guardar perfil
          </Button>
        </Form>
      </Card>
    </Space>
  )
}

export default BrokerProfilePage
