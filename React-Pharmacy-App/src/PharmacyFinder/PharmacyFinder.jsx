import { useState, useEffect } from "react";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "./PharmacyFinder.css";

function PharmacyFinder({ callback1, callback2 }) {
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    fetch("https://ill-baseball-cap-calf.cyclic.app/api/cities")
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://ill-baseball-cap-calf.cyclic.app/api/zones")
      .then((response) => response.json())
      .then((data) => {
        setZones(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://ill-baseball-cap-calf.cyclic.app/api/pharmacies")
      .then((response) => response.json())
      .then((data) => {
        setPharmacies(data);
      });
  }, []);

  const [selectVille, setSelectVille] = useState(null);
  const [selectZone, setSelectZone] = useState(null);
  const [selectGarde, setSelectGarde] = useState(null);

  return (
    <div>
      <div className="form-floating mx-4 pt-4">
        <h5
          className="col-md-12 mb-3 text-center"
          style={{ fontFamily: "monospace", fontWeight: 900 }}
        >
          Sélectionnez votre pharmacie
        </h5>
        <div className="row ">
          <div className="col-md-12 mb-4 ">
            <div className="form-floating" style={{ fontWeight: "bold" }}>
              <select
                className="form-select"
                id="floatingSelect"
                defaultValue="option1"
                aria-label="Floating label select example"
                onChange={(e) => {
                  const selectedVille = cities.find(
                    (ville) => ville.Name === e.target.value
                  );
                  setSelectVille(selectedVille);
                  setSelectZone(null);
                  const zoneSelect = document.getElementById("zoneSelect");
                  if (zoneSelect) {
                    zoneSelect.selectedIndex = 0;
                  }
                  return callback1([
                    selectedVille.Latitude,
                    selectedVille.Longitude,
                  ]);
                }}
              >
                <option value="option1" disabled>
                  Choisissez la ville
                </option>

                {cities.map((ville) => {
                  return <option key={ville._id}>{ville.Name}</option>;
                })}
              </select>
              <label htmlFor="floatingSelect">Ville</label>
            </div>
          </div>
        </div>

        <div className="row">
          {selectVille && (
            <div className="col-md-12 mb-4">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="zoneSelect"
                  defaultValue="option1"
                  aria-label="Floating label select example"
                  onChange={(e) => {
                    const selectedZone = zones.find(
                      (zone) => zone.Name === e.target.value
                    );
                    setSelectZone(selectedZone);
                    setSelectGarde(null);
                    const gardeSelect = document.getElementById("gardeSelect");
                    if (gardeSelect) {
                      gardeSelect.selectedIndex = 0;
                    }
                    callback1([selectedZone.Latitude, selectedZone.Longitude]);
                    callback2([]);
                  }}
                >
                  <option value="option1" disabled>
                    Choisissez la zone
                  </option>
                  {zones
                    .filter((zone) => zone.City_id === selectVille._id)
                    .map((filteredZone) => {
                      return (
                        <option key={filteredZone._id}>
                          {filteredZone.Name}
                        </option>
                      );
                    })}
                </select>
                <label htmlFor="floatingSelect">Zone</label>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          {selectVille && selectZone && (
            <div className="col-md-12 mb-4">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="gardeSelect"
                  defaultValue="option1"
                  aria-label="Floating label select example"
                  onChange={(e) => {
                    setSelectGarde(e.target.value);
                    return callback2(
                      pharmacies.filter(
                        (pharmacie) =>
                          pharmacie.Zone_id === selectZone._id &&
                          pharmacie.Garde === e.target.value
                      )
                    );
                  }}
                >
                  <option value="option1" disabled>
                    Choisissez le type de garde
                  </option>
                  <option value="jour">Jour</option>
                  <option value="nuit">Nuit</option>
                </select>
                <label htmlFor="floatingSelect">Garde</label>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="form-floating mx-4 pt-4">
        {selectVille && selectZone && selectGarde && (
          <div className="slide-container swiper">
            <div className="slider-content">
              <div className="card-wrapper">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={25}
                  loop={true}
                  grabCursor={true}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    520: { slidesPerView: 2 },
                    950: { slidesPerView: 3 },
                  }}
                >
                  {pharmacies
                    .filter(
                      (pharmacie) =>
                        pharmacie.Zone_id === selectZone._id &&
                        pharmacie.Garde === selectGarde
                    )
                    .map((pharmacie, index) => (
                      <SwiperSlide key={index} className="card swiper-slide">
                        <div className="image-content">
                          <span className="overlay"></span>
                          <div className="card-image">
                            <img
                              src={
                                !pharmacie.photo
                                  ? "https://www.1min30.com/wp-content/uploads/2018/05/R%C3%A9cipient-avec-un-serpent-logo.jpg"
                                  : pharmacie.photo
                              }
                              alt="Pharmacy"
                            />
                          </div>
                        </div>
                        <div className="card-content">
                          <h2 className="name">{pharmacie.Title}</h2>
                          {selectedPharmacy &&
                            selectedPharmacy._id === pharmacie._id && (
                              <div
                                className={`card-details ${
                                  selectedPharmacy &&
                                  selectedPharmacy._id === pharmacie._id
                                    ? "visible"
                                    : ""
                                }`}
                              >
                                <p className="description">
                                  <span style={{ fontWeight: "bold" }}>
                                    Adresse:
                                  </span>{" "}
                                  {selectedPharmacy.Address} <br />
                                  <span style={{ fontWeight: "bold" }}>
                                    Téléphone:
                                  </span>{" "}
                                  {selectedPharmacy["Phone Number"]}
                                </p>
                              </div>
                            )}
                          <button
                            className={`button ${
                              selectedPharmacy &&
                              selectedPharmacy._id === pharmacie._id
                                ? "hidden"
                                : ""
                            }`}
                            onClick={() => setSelectedPharmacy(pharmacie)}
                          >
                            Détails
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              <div className="swiper-button-next swiper-navBtn"></div>
              <div className="swiper-button-prev swiper-navBtn"></div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PharmacyFinder;
