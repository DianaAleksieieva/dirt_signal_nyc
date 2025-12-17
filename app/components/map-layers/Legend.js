"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./Legend.css";

function Legend(props) {
  const scale = props.scale;

  const map = useMap();
  const legendRef = useRef(null);

  useEffect(() => {
    if (legendRef.current) {
      legendRef.current.remove();
      legendRef.current = null;
    }

    if (scale) {
      const control = new L.Control({ position: "bottomright" });
      
      control.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        
        const grades = scale.quantiles();
        const palette = scale.range();
  
        div.innerHTML += "<h4>Complaints</h4>";
  
        if(grades.length > 0){
          div.innerHTML += `<div><i style="background:${palette[0]}"></i> 1 &ndash; ${Math.round(grades[0])}</div>`;
  
          for (let i = 0; i < grades.length - 1; i++) {
              div.innerHTML +=
              `<div><i style="background:${palette[i + 1]}"></i> ` +
              `${Math.round(grades[i]) + 1} &ndash; ${Math.round(grades[i + 1])}</div>`;
          }
  
          div.innerHTML +=
              `<div><i style="background:${palette[palette.length - 1]}"></i> ` +
              `${Math.round(grades[grades.length - 1]) + 1}+</div>`;

        } else if (palette.length > 0) {
          const singleValue = scale.domain()[0];
          div.innerHTML += `<div><i style="background:${palette[0]}"></i> ${Math.round(singleValue)}</div>`;
        }
  
        return div;
      };
      
      control.addTo(map);
      legendRef.current = control;
    }

    return () => {
      if (legendRef.current) {
        legendRef.current.remove();
      }
    };
  }, [map, scale]);

  return null;
}

export default Legend;
