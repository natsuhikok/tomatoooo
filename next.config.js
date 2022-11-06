const git = require('git-rev-sync');
const moment = require('moment');

module.exports = {
  trailingSlash: true,
  env: {
    BUILT_AT: moment().format("YYYYMMDDHHmmss"),
    CLIENT_SHA: git.long(),
    CLIENT_URL: "https://tomatoooo.netlify.app",
  }
};