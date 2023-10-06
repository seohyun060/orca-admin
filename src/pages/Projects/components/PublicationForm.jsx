import React, { useEffect, useState } from "react";

import images from "src/assets/images";

const PublicationForm = (props) => {
  const { id, link, onButtonClick, inputData, changeInputData } = props;
  const [inputLink, setInputLink] = useState(link);

  const syncParentData = () => {
    let modifyData = [...inputData];
    modifyData.map((data) => {
      if (data.id === id) {
        data.link = inputLink
      }
    })
    changeInputData(modifyData)
  }

  useEffect(() => {
    setInputLink(link);
  }, [link]);

  useEffect(() => {
    syncParentData();
  }, [inputLink]);

  return (
    <div className="PublicationLink">
      <div className="smallInput">
        <img src={images.link} />
        <input
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
        />
      </div>
      <img src={images.addform} onClick={() => onButtonClick(id)} />
    </div>
  );
};

export default PublicationForm;
