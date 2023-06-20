import React from "react";
import { DotNumber } from "../../../functions/dotnumber";
import DemographyContainer from "../../container/DemographyContainer";
import "./byagegender.scss";

function ByAgeGender({ ageGenderData }) {
  const demography = ageGenderData; //expected input data {"anak_f": ... , "": ...}

  var maleTotal = 0;
  var femaleTotal = 0;
  for (const property in demography) {
    if (property.endsWith("_m")) {
      maleTotal += demography[property];
      console.log(maleTotal);
    } else {
      femaleTotal += demography[property];
    }
  }
  const rows = [
    {
      group: "Toddler",
      range: "0-5",
      male: "balita_m",
      female: "balita_f",
    },
    {
      group: "Kid",
      range: "6-15",
      male: "anak_m",
      female: "anak_f",
    },
    {
      group: "Teen",
      range: "16-25",
      male: "remaja_m",
      female: "remaja_f",
    },
    {
      group: "Pro",
      range: "26-45",
      male: "pro_m",
      female: "pro_f",
    },
    {
      group: "Old",
      range: "46-65",
      male: "tua_m",
      female: "tua_f",
    },
    {
      group: "Pension",
      range: "> 65",
      male: "pensiun_m",
      female: "pensiun_f",
    },
  ];

  return (
    <>
      {Object.keys(demography).length > 0 && (
        <DemographyContainer title={"Age & Gender"}>
          <div className="demographyResult" style={{ marginBottom: "5px" }}>
            <div className="rowDemography">
              <div
                className="age"
                style={{ fontWeight: "650", textAlign: "center" }}
              >
                Age
              </div>
              <div className="male" style={{ fontWeight: "650" }}>
                Male
              </div>
              <div className="female" style={{ fontWeight: "650" }}>
                Female
              </div>
            </div>
            {rows.map((e, i) => (
              <>
                {demography[e.male] && (
                  <RowDemography
                    key={i}
                    group={e.group}
                    range={e.range}
                    male={DotNumber(Math.floor(demography[e.male]))}
                    female={DotNumber(Math.floor(demography[e.female]))}
                  ></RowDemography>
                )}
              </>
            ))}
            <div className="rowTotal">
              <div className="total">Total</div>
              <div className="male">{DotNumber(Math.floor(maleTotal))}</div>
              <div className="female">{DotNumber(Math.floor(femaleTotal))}</div>
            </div>
          </div>
        </DemographyContainer>
      )}
    </>
  );
}

export default ByAgeGender;

function RowDemography({ group, range, male, female }) {
  return (
    <div className="rowDemography">
      <div className="age">
        {group} <span style={{ float: "right" }}>{range}</span>
      </div>
      <div className="male">{male}</div>
      <div className="female">{female}</div>
    </div>
  );
}
