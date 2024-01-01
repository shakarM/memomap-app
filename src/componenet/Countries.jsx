// /* eslint-disable react/jsx-key */
// /* eslint-disable react/prop-types */
// import styles from "./CountryList.module.css";
// import CountryItem from "./CountryItem";
// import Spinner from "./Spinner";
// import Message from "./Message";

// export default function CountryList({ cities, isLoading }) {
//   if (isLoading) return <Spinner />;

//   if (!cities.length) return <Message />;
//   const countries = cities.reduce((arr, city) => {
//     if (!arr.map((el) => el.country).includes(city.country))
//       return [...arr, { country: city.country, emoji: city.emoji }];
//     else return arr;
//   }, []);

//   return (
//     <ul className={styles.CountryList}>
//       <h1>
//         {" "}
//         {countries.map((country) => (
//           <CountryItem country={country} />
//         ))}{" "}
//       </h1>
//     </ul>
//   );
// }
