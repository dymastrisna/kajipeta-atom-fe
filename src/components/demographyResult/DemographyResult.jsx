import React from "react";
import dispStore from "../../context/displaystate";
import useStore from "../../context/store";
import MyContainer from "../container/MyContainer";
import ByAgeGender from "./byAgeGender/ByAgeGender";
import DemographyByCategory from "./demographyBybyCategory/DemographyByCategory";

import { keyDemography } from "./../../constant/keyDemography";

function DemographyResult() {
  const [isOpen, togleOpen] = dispStore((state) => [
    state.isDSopen,
    state.togleDS,
  ]);
  const [
    demographyAgeGenderAll,
    demographyProfessionAll,
    demographyEducationAll,
    demographyReligionAll,
  ] = useStore((state) => [
    state.demographyAgeGenderAll,
    state.demographyProfessionAll,
    state.demographyEducationAll,
    state.demographyReligionAll,
  ]);

  return (
    <MyContainer
      title={"Demography"}
      isOpen={isOpen}
      onTogle={() => togleOpen()}
    >
      {/* by Age */}
      {demographyAgeGenderAll && (
        <ByAgeGender ageGenderData={demographyAgeGenderAll}></ByAgeGender>
      )}

      {/* by Profession */}
      {demographyProfessionAll.length > 0 && (
        <DemographyByCategory
          demographyCategory={"Profession"}
          data={demographyProfessionAll}
          KEY_NAME={keyDemography}
        ></DemographyByCategory>
      )}

      {/* by Education */}
      {demographyEducationAll.length > 0 && (
        <DemographyByCategory
          demographyCategory={"Education"}
          data={demographyEducationAll}
          KEY_NAME={keyDemography}
        ></DemographyByCategory>
      )}

      {/* by Religion */}
      {demographyReligionAll.length > 0 && (
        <DemographyByCategory
          demographyCategory={"Religion"}
          data={demographyReligionAll}
          KEY_NAME={keyDemography}
        ></DemographyByCategory>
      )}
    </MyContainer>
  );
}

export default DemographyResult;
