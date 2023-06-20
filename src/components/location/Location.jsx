import React from "react";
import "./location.scss";
import useStore from "../../context/store";
import admState from "../../context/admstate";

function Location() {
  const [
    kelGeom,
    kecGeom,
    kabkotGeom,
    provGeom,
    kelId,
    kecId,
    kabkotId,
    provId,
    setBounds,
    setkel,
    setkec,
    setkabkot,
    setkelId,
    setkecId,
    setkabId,
    setName,
  ] = admState((state) => [
    state.kelGeo,
    state.kecGeo,
    state.kabGeo,
    state.provGeo,
    state.kelId,
    state.kecId,
    state.kabId,
    state.provId,
    state.setBoundsByGeo,
    state.setkelGeo,
    state.setkecGeo,
    state.setkabGeo,
    state.setkelId,
    state.setkecId,
    state.setkabId,
    state.setLocationName,
  ]);
  const [setGeojson, setGridSize] = useStore((state) => [
    state.setGeojson,
    state.setGridSize,
  ]);

  return (
    <div className="locationInput">
      <div className="levelTitle">Provinsi</div>
      <select
        value={provId}
        onChange={(e) => {
          if (e.target.value == "all") {
          } else {
            setkabkot(e.target.value);
            const selected = provGeom.filter(
              (elm) => elm._id == e.target.value
            )[0];
            setBounds(selected.location);
            setGeojson(selected.location);
            setName(selected.NAMA);
            setGridSize(2000);
          }
        }}
      >
        <option value={"all"} key={"all"}>
          {"all"}
        </option>
        {provGeom.map((prov) => (
          <option value={prov._id} key={prov._id} color="red">
            {prov.NAMA}
          </option>
        ))}
      </select>
      {kabkotGeom.length > 1 && (
        <>
          <div className="levelTitle">Kabupaten</div>
          <select
            value={kabkotId}
            onChange={(e) => {
              if (e.target.value == "all") {
                setkabId("all");
                setkabkot(provId);
                const selected = provGeom.filter((elm) => elm._id == provId)[0];
                setBounds(selected.location);
                setGeojson(selected.location);
                setName(selected.NAMA);
                setGridSize(2000);
              } else {
                setkec(e.target.value);
                const selected = kabkotGeom.filter(
                  (elm) => elm._id == e.target.value
                )[0];
                setBounds(selected.location);
                setGeojson(selected.location);
                setName(selected.NAMA);
              }
            }}
          >
            <option value={"all"} key={"all"}>
              {"all"}
            </option>
            {kabkotGeom.map((kabkot) => (
              <option value={kabkot._id} key={kabkot._id}>
                {kabkot.NAMA}
              </option>
            ))}
          </select>
        </>
      )}
      {kecGeom.length > 1 && (
        <>
          <div className="levelTitle">Kecamatan</div>
          <select
            value={kecId}
            onChange={(e) => {
              if (e.target.value == "all") {
                setkecId("all");
                const selected = kabkotGeom.filter(
                  (elm) => elm._id == kabkotId
                )[0];
                setkec(kabkotId);
                setBounds(selected.location);
                setGeojson(selected.location);
                setName(selected.NAMA);
              } else {
                setkel(e.target.value);
                const selected = kecGeom.filter(
                  (elm) => elm._id == e.target.value
                )[0];
                setBounds(selected.location);
                setGeojson(selected.location);
                setName(selected.NAMA);
              }
            }}
          >
            <option value={"all"} key={"all"}>
              {"all"}
            </option>
            {kecGeom.map((kec) => (
              <option value={kec._id} key={kec._id}>
                {kec.NAMA}
              </option>
            ))}
          </select>
        </>
      )}
      {kelGeom.length > 1 && (
        <>
          <div className="levelTitle">Kelurahan</div>
          <select
            value={kelId}
            onChange={(e) => {
              if (e.target.value == "all") {
                setkelId("all");
                const selected = kecGeom.filter((elm) => elm._id == kecId)[0];
                setBounds(selected.location);
                setGeojson(selected.location);
                setName(selected.NAMA);
              } else {
                const selected = kelGeom.filter(
                  (elm) => elm._id == e.target.value
                )[0];
                setBounds(selected.location);
                setGeojson(selected.location);
                setkelId(e.target.value);
                setName(selected.NAMA);
              }
            }}
          >
            <option value={"all"} key={"all"}>
              {"all"}
            </option>
            {kelGeom.map((kel) => (
              <option value={kel._id} key={kel._id}>
                {kel.NAMA}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export default Location;
