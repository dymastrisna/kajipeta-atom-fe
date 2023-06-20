import React from "react";
import {
  Circle,
  CircleMarker,
  FeatureGroup,
  LayersControl,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import useStore from "../../context/store";
import circlekMarkerCollection from "../../components/markers/circlekIcon";

function PegadaianPoints() {
  const [ClientData] = useStore((state) => [state.clienData]);
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#7765E3",
    "#EDD3C4",
  ];
  return (
    <>
      <LayersControl.Overlay name="My Location">
        <FeatureGroup>
          {ClientData.map((data) => {
            if (data.KATEGORI == "hijau") {
              return (
                <Marker
                  icon={circlekMarkerCollection[0]}
                  position={[
                    data.location.coordinates[1],
                    data.location.coordinates[0],
                  ]}
                >
                  <Popup>
                    <div>
                      {data.NAMA}
                      <table
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        {data.sale &&
                          data.sale.map((sale, index) => {
                            if (sale.name == "NOA") {
                              return (
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        padding: 4,
                                        backgroundColor: COLORS[index],
                                      }}
                                    ></div>
                                  </td>
                                  <td>{"Nasabah  "}</td>
                                  <td>: {sale.value}</td>
                                </tr>
                              );
                            } else if (sale.name == "OMSET") {
                              return (
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        padding: 4,
                                        backgroundColor: COLORS[index],
                                      }}
                                    ></div>
                                  </td>
                                  <td>{"Omset"}</td>
                                  <td>: Rp. {rounding(sale.value)}</td>
                                </tr>
                              );
                            }
                            return (
                              <tr>
                                <td>
                                  <div
                                    style={{
                                      padding: 4,
                                      backgroundColor: COLORS[index],
                                    }}
                                  ></div>
                                </td>
                                <td>{"Loan "}</td>
                                <td>: Rp. {rounding(sale.value)}</td>
                              </tr>
                            );
                          })}
                      </table>
                    </div>
                  </Popup>
                  <Tooltip>{data.NAMA}</Tooltip>
                </Marker>
              );
            }
          })}
        </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Performance">
        <FeatureGroup>
          {ClientData.map((data) => {
            if (data.KATEGORI == "hijau") {
              return (
                //fixed size circle
                <Circle
                  color="green"
                  opacity={0}
                  fillOpacity={0.5}
                  radius={data.SIZE * 400}
                  center={[
                    data.location.coordinates[1],
                    data.location.coordinates[0],
                  ]}
                ></Circle>
                //dynamics size circle
                // <CircleMarker
                //   color="green"
                //   opacity={0}
                //   fillOpacity={0.5}
                //   radius={data.SIZE * 8}
                //   center={[
                //     data.location.coordinates[1],
                //     data.location.coordinates[0],
                //   ]}
                // ></CircleMarker>
              );
            }
          })}
        </FeatureGroup>
      </LayersControl.Overlay>
    </>
  );
}

export default PegadaianPoints;

function rounding(numb) {
  let newNumb = (parseInt(numb / 100000000) * 100000000)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return newNumb;
}
