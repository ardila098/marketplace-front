import { Button, Col, Input, Row, Space, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'


const AppTable = ({
  columns = [],
  tableData,
  rowKey = '_id',
  searchPlaceholder = 'Buscar...',
  createPlaceholder = 'Crear Item',
  handleCreate,
  onChange
}) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>


      <Col md={24}>
        <Row>
          <Col md={12}>
            <Input.Search
              placeholder={searchPlaceholder}
              value={tableData?.search}
              onChange={event => tableData.handleSearch(event.target.value)}
              allowClear
              style={{ maxWidth: 320 }}
            />
          </Col>

          <Col md={12}>
            <Row justify={'end'}>

              <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                {createPlaceholder}
              </Button>
            </Row>
          </Col>
        </Row>


      </Col>


      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={tableData?.rows}
        loading={tableData?.loading}
        pagination={{
          current: tableData?.page,
          pageSize: tableData?.pageSize,
          total: tableData?.total,
          showSizeChanger: true,
        }}
        onChange={onChange}
      />
    </Space>
  )
}

export default AppTable