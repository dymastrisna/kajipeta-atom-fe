import "./genderInput.scss";

import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import MyContainer from "../container/MyContainer";
import dispStore from "../../context/displaystate";
import useStore from "../../context/store";

function GenderInput() {
  const [isDMopen, togleDM] = dispStore((state) => [
    state.isDMopen,
    state.togleDM,
  ]);
  const [demographySelect, setDemographySelect] = useStore((state) => [
    state.demographySelected,
    state.setdemographySelected,
  ]);
  const [agegender, profession, education, religion] = useStore((state) => [
    state.agegender,
    state.profession,
    state.education,
    state.religion,
  ]);
  const [setAgeGender, setprofession, seteducation, setreligion] = useStore(
    (state) => [
      state.setAgeGender,
      state.setprofession,
      state.seteducation,
      state.setreligion,
    ]
  );
  const listAllDemography = [
    "balita_f",
    "balita_m",
    "anak_f",
    "anak_m",
    "remaja_f",
    "remaja_m",
    "pro_f",
    "pro_m",
    "tua_f",
    "tua_m",
    "pensiun_f",
    "pensiun_m",
  ];

  // const [disableOpt, setDisableOpt] = useState();
  return (
    <MyContainer
      title={"Demography"}
      isOpen={isDMopen}
      onTogle={() => togleDM()}
    >
      <Multiselect
        showCheckbox
        options={[
          { name: "all", id: 0 },
          { name: "Male", id: 1 },
          { name: "Female", id: 2 },
        ]}
        disable={true}
        displayValue="name"
        placeholder="Gender"
        onSelect={(e) => {
          console.log(e);
        }}
        selectedValues={[{ name: "all", id: 0 }]}
        onRemove={(e) => {
          console.log(e);
        }}
      ></Multiselect>
      <Multiselect
        showCheckbox
        options={[
          { name: "all", value: [] },
          { name: "0-5 ", value: ["balita_f", "balita_m"] },
          { name: "6-15", value: ["anak_f", "anak_m"] },
          { name: "16-25", value: ["remaja_f", "remaja_m"] },
          { name: "26-45", value: ["pro_f", "pro_m"] },
          { name: "46-65", value: ["tua_f", "tua_m"] },
          { name: "66-80", value: ["pensiun_f", "pensiun_m"] },
        ]}
        selectedValues={demographySelect}
        disablePreSelectedValues={false}
        displayValue="name"
        placeholder="Age"
        onRemove={(opt) => {
          setDemographySelect(opt);
          var listdemography = [];
          opt.forEach((element) => {
            listdemography = listdemography.concat(element.value);
          });
          setAgeGender(listdemography);
          console.log(listdemography);
        }}
        onSelect={(opt) => {
          let namePropertieOpt = opt.map(({ name }) => name);
          if (namePropertieOpt.includes("all")) {
            setDemographySelect([{ name: "all" }]);
            setAgeGender(listAllDemography);
          } else {
            setDemographySelect(opt);
            var listdemography = [];
            opt.forEach((element) => {
              listdemography = listdemography.concat(element.value);
            });
            setAgeGender(listdemography);
            // console.log(listdemography);
          }
        }}
      ></Multiselect>

      <Multiselect
        showCheckbox
        // disable
        // hideSelectedList
        options={[
          { name: "Belum/tidak bekerja", value: "belum_beke" },
          { name: "Aparatur Pejabat Negara", value: "aparatur_p" },
          { name: "Tenaga Pengajar", value: "tenaga_pen" },
          { name: "Wiraswasta", value: "wiraswasta" },
          { name: "Pertanian dan Peternakan", value: "pertanian" },
          { name: "Nelayan", value: "nelayan" },
          { name: "Pelajar dan Mahasiswa", value: "pelajar" },
          { name: "Tenaga Kesehatan", value: "tenaga_kes" },
          { name: "Pensiunan", value: "pensiunan" },
          { name: "Lainnya", value: "lainnya" },
        ]}
        displayValue="name"
        selectedValues={profession}
        placeholder="Profession"
        onSelect={(e) => {
          setprofession(e);
        }}
        onRemove={(e) => {
          setprofession(e);
        }}
      ></Multiselect>
      <Multiselect
        // disable
        // hideSelectedList
        showCheckbox
        options={[
          { name: "SD", value: "tamat_sd" },
          { name: "SMP", value: "sltp" },
          { name: "SMA", value: "slta" },
          { name: "D1", value: "diploma_i_" },
          { name: "D2", value: "diploma_ii" },
          { name: "S1/D4", value: "diploma_iv" },
          { name: "S2", value: "strata_ii" },
          { name: "S3", value: "strata_iii" },
        ]}
        selectedValues={education}
        displayValue="name"
        placeholder="Education"
        onSelect={(e) => {
          seteducation(e);
        }}
        onRemove={(e) => {
          seteducation(e);
        }}
      ></Multiselect>
      <Multiselect
        // disable
        // hideSelectedList
        showCheckbox
        options={[
          { name: "Islam", value: "islam" },
          { name: "Kristen", value: "kristen" },
          { name: "Katholik", value: "katholik" },
          { name: "Hindu", value: "hindu" },
          { name: "Budha", value: "budha" },
          { name: "Konghucu", value: "konghucu" },
          { name: "Kepercayaan", value: "kepercayaa" },
        ]}
        selectedValues={religion}
        displayValue="name"
        placeholder="Religion"
        onSelect={(e) => {
          setreligion(e);
        }}
        onRemove={(e) => {
          setreligion(e);
        }}
      ></Multiselect>
    </MyContainer>
  );
}

export default GenderInput;
