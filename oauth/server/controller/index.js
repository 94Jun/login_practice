const axios = require("axios");

module.exports = {
  accessToken: async (req, res) => {
    try {
      const { code } = req.body;
      const accessToken = await axios({
        url: "https://github.com/login/oauth/access_token",
        method: "POST",
        data: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
        },
      });
      const item = accessToken.data;
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
