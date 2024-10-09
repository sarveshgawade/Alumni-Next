import React, { useState } from "react";
import axiosInstance from '../Helpers/axiosInstance';

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null); // State for storing the thumbnail

  // Handle the image selection for the gallery images
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle the image selection for the thumbnail
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
  };

  // Remove an image from the list
  const removeImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append the thumbnail if it exists
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    // Append the images
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    // Send the form data to the backend
    try {
      const response = await axiosInstance.post('/event/add', formData);
      console.log(response?.data);
      
      // Log the URLs of the uploaded images
      response.data?.images?.forEach((el) => console.log(el?.secure_url));
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* Thumbnail Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="thumbnail">
            Upload Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Multiple Images Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="images">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Preview the selected images */}
        {selectedImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;
