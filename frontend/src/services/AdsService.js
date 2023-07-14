import APIService from "./APIService";

const getAds = () => {
  return APIService.get(`/ads`);
};

const postAd = () => {
  return APIService.post(`/ads`);
};

const getAdById = (id) => {
  return APIService.get(`/ads/${id}`);
};

export default {
  getAds,
  getAdById,
  postAd,
};
