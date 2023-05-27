const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy');
const PharmacyService = require('../services/PharmacyService');
const pharmacyService = new PharmacyService(Pharmacy);

router.get('/', async (req, res) => {
  try {
    const pharmacies = await pharmacyService.getAllPharmacies();
    res.json(pharmacies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pharmacy = await pharmacyService.getPharmacyById(req.params.id);
    res.json(pharmacy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/zone/:zoneId', async (req, res) => {
  try {
    const pharmacies = await pharmacyService.getPharmaciesByZoneId(req.params.zoneId);
    res.json(pharmacies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/save', async (req, res) => {
  try {
    const pharmacy = await pharmacyService.createPharmacy(req.body);
    res.json(pharmacy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const pharmacy = await pharmacyService.updatePharmacy(req.params.id, req.body);
    res.json(pharmacy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pharmacyService.deletePharmacy(req.params.id);
    res.json({ msg: 'Pharmacy deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
