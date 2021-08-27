import axios from "axios";

// const gamesApi = axios.create({
//   baseURL: "https://nc-games-chris.herokuapp.com/api",
// });

export const getReviews = async () => {
  const {data} = await axios.get("https://nc-games-chris.herokuapp.com/api/reviews");
  return data.reviews;
};
