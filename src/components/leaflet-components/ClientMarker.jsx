import React from "react";

function ClientMarker() {
  return {
    /* <LayersControl.Overlay name="My Locations" checked>
  <FeatureGroup>
    {ClientData.map((data) => {
      return (
        <Marker
          icon={circlekMarkerCollection[JSON.parse(data.SALES)]}
          position={[
            data.location.coordinates[1],
            data.location.coordinates[0],
          ]}
        >
          <Popup>
            <div>
              {data.NAMA}
              <ResponsiveContainer width={300} height={300}>
                <PieChart width={150} height={150}>
                  <Pie
                    data={data.sale}
                    nameKey="name"
                    dataKey="value"
                    // label={function (entry) {
                    //   return entry.name;
                    // }}
                    cx={150}
                    cy={150}
                  >
                    {data.sale.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <TooltipCart
                    viewBox={{
                      x: 0,
                      y: 0,
                      width: 200,
                      height: 200,
                    }}
                  ></TooltipCart>
                </PieChart>
              </ResponsiveContainer>
              <table
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {data.sale &&
                  data.sale.map((sale, index) => (
                    <tr>
                      <td>
                        <div
                          style={{
                            padding: 4,
                            backgroundColor: COLORS[index],
                          }}
                        ></div>
                      </td>
                      <td>{sale.name}</td>
                      <td>
                        Rp.{" "}
                        {sale.value
                          .toString()
                          .replace(
                            /(\d)(?=(\d{3})+(?!\d))/g,
                            "$1."
                          )}
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </Popup>
          <Tooltip>{data.NAMA}</Tooltip>
        </Marker>
      );
    })}
  </FeatureGroup>
</LayersControl.Overlay> */
  };
}

export default ClientMarker;
