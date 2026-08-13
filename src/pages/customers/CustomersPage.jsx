import { Card, Segmented, Space, Table, Tag, Typography } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'
import { newsletterService } from '../../services/newsletterService'
import {
  FullWidthSpace,
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  SearchInput,
} from '../../styles/dashboardStyles'

const PageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

const SummaryItem = styled.div`
  border: 1px solid #eef0f4;
  border-radius: 8px;
  padding: 14px 16px;
  background: #fbfcfe;
`

const SummaryValue = styled(Typography.Title).attrs({
  level: 4,
})`
  && {
    margin: 0;
  }
`

const formatDate = value => {
  if (!value) return '-'

  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(value))
}

const flattenCustomers = customers => {
  return customers.flatMap(customer => {
    const subscriptions = customer.subscriptions?.length
      ? customer.subscriptions
      : [{ scope: customer.source || 'global' }]

    return subscriptions.map((subscription, index) => ({
      key: `${customer._id}-${subscription.couponCode || index}`,
      email: customer.email,
      name: customer.name,
      scope: subscription.scope,
      source: subscription.source || customer.source,
      store: subscription.store?.name || '',
      couponCode: subscription.couponCode,
      usedCount: subscription.coupon?.usedCount || 0,
      lastUsedAt: subscription.coupon?.lastUsedAt,
      lastOrderNumber: subscription.coupon?.lastOrderNumber,
      subscribedAt: subscription.subscribedAt || customer.createdAt,
    }))
  })
}

const CustomersPage = () => {
  const { translate } = useDictionaryTranslation()
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [usageFilter, setUsageFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const debouncedSearch = useDebouncedValue(search)

  const loadCustomers = useCallback(async value => {
    setLoading(true)

    try {
      const response = await newsletterService.list({ search: value || undefined })
      setCustomers(response.data || [])
    } catch (error) {
      console.error(error)
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCustomers(debouncedSearch)
  }, [debouncedSearch, loadCustomers])

  const rows = useMemo(() => flattenCustomers(customers), [customers])
  const visibleRows = useMemo(() => {
    if (usageFilter === 'used') return rows.filter(row => row.usedCount > 0)
    if (usageFilter === 'unused') return rows.filter(row => row.usedCount === 0)

    return rows
  }, [rows, usageFilter])
  const summary = useMemo(() => ({
    total: customers.length,
    usedCustomers: rows.filter(row => row.usedCount > 0).length,
    couponUses: rows.reduce((total, row) => total + row.usedCount, 0),
  }), [customers.length, rows])

  const renderUsage = value => {
    if (value === 1) return translate('customers.usage.single')
    if (value > 1) return `${value} ${translate('customers.usage.multiple')}`

    return translate('customers.usage.empty')
  }

  const columns = [
    {
      title: translate('customers.table.customer'),
      dataIndex: 'email',
      render: (email, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{email}</Typography.Text>
          {record.name && <Typography.Text type="secondary">{record.name}</Typography.Text>}
        </Space>
      ),
    },
    {
      title: translate('customers.table.origin'),
      dataIndex: 'scope',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Tag>{record.scope === 'store'
            ? translate('customers.origin.store')
            : translate('customers.origin.marketplace')}
          </Tag>
          {record.store && <Typography.Text type="secondary">{record.store}</Typography.Text>}
        </Space>
      ),
    },
    {
      title: translate('customers.table.coupon'),
      dataIndex: 'couponCode',
      render: value => value || '-',
    },
    {
      title: translate('customers.table.usage'),
      dataIndex: 'usedCount',
      render: value => (
        <Tag color={value > 0 ? 'green' : 'default'}>
          {renderUsage(value)}
        </Tag>
      ),
    },
    {
      title: translate('customers.table.lastUsage'),
      dataIndex: 'lastUsedAt',
      render: (value, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{formatDate(value)}</Typography.Text>
          {record.lastOrderNumber && (
            <Typography.Text type="secondary">{record.lastOrderNumber}</Typography.Text>
          )}
        </Space>
      ),
    },
    {
      title: translate('customers.table.subscription'),
      dataIndex: 'subscribedAt',
      render: formatDate,
    },
  ]

  return (
    <PageStack>
      <PageHeader>
        <PageIntro>
          <PageTitle>{translate('customers.title')}</PageTitle>
          <PageDescription>
            {translate('customers.subtitle')}
          </PageDescription>
        </PageIntro>
        <Segmented
          value={usageFilter}
          onChange={setUsageFilter}
          options={[
            { label: translate('customers.filterAll'), value: 'all' },
            { label: translate('customers.filterUsed'), value: 'used' },
            { label: translate('customers.filterUnused'), value: 'unused' },
          ]}
        />
      </PageHeader>

      <Card>
        <FullWidthSpace>
          <SummaryGrid>
            <SummaryItem>
              <Typography.Text type="secondary">{translate('customers.total')}</Typography.Text>
              <SummaryValue>{summary.total}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <Typography.Text type="secondary">{translate('customers.withCouponUsed')}</Typography.Text>
              <SummaryValue>{summary.usedCustomers}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <Typography.Text type="secondary">{translate('customers.couponUses')}</Typography.Text>
              <SummaryValue>{summary.couponUses}</SummaryValue>
            </SummaryItem>
          </SummaryGrid>

          <SearchInput
            allowClear
            placeholder={translate('customers.searchPlaceholder')}
            value={search}
            onChange={event => setSearch(event.target.value)}
            onSearch={setSearch}
            $width={360}
          />

          <Table
            rowKey="key"
            columns={columns}
            dataSource={visibleRows}
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 760 }}
          />
        </FullWidthSpace>
      </Card>
    </PageStack>
  )
}

export default CustomersPage
