import React from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard';
import Usertable from "../../components/tables/BasicTables/UserTableone";


const UserList = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle='User List'>

      </PageBreadcrumb>
      <ComponentCard title=''>
        <Usertable/>

      </ComponentCard>

    </div>
  )
}

export default UserList