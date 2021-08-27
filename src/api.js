import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-chris.herokuapp.com/api",
});

export const getReviews = async (category) => {
  const { data } = await gamesApi.get("/reviews", { params: { category } });
  return data.reviews;
};

export const getCategories = async () => {
  const { data } = await gamesApi.get("/categories");
  return data.categories;
};
