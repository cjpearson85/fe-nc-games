import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-chris.herokuapp.com/api",
});

export const getReviews = async (category, order) => {
  //   let order = queries.get("order");
  //   console.log(order, "<<< api");
  const { data } = await gamesApi.get("/reviews", {
    params: { category, order },
  });
  return data.reviews;
};

export const getReviewById = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}`);
  return data.review;
};

export const getReviewsByUsername = async (username) => {
  const { data } = await gamesApi.get(`/reviews?owner=${username}`);
  return data.reviews;
};

export const getComments = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}/comments`);
  return data.comments;
};

export const getCategories = async () => {
  const { data } = await gamesApi.get("/categories");
  return data.categories;
};

export const getUserByUsername = async (username) => {
  const { data } = await gamesApi.get(`/users/${username}`);
  return data.user;
};

export const postUser = async (userObj) => {
  const { data } = await gamesApi.post(`/users`, userObj);
  return data.user;
};
