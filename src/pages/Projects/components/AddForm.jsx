import React, { useState, useEffect } from "react";

import images from "src/assets/images";

const AddForm = (props) => {
  const {
    id,
    name,
    affiliation,
    link,
    onButtonClick,
    inputData,
    changeInputData,
  } = props;

  const [inputName, setInputName] = useState(name);
  const [inputAffiliation, setInputAffiliation] = useState(affiliation);
  const [inputLink, setInputLink] = useState(link);

  const syncParentData = () => {
    let modifyData = [...inputData];
    modifyData.map((data) => {
      if (data.id === id) {
        data.name = inputName
        data.affiliation = inputAffiliation
        data.link = inputLink
      }
    })
    changeInputData(modifyData)
  }

  useEffect(() => {
    setInputName(name);
    setInputAffiliation(affiliation);
    setInputLink(link);
  }, [name, affiliation, link]);

  useEffect(() => {
    syncParentData()
  }, [inputName, inputAffiliation, inputLink]);

  return (
    <div className="CandIInputSet">
      <div className="subject">이름</div>
      <input
        className="smallInput name"
        placeholder="Text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <div className="subject">소속</div>
      <input
        className="smallInput affiliation"
        placeholder="00"
        value={inputAffiliation}
        onChange={(e) => setInputAffiliation(e.target.value)}
      />
      <div className="subject">링크</div>
      <input
        className="smallInput link"
        placeholder="Text"
        value={inputLink}
        onChange={(e) => setInputLink(e.target.value)}
      />
      <img src={id !== inputData[inputData.length -1 ].id ? images.removeform : images.add} onClick={() => onButtonClick(id)} />
    </div>
  );
};

export default AddForm;
