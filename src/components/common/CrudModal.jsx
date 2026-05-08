import { Form, Modal } from 'antd'

const CrudModal = ({ open, title, children, initialValues, loading, onCancel, onSubmit, width = 720 }) => {
  const [form] = Form.useForm()

  const handleOk = async () => {
    const values = await form.validateFields()
    onSubmit(values)
  }

  return (
    <Modal
      open={open}
      title={title}
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnHidden
      width={width}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        {children}
      </Form>
    </Modal>
  )
}

export default CrudModal
