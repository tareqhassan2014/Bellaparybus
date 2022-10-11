const jwt = require("jsonwebtoken");
const db = require('../../services/db');

const vehiclesTable = 'vehicles';

/**
 * Get All Vehicles
 */
exports.getAll = () => { 
  return new Promise(async (resolve, reject) => {
    const vehicles = await db.query(`SELECT * FROM ${vehiclesTable}`);
    resolve({
      status: 200,
      message: 'Get All Vehicles',
      vehicles
    });
  });
}

/**
 * Add One Vehicle
 * 
 * @param String Vehicle
 */
 exports.addOne = (newVehicle) => { 
  return new Promise(async (resolve, reject) => {
    const vehicles = await db.query(`INSERT INTO ${vehiclesTable}(vehicle) VALUES ('${newVehicle}')`);
    resolve({
      status: 200,
      message: 'Get All Vehicles',
      vehicles
    });
  });
}

/**
 * Update One Vehicle
 * 
 * @param String Vehicle Type
 * @param int VehicleID
 */
 exports.updateOne = (vehicleType, id) => { 
  return new Promise(async (resolve, reject) => {
    const vehicles = await db.query(`UPDATE ${vehiclesTable} SET vehicle='${vehicleType}' where id=${id}`);
    resolve({
      status: 200,
      message: 'Get All Vehicles',
      vehicles
    });
  });
}

/**
 * Delete One Vehicle
 * 
 * @param int VehicleID
 */
 exports.deleteOne = (id) => { 
  return new Promise(async (resolve, reject) => {
    const vehicles = await db.query(`DELETE FROM ${vehiclesTable} where id=${id}`);
    resolve({
      status: 200,
      message: 'Get All Vehicles',
      vehicles
    });
  });
}