import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import StatusTag from '../../../components/common/StatusTag'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import {
  DetailHeader,
  HeaderActions,
  HeaderInfo,
  HeaderMeta,
  OrderNumber,
  StatusRow,
} from '../style'

const OrderDetailHeader = ({ title, subtitle, statuses = [], onBack, children }) => {
  const { translate } = useDictionaryTranslation()

  return (
    <DetailHeader>
      <HeaderInfo>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack}>
          {translate('orders.actions.back')}
        </Button>

        <OrderNumber>{title}</OrderNumber>

        {subtitle && <HeaderMeta>{subtitle}</HeaderMeta>}

        <StatusRow>
          {statuses.filter(Boolean).map((status, index) => (
            <StatusTag key={`${status}-${index}`} status={status} />
          ))}
        </StatusRow>
      </HeaderInfo>

      {children && <HeaderActions>{children}</HeaderActions>}
    </DetailHeader>
  )
}

export default OrderDetailHeader
