import { Button, Card, Input, Modal, Select, Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  BOOKING_REQUEST_STATUS_OPTIONS,
  getBookingStatusColor,
  getBookingStatusLabel,
} from '../../constants/experiences'
import { experienceService } from '../../services/experienceService'
import { currency } from '../../utils/formatters'

const formatDate = value => {
  if (!value) return '-'

  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(value))
}

const ExperienceBookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState('')
  const [noteBooking, setNoteBooking] = useState(null)
  const [noteText, setNoteText] = useState('')

  const loadBookings = useCallback(async value => {
    setLoading(true)

    try {
      const response = await experienceService.listBookings({ search: value || undefined })
      setBookings(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las reservas')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBookings()
  }, [loadBookings])

  const updateStatus = async (booking, status) => {
    setUpdatingId(booking._id)

    try {
      await experienceService.updateBooking(booking._id, { status })
      message.success('Estado actualizado')
      loadBookings(search)
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar la reserva')
    } finally {
      setUpdatingId('')
    }
  }

  const addNote = async () => {
    if (!noteText.trim()) return

    setUpdatingId(noteBooking._id)

    try {
      await experienceService.addBookingNote(noteBooking._id, noteText)
      message.success('Nota agregada')
      setNoteBooking(null)
      setNoteText('')
      loadBookings(search)
    } catch (error) {
      message.error(error?.message || 'No se pudo agregar la nota')
    } finally {
      setUpdatingId('')
    }
  }

  const summary = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter(booking => ['new', 'contacted', 'pending_payment'].includes(booking.status)).length,
    confirmed: bookings.filter(booking => booking.status === 'confirmed').length,
  }), [bookings])

  const columns = [
    {
      title: 'Cliente',
      render: (_, booking) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{booking.customer?.name}</Typography.Text>
          <Typography.Text type="secondary">{booking.customer?.email}</Typography.Text>
          <Typography.Text type="secondary">{booking.customer?.phone}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Experiencia',
      render: (_, booking) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{booking.listing?.title || booking.listingTitle}</Typography.Text>
          <Typography.Text type="secondary">{booking.store?.name || booking.storeName}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Fechas',
      render: (_, booking) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{formatDate(booking.stay?.checkIn)} - {formatDate(booking.stay?.checkOut)}</Typography.Text>
          <Typography.Text type="secondary">{booking.stay?.guests || 1} personas</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Valor',
      dataIndex: 'estimatedValue',
      render: value => currency(value),
    },
    {
      title: 'Estado',
      render: (_, booking) => (
        <Select
          value={booking.status}
          loading={updatingId === booking._id}
          options={BOOKING_REQUEST_STATUS_OPTIONS}
          onChange={status => updateStatus(booking, status)}
          style={{ minWidth: 170 }}
        />
      ),
    },
    {
      title: 'Etiqueta',
      render: (_, booking) => (
        <Tag color={getBookingStatusColor(booking.status)}>
          {getBookingStatusLabel(booking.status)}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, booking) => (
        <Button onClick={() => setNoteBooking(booking)}>
          Nota
        </Button>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Reservas
        </Typography.Title>
        <Typography.Text type="secondary">
          Solicitudes de experiencias para contactar, confirmar o cerrar.
        </Typography.Text>
      </div>

      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space wrap>
            <Tag>Total: {summary.total}</Tag>
            <Tag color="gold">Pendientes: {summary.pending}</Tag>
            <Tag color="green">Confirmadas: {summary.confirmed}</Tag>
          </Space>

          <Input.Search
            allowClear
            value={search}
            placeholder="Buscar por cliente, email o telefono"
            onChange={event => {
              setSearch(event.target.value)
              if (!event.target.value) loadBookings('')
            }}
            onSearch={loadBookings}
            style={{ maxWidth: 420 }}
          />

          <Table
            rowKey="_id"
            columns={columns}
            dataSource={bookings}
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 980 }}
          />
        </Space>
      </Card>

      <Modal
        title="Agregar nota"
        open={!!noteBooking}
        onCancel={() => {
          setNoteBooking(null)
          setNoteText('')
        }}
        onOk={addNote}
        okText="Guardar"
        confirmLoading={updatingId === noteBooking?._id}
      >
        <Input.TextArea
          rows={4}
          value={noteText}
          onChange={event => setNoteText(event.target.value)}
          placeholder="Escribe el seguimiento de esta solicitud"
        />
      </Modal>
    </Space>
  )
}

export default ExperienceBookingsPage
