import React from 'react'
import ComponentCard from '../../components/common/ComponentCard'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import BasicSudentList from "../../components/tables/BasicTables/studentTableList";

const studentlist = () => {
  return (
    <div>
        <PageBreadcrumb pageTitle='Student List'/>
        <ComponentCard title='Student List'>
           <BasicSudentList>
            
           </BasicSudentList>
        
        </ComponentCard>

  
    </div>
  )
}

export default studentlist