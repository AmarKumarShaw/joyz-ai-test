import React from "react";

const MainTable = ({ fileData }) => {
    //  Role-specific colors
    const roleColors = {
        Admin: "bg-red-200 text-red-800",
        Manager: "bg-green-200 text-green-800",
        Caller: "bg-blue-200 text-blue-800",
        Root: "bg-purple-200 text-purple-800",
        default: "bg-gray-200 text-gray-800",
    };

    return (
        <div className="flex items-center justify-center">
            <div className="relative w-11/12 overflow-x-auto md:overflow-x-hidden flex flex-col items-center my-8">
            <h2 className="text-4xl font-bold text-[#4C63DE] py-4">Main Report</h2>
            <div className="overflow-x-auto w-full">
                <table className="table-auto border border-gray-300 shadow-md rounded-lg w-full text-sm text-left text-gray-500">
                    <thead className="text-md text-white uppercase bg-[#4C63DE]">
                        <tr className="">
                            <th className="text-start px-6 py-4 font-semibold">Email</th>
                            <th className="text-start px-6 py-4 font-semibold">Full Name</th>
                            <th className="text-start px-6 py-4 font-semibold">Role</th>
                            <th className="text-start px-6 py-4 font-semibold">Reports To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileData.length > 0 ? (
                            fileData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 
                                    transition-transform duration-200 transform hover:scale-[1.02]
                                    `}
                                >
                                    <td className="px-6 py-3 text-gray-700">{row.Email}</td>
                                    <td className="px-6 py-3 text-gray-700">{row.FullName}</td>
                                    <td
                                        className={`text-start font-semibold `}
                                    >
                                        <span
                                            className={`py-2 px-3 rounded-lg ${
                                                roleColors[row.Role] || roleColors.default
                                            }`}
                                        >
                                            {row.Role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-gray-700">
                                        {row.ReportsTo || "N/A"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-4 text-center text-gray-500 bg-gray-50"
                                >
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default MainTable;
