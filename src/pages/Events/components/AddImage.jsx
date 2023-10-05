import React, { useState } from "react";

import images from "src/assets/images";

const AddImage = (props) => {
  const [selectedMain, setSelectedMain] = useState(null);

  const uploadMainHandler = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedMain(file);
    }
  };

  console.log()

  return (
    <div className="EventImageSet">
      <label className="EventImageInput">
        <div className="UploadImageSpace">
          <img src={images.upload} alt="Upload" />
        </div>
        <div htmlFor="imagePath">
          {selectedMain ? (
            <div className="imagePath">{selectedMain.name}</div>
          ) : (
            <div className="imagePath">Event Image</div>
          )}
        </div>
        <input
          type="file"
          id="mainInput"
          onChange={(e) => uploadMainHandler(e)}
          style={{ display: "none" }}
        />
      </label>
      <img src={images.addform}/>
    </div>
  );
};

export default AddImage;
