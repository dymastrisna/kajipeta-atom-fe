import React from "react";
import PopupContainer from "./PopupContainer";
import ByAgeGender from "./../demographyResult/byAgeGender/ByAgeGender";
import DemographyByCategory from "./../demographyResult/demographyBybyCategory/DemographyByCategory";
import "./popupdemography.scss";
import { keyDemography } from "./../../constant/keyDemography";

function PopupDemography({ data }) {
  const agegender = {};
  data.agegenderDetails.forEach((element) => {
    agegender[element.name] = parseInt(element.value);
  });
  const professionData = data.professionDetails;
  const educationData = data.educationDetails;
  const religionData = data.religionDetails;

  return (
    <PopupContainer title={"Demography"} maxHeight={"200px"}>
      {agegender && <ByAgeGender ageGenderData={agegender}></ByAgeGender>}
      {professionData?.length > 0 && (
        <DemographyByCategory
          data={professionData}
          demographyCategory={"Profession"}
          KEY_NAME={keyDemography}
          isChartDisp={false}
        ></DemographyByCategory>
      )}
      {educationData?.length > 0 && (
        <DemographyByCategory
          data={educationData}
          demographyCategory={"Education"}
          KEY_NAME={keyDemography}
          isChartDisp={false}
        ></DemographyByCategory>
      )}
      {religionData?.length > 0 && (
        <DemographyByCategory
          data={religionData}
          demographyCategory={"Religion"}
          KEY_NAME={keyDemography}
          isChartDisp={false}
        ></DemographyByCategory>
      )}
    </PopupContainer>
  );
}

export default PopupDemography;
