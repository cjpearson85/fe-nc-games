import axios from 'axios'

const gamesApi = axios.create({
  // baseURL: 'http://localhost:9090/api',
  baseURL: 'https://nc-games-chris.herokuapp.com/api',
})

gamesApi.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token') || ''
    config.headers = {
      authorization: `BEARER ${token}`,
    }
    return config
  },
  null,
  { synchronous: true }
)

export const getReviews = async ({
  category,
  order,
  sort_by,
  title,
  owner,
  p,
}) => {
  const { data } = await gamesApi.get('/reviews', {
    params: { category, order, sort_by, title, owner, p },
  })
  return data
}

export const postReview = async (newReview) => {
  const { data } = await gamesApi.post('/reviews', newReview)
  return data.review
}

export const getReviewById = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}`)
  return data.review
}

export const deleteReviewById = async (review_id) => {
  return await gamesApi.delete(`/reviews/${review_id}`)
}

export const getComments = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}/comments`)
  return data.comments
}

export const getCategories = async () => {
  const { data } = await gamesApi.get('/categories')
  return data.categories
}

export const getUsers = async (sortBy) => {
  const [sort_by, order] = sortBy.split('-')
  const { data } = await gamesApi.get('/users', {
    params: { order, sort_by },
  })
  return data.users
}

export const getUserByUsername = async (username) => {
  const { data } = await gamesApi.get(`/users/${username}`)
  return data.user
}

export const postUser = async (userObj) => {
  if (
    !/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i.test(
      userObj.avatar_url
    )
  )
    userObj.avatar_url =
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

  const {
    data: { user, token },
  } = await gamesApi.post(`/register`, userObj)
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export const loginUser = async (userObj) => {
  const {
    data: { user, token },
  } = await gamesApi.post(`/login`, userObj)
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export const patchReviewById = async (review_id, votes) => {
  const { data } = await gamesApi.patch(`/reviews/${review_id}`, {
    inc_votes: votes,
  })
  return data.review
}

export const postCommentToReview = async (review_id, username, comment) => {
  const { data } = await gamesApi.post(`/reviews/${review_id}/comments`, {
    author: username,
    body: comment,
  })
  return data.comment
}

export const patchCommentById = async (comment_id, votes) => {
  const { data } = await gamesApi.patch(`/comments/${comment_id}`, {
    inc_votes: votes,
  })
  return data.comment
}

export const deleteCommentById = async (comment_id) => {
  return await gamesApi.delete(`/comments/${comment_id}`)
}
