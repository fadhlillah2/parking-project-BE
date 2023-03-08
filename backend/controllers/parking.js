const Parking = require("../models/parking");

const checkIn = async (req, res) => {
  try {
    const { vehicleTypes, vehiclePlates } = req.body;

    const checkIn = await Parking.findOne({
      where: {
        vehiclePlates: vehiclePlates,
        isCheckIn: true,
      },
    });

    if (!vehicleTypes || !vehiclePlates) {
      return res.status(400).json({ message: "Please add all fields." });
    }

    if (checkIn) {
      return res
        .status(400)
        .json({ message: "vehicle license plate number is entered" });
    }

    const newParking = new Parking({
      vehicleTypes,
      vehiclePlates,
      imageCheckIn: req.file.path,
    });

    await newParking.save();

    res
      .status(201)
      .json({ message: "Succesfully parking.", id: newParking.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkOut = async (req, res) => {
  try {
    const {
      vehicleTypes,
      vehiclePlates,
      parkingNumber,
      paymentMethod,
      voucherCode,
    } = req.body;

    if (!vehicleTypes || !vehiclePlates || !parkingNumber || !paymentMethod) {
      return res.status(400).json({ message: "Please add all fields." });
    }

    const parking = await Parking.findOne({
      where: { vehiclePlates, id: parkingNumber },
    });

    if (!parking) {
      return res.status(404).json({ message: "No parking record found" });
    }

    if (parking.isCheckOut === true) {
      return res.status(404).json({
        message: `Vehicles with this ${parking.vehiclePlates} plate are already out`,
      });
    }

    const checkInHour = parking.createdAt.getHours();
    const checkOutHour = new Date().getHours();
    const parkingDuration = checkOutHour - checkInHour;
    let price = 3000;

    if (parkingDuration > 1) {
      price *= parkingDuration;
    }

    const updatedParking = await parking.update({
      vehiclePlates,
      vehicleTypes,
      parkingNumber,
      paymentMethod,
      voucherCode,
      imageCheckOut: req.file.path,
      price,
      isCheckIn: false,
      isCheckOut: true,
    });

    res
      .status(200)
      .json({ message: "Succesfully checkOut", data: updatedParking });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { checkIn, checkOut };
