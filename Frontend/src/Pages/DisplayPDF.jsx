import React, { useEffect, useState } from "react";
import axiosInstance from "../Helpers/axiosInstance";
import { useLocation } from "react-router-dom";

const DisplayPDF = () => {
  const {state} = useLocation()
  const [pdfData,setPdfData] = useState('')
  

  useEffect(() => {

          setPdfData(`data:${state.contentType};base64,${state.data}`);

  }, []);

  return (
    <div className="w-full h-screen">
      {pdfData ? (
        <iframe src={pdfData} className="w-full h-full" title="PDF Viewer"></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
      Loading pdf
    </div>

    // <>etgsh </>
  );
};

export default DisplayPDF;
