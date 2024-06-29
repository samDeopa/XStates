import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    axios("https://crio-location-selector.onrender.com/countries")
      .then((res) => {
        setCountryList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    if (country != "")
      axios(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      )
        .then((res) => {
          setStateList(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [country]);
  useEffect(() => {
    if (state != "")
      axios(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      )
        .then((res) => {
          setCityList(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    document.getElementById("message").innerText = "";
  }, [state, country]);
  return (
    <div className="container">
      <h1>Select Location</h1>
      <div>
        <select
          name="Country"
          id="Country"
          disabled={false}
          onChange={(e) => {
            setCountry(e.target.value);
            document.getElementById("State").removeAttribute("disabled");
          }}
          defaultValue={""}
        >
          <option value="" disabled hidden>
            Select Country
          </option>
          {countryList.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <select
          name="State"
          id="State"
          disabled
          onChange={(e) => {
            setState(e.target.value);
            document.getElementById("City").removeAttribute("disabled");
          }}
          defaultValue={""}
        >
          <option value="" disabled hidden>
            Select State
          </option>
          {stateList.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <select
          name="City"
          id="City"
          disabled
          defaultValue={""}
          onChange={(e) => {
            document.getElementById(
              "message"
            ).innerText = `You Selected ${e.target.value}, ${state}, ${country}`;
          }}
        >
          <option value="" disabled hidden>
            Select City
          </option>
          {cityList.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>

      <p id="message"></p>
    </div>
  );
}

export default App;
