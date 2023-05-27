import { useState } from "react";
import MapComponent from "../Map/MapComponent";
import PharmacyFinder from "../PharmacyFinder/PharmacyFinder";

function Home() {
  const [pharmacies, setPharmacies] = useState([]);
  const [center, setCenter] = useState([]);
  return (
    <div>
      <div id="container">
        <div className="col-md-6">
          <PharmacyFinder
            callback1={setCenter}
            callback2={setPharmacies}
          ></PharmacyFinder>
        </div>
        <div className="col-md-6">
          <div className="form-floating mx-4 pt-4">
            <MapComponent
              pharmacies={pharmacies}
              center={center}
            ></MapComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
