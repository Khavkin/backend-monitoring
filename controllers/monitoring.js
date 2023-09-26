const Data = require("../models/data");
const { ctrlWrapper } = require("../helpers");

async function insertData(req, res) {
  const { Shop_ID, DeviceCode, ID1, Data1, ID2, Data2, ID3, Data3, ID4, Data4, ID5, Data5 } =
    req.body;
  const data = await Data.create({
    date: new Date(),
    object_id: Shop_ID,
    device_code: DeviceCode,
    sensor1: ID1,
    data1: Data1,
    sensor2: ID2,
    data2: Data2,
    sensor3: ID3,
    data3: Data3,
    sensor4: ID4,
    data4: Data4,
    sensor5: ID5,
    data5: Data5,
  });

  //console.log(req.body);
  // console.log(data);

  res.status(201).json({ message: "OK" });
}

async function getData(req, res) {
  const data = await Data.findAll();
  //addconsole.log(data);
  res.status(200).json({ data });
}

module.exports = {
  insertData: ctrlWrapper(insertData),
  getData: ctrlWrapper(getData),
};
