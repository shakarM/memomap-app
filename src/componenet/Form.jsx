// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Message from "./Message";
// import Spinner from "./Spinner";
import UseUrlLocation from "./Hooks/useUrlLocation";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = UseUrlLocation();
  const [errorLocation, setErrorLocation] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [geoLoc, setGeoLoc] = useState(false);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [emoji, setEmoji] = useState("");
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(
    function () {
      async function fetchData() {
        try {
          setGeoLoc(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          setErrorLocation("");
          const data = await res.json();
          setCityName(data.city || data.locality || "");
          console.log(data);
          setEmoji(convertToEmoji(data.countryCode));
          if (!data.countryCode)
            throw new Error("Please choose somewhere else!");
        } catch (err) {
          setErrorLocation(err.message);
          console.log(err);
        } finally {
          setGeoLoc(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    createCity(newCity);
    navigate("/app/cities");
  }

  if (errorLocation) return <Message message={errorLocation} />;
  if (!lat || !lng)
    return <Message message="Please choose somewhere from the map" />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/mm/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
