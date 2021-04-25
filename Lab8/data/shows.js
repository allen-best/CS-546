const axios = require('axios');

const showsUrl = "http://api.tvmaze.com/shows";
const searchShows = "http://api.tvmaze.com/search/shows?q="

let exportedMethods = {
  async getAllShows() {
    const { data } = await axios.get(showsUrl);
    return data;
  },
  async getShowsById(id) {
    const idShowUrl = showsUrl + "/" + id.toString();
    const { data } = await axios.get(idShowUrl);
    return data;
  },
  async getShowsBySearchTerm(term) {
    const idShowUrl = searchShows + term;
    const { data } = await axios.get(idShowUrl);
    return data;
  }
};

module.exports = exportedMethods;