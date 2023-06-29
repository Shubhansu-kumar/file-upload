import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const App = () => {
  const [image, setImage] = useState([]);

  const handleDrop = (acceptedFiles) => {
    const images = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setImage((prevImages) => [...prevImages, ...images]);
  };

  const removeImage = (index) => {
    setImage((selImage) => {
      const updatedImages = [...selImage];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: handleDrop,
  });

  const imagePreviews = image.map((image, index) => (
    <div key={index} style={{margin : '10px'}}>
      <img src={image.preview} width={"300px"} />
      <button onClick={() => removeImage(index)}>Remove</button>
    </div>
  ));

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          display: "flex",
          flexDirection: "row",
          border: "2px solid black",
          margin: "13px",
          justifyContent:'space-around',
          backgroundColor:'lightblue'
        }}
      >
        <input {...getInputProps()} />
        <p>Click to Select The Images</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-evenly",
        }}
      >
        {imagePreviews}
      </div>
    </div>
  );
};

export default App;
