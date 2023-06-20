import React from "react";
import "./efresult.scss";
import useStore from "../../context/store";
import MyContainer from "../container/MyContainer";
import dispStore from "../../context/displaystate";
import efPointStore from "../../context/efpoint";

function EFResult() {
  const [poiArea] = useStore((state) => [state.poiResume]);

  const [isefOpen, togleIsOpen] = efPointStore((state) => [
    state.isOpen,
    state.togleIsOpen,
  ]);

  const [isRAopen, togleRA] = dispStore((state) => [
    state.isRAopen,
    state.togleRA,
  ]);
  return (
    <MyContainer
      title={"Economic Factors"}
      isOpen={isRAopen}
      onTogle={() => togleRA()}
    >
      <div className="efContainer">
        {poiArea &&
          poiArea.map((poi, i) => (
            <div className="efelement" key={i}>
              <input
                type="checkbox"
                onChange={(e) => {
                  togleIsOpen(poi.name);
                }}
                checked={isefOpen[poi.name]}
              />
              <div className="efname">{poi.name}</div>
              <div className="tdua">: </div>
              <div className="efjumlah">{poi.points.length}</div>
            </div>
          ))}
      </div>
    </MyContainer>
  );
}

export default EFResult;
