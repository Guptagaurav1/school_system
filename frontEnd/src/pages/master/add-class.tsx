import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import axiosInstance from "../../utils/axiosInstance";

export default function AddClass() {

    const [openModal, setOpenModal] = useState(false);
    const [createClass, setcreateClass] = useState({ className: "", section: "" })
    const [refresh, setRefresh] = useState(false);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setcreateClass((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const apiResult = await axiosInstance.post("api/class/createstudentclass", {
                className: createClass.className,
                section: createClass.section
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

            <PageBreadcrumb pageTitle="Class List" />

            {/* Add Class Button */}
            <div className="flex justify-end p-2 mb-2">
                <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                    Add class
                </button>
            </div>

            {/* Table */}
            <ComponentCard title="">
                <BasicTableOne refresh={refresh} />
            </ComponentCard>

            {/* MODAL */}
            {openModal && (
                <div className="fixed inset-0 bg-black/5 flex items-center justify-center z-50">
                    <div className="bg-white w-[450px] rounded-lg shadow-lg p-5">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Add New Class</h2>
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
                                <label className="block text-sm font-medium mb-2">Class Name</label>
                                <input
                                    type="text"
                                    name="className"
                                    value={createClass.className}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                    placeholder="Enter class name"
                                />

                                <label className="block text-sm font-medium mt-4 mb-2">Class Section</label>
                                <select
                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-white/5 dark:text-white"
                                    name="section"
                                    value={createClass.section}
                                    onChange={handleInputChange}
                                >
                                    <option value="">--Select Class--</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
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
