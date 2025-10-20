import React, { useEffect, useState } from "react";

const BlobImage = ({ imageUrl, alt }) => {
  const [blobUrl, setBlobUrl] = useState(null);
console.log(imageUrl,blobUrl,'imageUrl-->');
useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (imageUrl) {
      fetchImage();
    }
  }, [imageUrl]);


console.log(imageUrl,blobUrl,'imageUrl-->');
  if (!blobUrl) {
    return <span>N/A</span>;
  }

  return (
    <img
      src={blobUrl}
      alt={alt}
      style={{
        width: 50,
        height: 50,
        objectFit: "contain",
      }}
    />
  );
};

export default BlobImage;
