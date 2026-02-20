import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableRole from "../../components/tables/BasicTables/RoleBasicTable";
import axiosInstance from "../../utils/axiosInstance";

export default function AddRole() {

    const [openModal, setOpenModal] = useState(false);
    const [createRole, setcreateRole] = useState({ role_name: "", full_name: "" })
    const [refresh, setRefresh] = useState(false);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setcreateRole((prevValue) => ({
            ...prevValue, [name]: value
        }))
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const apiResult = await axiosInstance.post("api/role/createrole",{
                Role_name:createRole.role_name,
                Full_name:createRole.full_name
            })
            setRefresh(prev => !prev);  
            setOpenModal(false)
            alert(apiResult.data.message)
            console.log(apiResult)
           

        } catch (error) {
            console.log(error)

        }

    };


    return (
        <div>
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />

            <PageBreadcrumb pageTitle="Role List" />

            {/* Add Class Button */}
            <div className="flex justify-end p-2 mb-2">
                <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                    Add Role
                </button>
            </div>

            {/* Table */}
            <ComponentCard title="">
                <BasicTableRole  refresh={refresh}/>
            </ComponentCard>

            {/* MODAL */}
            {openModal && (
                <div className="fixed inset-0 bg-black/5 flex items-center justify-center z-50">
                    <div className="bg-white w-[450px] rounded-lg shadow-lg p-5">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Add New Role</h2>
                            <button
                                onClick={() => setOpenModal(false)}
                                className="text-gray-600 hover:text-red-500"
                            >
                                ✕
                            </button>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label className="block text-sm font-medium mb-2">Role  Name</label>
                                <input
                                    type="text"
                                    name="role_name"
                                    value={createRole.role_name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                    placeholder="Enter Role / Slug small letter"
                                />

                                <label className="block text-sm font-medium mt-4 mb-2">Role Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={createRole.full_name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                    placeholder="Enter Full name"
                                />
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="px-3 py-1 border rounded"
                                >
                                    Cancel
                                </button>
                                <button className="px-3 py-1 bg-blue-600 text-white rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
