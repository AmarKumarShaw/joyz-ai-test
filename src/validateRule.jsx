import React, { useState } from "react";
import * as XLSX from "xlsx";
import MainTable from "./components/MainTable";
import ErrorTable from "./components/Error";

const OrgChartValidator = () => {
  const [fileData, setFileData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [MessageError, setMessageError] = useState(null);

  // File Upload and XLSX to JSON
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file) {
      console.error("No file selected");
      setMessageError("No file selected");
      setLoading(true);
      return;
    }
    setMessageError(null);

    const fileType = file.name.split(".").pop().toLowerCase();
    if (!["xlsx", "csv"].includes(fileType)) {
      console.error("Invalid file type. Please upload a .xlsx or .csv file.");
      setMessageError("Invalid file type. Please upload a .xlsx or .csv file.");
      return;
    }

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      setFileData(sheetData);
      validateData(sheetData);
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const validateRoleHierarchy = (role, reportsToRole) => {
    if (role === "Root")
      return reportsToRole === null || reportsToRole === undefined;
    if (role === "Admin") return reportsToRole === "Root";
    if (role === "Manager") return ["Admin", "Manager"].includes(reportsToRole);
    if (role === "Caller") return reportsToRole === "Manager";
    return false;
  };

  //Validating Data
  const validateData = (data) => {
    const errors = [];
    const graph = {};
    const roles = {};

    data.forEach((row, index) => {
      const { Email, Role, ReportsTo } = row;

      const parentRole =
        data.find((parent) => parent.Email === ReportsTo)?.Role || null;

      if (!validateRoleHierarchy(Role, parentRole)) {
        errors.push({
          row: index + 1,
          message: `Invalid reporting: ${Role} → ${parentRole || "None"}`,
        });
      }
      // Build graph for cycle detection
      if (!graph[ReportsTo]) graph[ReportsTo] = [];
      graph[ReportsTo].push(Email);
      roles[Email] = Role;
    });

    // Detect cycles
    const visited = new Set();
    const dfs = (node, stack) => {
      if (stack.has(node)) {
        errors.push({ message: `Cycle detected involving ${node}` });
        return true;
      }
      if (visited.has(node)) return false;

      visited.add(node);
      stack.add(node);
      (graph[node] || []).forEach((child) => dfs(child, stack));
      stack.delete(node);
    };

    Object.keys(graph).forEach((node) => dfs(node, new Set()));
    setErrors(errors);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="py-6">
          <img
            className="h-14"
            src="https://joyz.ai/assets/images/logo-with-insignia.svg"
            alt=""
          />
        </div>
        <div className="text-start w-4/5">
          <label
            className="block text-start mb-2 p-4 py-0 text-lg font-medium text-gray-900"
            htmlFor="file_input"
          >
            Please Upload file here
          </label>
          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileUpload}
            className="block w-full p-4 rounded-lg shadow-lg text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none file:border-0 file:bg-[#4C63DE] file:text-white file:py-3 file:px-5 file:rounded-lg file:cursor-pointer hover:file:bg-[#4C63DE] focus:file:ring-2 focus:file:ring-[#4C63DE] transition duration-300 ease-in-out"
            id="file_input"
          />

          <p className="mt-1 p-4 py-0 text-md text-left text-gray-500">
            .csv and .xlsx only
          </p>
          {MessageError && <p className="text-red-500 px-4">{MessageError}</p>}
        </div>
      </div>

      {!loading && (
        <div>
          <MainTable fileData={fileData} />
          <ErrorTable errors={errors} />
        </div>
      )}
    </div>
  );
};

export default OrgChartValidator;
