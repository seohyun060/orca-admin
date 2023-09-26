import React, { useState } from "react";

import images from "src/assets/images";

const AddForm = (props) => {
  const { index, name, affiliation, link, onButtonClick } =
    props;

  const [inputName, setInputName] = useState(name);
  const [inputAffiliation, setInputAffiliation] = useState(affiliation);
  const [inputLink, setInputLink] = useState(link);

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
      <img src={images.addform} onClick={() => onButtonClick(index)} />
    </div>
  );
};

export default AddForm;
