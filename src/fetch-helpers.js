const Chance = require('chance');
const moment = require('moment');
const Boom = require('boom');
const { insertOne, updateOne, findAll } = require('./fetch-from-db');

// Instantiate Chance for randam genration.(randam can be number, phone, string ...)
const chance = new Chance();

// Add Collection names.
const stickyTable = 'sticky_note';

// get All sticky
const getAllSticky = async () => findAll(stickyTable, { sticky_status: { $ne: 0 } });

// Add sticky.
const addSticky = async (stickyInfo) => {
  let stickyDetails = {};
  if (stickyInfo) {
    stickyDetails = {
      sticky_id: chance.integer({ min: 1, max: 99999 }),
      sticky_note: stickyInfo.note,
      sticky_time: moment.utc().format(),
      sticky_status: parseInt(1, 10),
    };
  }
  return insertOne(stickyTable, stickyDetails);
};

// Change status if user deletes the Sticky (Soft delete).
const updateDeleteSticky = async (stickyId, stickeyStatus) => {
  if (!stickyId) {
    return Boom.badImplementation('Sticky id missing');
  }
  const queryOptions = {
    id: parseInt(stickyId, 10),
    status: parseInt(stickeyStatus, 10),
  };
  return updateOne(stickyTable, queryOptions);
};

module.exports = {
  addSticky,
  updateDeleteSticky,
  getAllSticky,
};

