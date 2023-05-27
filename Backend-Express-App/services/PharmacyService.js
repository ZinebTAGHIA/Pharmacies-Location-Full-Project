const Pharmacy = require('../models/Pharmacy');

class PharmacyService {
  constructor(pharmacyModel) {
    this.pharmacyModel = pharmacyModel;
  }

  // Get all Pharmacys
  async getAllPharmacies() {
    try {
      const pharmacies = await this.pharmacyModel.find();
      return pharmacies;
    } catch (error) {
      throw new Error(`Unable to fetch pharmacies: ${error}`);
    }
  }

  // Get Pharmacys by city ID
  async getPharmaciesByZoneId(zoneId) {
    try {
      const pharmacies = await this.PharmacyModel.find({ zone: zoneId });
      return pharmacies;
    } catch (error) {
      throw new Error(`Unable to fetch pharmacies for zone ${zoneId}: ${error}`);
    }
  }

  // Get a Pharmacy by ID
  async getPharmacyById(id) {
    try {
      const pharmacy = await this.pharmacyModel.findById(id);
      if (!pharmacy) {
        throw new Error(`Pharmacy not found with ID ${id}`);
      }
      return pharmacy;
    } catch (error) {
      throw new Error(`Unable to fetch pharmacy with ID ${id}: ${error}`);
    }
  }

  // Save a new Pharmacy
  async createPharmacy(pharmacy) {
    try {
      const newPharmacy = new Pharmacy(pharmacy);
      const savedPharmacy = await newPharmacy.save();
      return savedPharmacy;
    } catch (error) {
      throw new Error(`Unable to create pharmacy: ${error}`);
    }
  }

  // Update a Pharmacy
  async updatePharmacy(id, updatedPharmacy) {
    try {
      const existingPharmacy = await this.pharmacyModel.findById(id);
      if (!existingPharmacy) {
        throw new Error(`Pharmacy not found with ID ${id}`);
      }
      existingPharmacy.Title = updatedPharmacy.Title;
      existingPharmacy.PhoneNumber = updatedPharmacy.PhoneNumber;
      existingPharmacy.Address = updatedPharmacy.Address;
      existingPharmacy.Latitude = updatedPharmacy.Latitude;
      existingPharmacy.Longitude = updatedPharmacy.Longitude;
      existingPharmacy.Garde = updatedPharmacy.Garde;
      existingPharmacy.Zone_id = updatedPharmacy.Zone_id;
      const updated = await existingPharmacy.save();
      return updated;
    } catch (error) {
      throw new Error(`Unable to update Pharmacy with ID ${id}: ${error}`);
    }
  }

  // Delete a Pharmacy by ID
  async deletePharmacy(id) {
    try {
      const deleted = await this.pharmacyModel.findByIdAndDelete(id);
      if (!deleted) {
        throw new Error(`Pharmacy not found with ID ${id}`);
      }
      return deleted;
    } catch (error) {
      throw new Error(`Unable to delete pharmacy with ID ${id}: ${error}`);
    }
  }
}

module.exports = PharmacyService;
