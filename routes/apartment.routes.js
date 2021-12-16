const express = require("express");
const router = express.Router();
const Apartment = require("../models/apartment.model");

//!Backend ROUTES FOR APARTMENTS:

//GET ALL
router.get("/api/apartments", async (req, res, next) => {
  try {
    const apartments = await Apartment.find();

    res.status(200).json(apartments);
  } catch (error) {
    next(error);
  }
});

//CREATE ONE
router.post("/api/apartments", async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const apartment = await Apartment.create({
      name,
      price,
    });

    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET ONE
router.get("/api/apartments/:apartmentId", async (req, res, next) => {
  try {
    const { apartmentId } = req.params;
    const apartment = await Apartment.findById(apartmentId);

    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//UPDATE

router.put("/api/apartments/:apartmentId", async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const { apartmentId } = req.params;
    const apartment = await Apartment.findByIdAndUpdate(
      apartmentId,
      {
        name,
        price,
      },
      { new: true }
    );
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//DELETE
router.delete("/api/apartments/:apartmentId", async (req, res, next) => {
  try {
    const { apartmentId } = req.params;
    await Apartment.findByIdAndDelete(apartmentId);
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
