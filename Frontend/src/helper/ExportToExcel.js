import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, fileName = "data") => {
  try {
    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create blob and download
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, `${fileName}.xlsx`);
  } catch (error) {
    console.error("Excel export failed:", error);
  }
};