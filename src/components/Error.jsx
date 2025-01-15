import React from "react";

const ErrorTable = ({ errors }) => {
    return (
        <div className="relative overflow-x-auto flex flex-col items-center my-8">
            <h2 className="text-4xl font-bold text-[#E63946] py-4">Error Report</h2>
            <table className="table-auto border border-gray-300 shadow-lg rounded-lg w-11/12 text-sm text-left text-gray-700">
                <thead className="text-md text-white uppercase bg-gradient-to-r from-[#E63946] to-[#F37272]">
                    <tr>
                        <th className="text-center px-6 py-4 font-semibold tracking-wide">Row</th>
                        <th className="text-center px-6 py-4 font-semibold tracking-wide">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {errors.length > 0 ? (
                        errors.map((error, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } hover:bg-gray-200 transition-transform duration-200 transform hover:scale-[1.02]`}
                            >
                                <td className="px-6 py-3 text-center font-medium text-gray-800">
                                    <span className="bg-[#F37272] text-white px-3 py-1 rounded-full text-sm">
                                    Row: {error.row || "N/A"}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-center text-gray-800">
                                    <span className="inline-block px-4 py-2 rounded-md bg-[#FFE5E5] text-[#E63946] shadow-sm">
                                        {error.message}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="2"
                                className="px-6 py-4 text-center text-gray-600 bg-gray-50 italic"
                            >
                                No errors found!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ErrorTable;

