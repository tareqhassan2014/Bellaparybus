const jwt = require("jsonwebtoken");
const db = require('../../services/db');

const occasionsTable = 'occasions';

/**
 * Get All Occasions
 */
exports.getAll = () => { 
  return new Promise(async (resolve, reject) => {
    const occasions = await db.query(`SELECT * FROM ${occasionsTable}`);
    resolve({
      status: 200,
      message: 'Get All Occasions',
      occasions
    });
  });
}

/**
 * Add One Occasion
 * 
 * @param String Occasion
 */
 exports.addOne = (newOccasion) => { 
  return new Promise(async (resolve, reject) => {
    const occasions = await db.query(`INSERT INTO ${occasionsTable}(occasion) VALUES ('${newOccasion}')`);
    resolve({
      status: 200,
      message: 'Get All Occasions',
      occasions
    });
  });
}

/**
 * Update One Occasions
 * 
 * @param String Occasion Name
 * @param int OccasionsID
 */
 exports.updateOne = (occasionName, id) => { 
  return new Promise(async (resolve, reject) => {
    const occasions = await db.query(`UPDATE ${occasionsTable} SET occasion='${occasionName}' where id=${id}`);
    resolve({
      status: 200,
      message: 'Get All Occasions',
      occasions
    });
  });
}

/**
 * Delete One Occasion
 * 
 * @param int Occasion Id
 */
 exports.deleteOne = (id) => { 
  return new Promise(async (resolve, reject) => {
    const occasions = await db.query(`DELETE FROM ${occasionsTable} where id=${id}`);
    resolve({
      status: 200,
      message: 'Get All Occasions',
      occasions
    });
  });
}