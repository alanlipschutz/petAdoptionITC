function pageNotFound(req, res) {
  return res.status(404).send("404 - Page does not exist");
}

export default pageNotFound;
