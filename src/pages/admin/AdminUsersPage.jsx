import AppTable from '../../components/common/AppTable'

const rows = [
  { _id: '1', name: 'Admin Demo', email: 'admin@demo.com', role: 'admin' }
]

const AdminUsersPage = () => (
  <AppTable
    title="Usuarios"
    rows={rows}
    searchableFields={['name', 'email', 'role']}
    columns={[
      { title: 'Nombre', dataIndex: 'name' },
      { title: 'Email', dataIndex: 'email' },
      { title: 'Rol', dataIndex: 'role' }
    ]}
  />
)

export default AdminUsersPage
