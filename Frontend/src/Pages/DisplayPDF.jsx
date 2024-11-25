import React, { useEffect, useState } from "react";
import axiosInstance from "../Helpers/axiosInstance";

const DisplayPDF = ({ pdfId }) => {
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axiosInstance.get(`/pdf/67446d744a12084d8d7b3547`);
        const data = response.data
        console.log(data);
        

        if (response.data.success) {
          setPdfData(`data:${data.contentType};base64,${data.pdfData}`);
        //   console.log(`data:${data.contentType};base64,${data.pdfData}`);
          
        } else {
          console.error(data.message || "Failed to load PDF");
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPDF();
  }, []);

  return (
    <div className="w-full h-screen">
      {pdfData ? (
        <iframe src={pdfData} className="w-full h-full" title="PDF Viewer"></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default DisplayPDF;
