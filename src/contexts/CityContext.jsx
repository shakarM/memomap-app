import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  err: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loading":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loading":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/create":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case "cities/delete":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((prev) => prev.id !== action.payload),
      };
    // eslint-disable-next-line no-fallthrough
    case "reject":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw Error("Oppps");
  }
}

// eslint-disable-next-line react/prop-types
function CityProvider({ children }) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const BASE_URL = "http://localhost:9000";
  useEffect(function () {
    async function fetchingCities() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loading", payload: data });
      } catch {
        dispatch({ type: "reject", payload: "Something is wrong" });
      }
    }
    fetchingCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        dispatch({ type: "city/loading", payload: data });
      } catch {
        dispatch({ type: "reject", payload: "Something is wrong" });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCity.id]
  );
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "cities/create", payload: data });
    } catch {
      alert("Oooops");
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/delete", payload: id });
    } catch {
      alert("Oooops");
    }
  }
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined) throw new Error("We use global state");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { CityProvider, useCities };
