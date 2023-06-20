import Multiselect from "multiselect-react-dropdown/dist";
import React from "react";
import dispStore from "../../context/displaystate";
import useStore from "../../context/store";
import MyContainer from "../container/MyContainer";

function EFInput() {
  const [poi, setPoi] = useStore((state) => [state.poi, state.setPoi]);
  const [isEFopen, togleEF] = dispStore((state) => [
    state.isEFopen,
    state.togleEF,
  ]);
  return (
    <MyContainer
      title={"Economic Factors"}
      isOpen={isEFopen}
      onTogle={() => togleEF()}
    >
      <Multiselect
        showCheckbox
        selectedValues={poi}
        options={[
          { name: "BMT", category: "Finance" },
          { name: "BRI", category: "Finance" },
          { name: "BPRS", category: "Finance" },
          { name: "Pegadaian", category: "Finance" },
          { name: "ATM", category: "Finance" },
          { name: "Bank", category: "Finance" },
          { name: "Sekolah", category: "Education" },
          { name: "Pesantren", category: "Education" },
          { name: "Alfamart", category: "Store" },
          { name: "Indomaret", category: "Store" },
          { name: "RumahSakit", category: "Health" },
          { name: "Puskesmas", category: "Health" },
          { name: "Pasar", category: "Store" },
          { name: "Restaurant", category: "F & B" },
        ]}
        groupBy="category"
        displayValue="name"
        placeholder="Economic Factors"
        onRemove={(opt) => {
          setPoi(opt);
        }}
        onSelect={(opt) => {
          setPoi(opt);
        }}
      ></Multiselect>
    </MyContainer>
  );
}

export default EFInput;
