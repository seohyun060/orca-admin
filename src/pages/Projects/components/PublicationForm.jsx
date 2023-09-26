import React, { useState } from "react";

import images from "src/assets/images";

const PublicationForm = (props) => {
  const { link, onButtonClick, index } = props;
  const [inputLink, setInputLink] = useState(link);

  return (
    <div className="PublicationLink">
      <div className="smallInput">
        <img src={images.link} />
        <input
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
        />
      </div>
      <img
        src={images.addform}
        onClick={() => onButtonClick(index)}
      />
    </div>
  );
};

export default PublicationForm;
