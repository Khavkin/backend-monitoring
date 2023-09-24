async function insertData(req, res) {
  const { body } = req;
  console.log(body);
  res.status(201).json({ message: "OK" });
}

module.exports = {
  insertData,
};
