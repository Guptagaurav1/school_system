import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
    const [refresh, setRefresh] = useState(false);

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin"
        description="Basic Tables page"
      />

      <PageBreadcrumb pageTitle="Basic Tables" />

      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          {/* pass refresh safely */}
          <BasicTableOne refresh={refresh}  />
        </ComponentCard>
      </div>
    </>
  );
}
