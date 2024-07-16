const profile = async (req, res) => {
  // console.log("Profile is hit");
  if (!req.user) {
    return res.status(400).json("not signed in");
  } else {
    return res.status(200).json(req.user);
  }
};

module.exports = profile;
