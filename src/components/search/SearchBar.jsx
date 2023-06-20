import { React, useState } from "react";
import "./searchbar.scss";
import { BiSearchAlt } from "react-icons/bi";
import { useMemo } from "react";
import axios from "axios";
import OutsideClickHandler from "react-outside-click-handler";
import useStore from "../../context/store";
import admState from "../../context/admstate";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [isSuggestionOpen, setisSuggestionOpen] = useState(false);
  const [suggestion, setsuggestion] = useState([]);

  const [setGeojson, setGrid, setGridSize] = useStore((state) => [
    state.setGeojson,
    state.setGrid,
    state.setGridSize,
  ]);

  const [setkel, setkec, setkabkot, setGeoId, setBoundsByGeo, setLocationName] =
    admState((state) => [
      state.setkelGeo,
      state.setkecGeo,
      state.setkabGeo,
      state.setGeoId,
      state.setBoundsByGeo,
      state.setLocationName,
    ]);

  useMemo(async () => {
    const suggestion_resp = await axios.get(
      process.env.REACT_APP_API_URL + "/api/title/?name=" + searchText
    );
    setsuggestion(suggestion_resp.data);
    console.log(searchText);
  }, [searchText]);

  const onSuggetionClick = async (text, id, level) => {
    setSearchText(text);
    setisSuggestionOpen(false);
    switch (level) {
      case "A":
        setkabkot(id);
        var reponse = await axios.get(
          process.env.REACT_APP_API_URL + "/api/provinsi/" + id
        );
        setGeoId(id, "all", "all", "all");
        setGridSize(2000);
        break;
      case "B":
        setkec(id);
        var reponse = await axios.get(
          process.env.REACT_APP_API_URL + "/api/kabkot/" + id
        );
        var provId = reponse.data.prov_id;
        setGeoId(provId, id, "all", "all");
        setGridSize(2000);
        break;
      case "C":
        setkel(id);
        var reponse = await axios.get(
          process.env.REACT_APP_API_URL + "/api/kecamatan/" + id
        );
        var kabId = reponse.data.kab_id;
        var provId = kabId.slice(0, 2) + "0".repeat(22);
        setGeoId(provId, kabId, id, "all");
        break;

      default:
        var reponse = await axios.get(
          process.env.REACT_APP_API_URL + "/api/kelurahan/" + id
        );
        var kecId = reponse.data.kec_id;
        var kabId = kecId.slice(0, 4) + "0".repeat(20);
        var provId = kabId.slice(0, 2) + "0".repeat(22);
        setGeoId(provId, kabId, kecId, id);
        break;
    }

    setGeojson(reponse.data.location);
    setBoundsByGeo(reponse.data.location);

    setLocationName(reponse.data.NAMA);
    setGrid([]);
  };

  return (
    <OutsideClickHandler onOutsideClick={(_) => setisSuggestionOpen(false)}>
      <div className="searchBarContainer">
        <div className="inputContainer">
          <input
            placeholder="Search location"
            type="text"
            className="searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={(_) => {
              setisSuggestionOpen(true);
            }}
          ></input>
          <BiSearchAlt className="iconInput"></BiSearchAlt>
        </div>
        {isSuggestionOpen ? (
          suggestion &&
          suggestion.map((data, i) => (
            <div
              className="suggestionlist"
              key={i}
              // onClickCapture
              onClick={(e) => {
                console.log("print");
                onSuggetionClick(data.NAMA2, data.ID, data.level);
              }}
            >
              {data.NAMA2}
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

export default SearchBar;
