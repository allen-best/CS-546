const axios = require('axios');

const showsUrl = "http://api.tvmaze.com/shows";

let exportedMethods = {
  async getAllShows() {
    const { data } = await axios.get(showsUrl);
    return data;
  },
  async getShowsById(id) {
    const idShowUrl = showsUrl + "/" + id.toString();
    const { data } = await axios.get(idShowUrl);
    return data;
  }
};

module.exports = exportedMethods;