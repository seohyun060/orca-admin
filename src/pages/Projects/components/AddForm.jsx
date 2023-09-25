import React from "react";

import images from "src/assets/images";

const AddForm = (props) => {
  const { index, onButtonClick } = props;

  return (
    <div className="CandIInputSet">
      <div className="subject">이름</div>
      <input className="smallInput name" placeholder="Text" />
      <div className="subject">소속</div>
      <input className="smallInput affiliation" placeholder="00" />
      <div className="subject">링크</div>
      <input className="smallInput link" placeholder="Text" />
      <img src={images.addform} onClick={() => {onButtonClick(index)}} />
    </div>
  );
};

export default AddForm;
