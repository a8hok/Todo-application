
// Application routes goes here.
const Boom = require('boom');
const {
  getAllSticky,
  addSticky,
  updateDeleteSticky,
} = require('./fetch-helpers');

// get sticky details.
const getSticky = async (req, res) => {
  try {
    const data = await getAllSticky();
    if (data) return res.send(data);
    return res.send(Boom.badImplementation('Please add the sticky information'));
  } catch (err) {
    return res.send(err);
  }
};

// add sticky details.
const addStickyInfo = async (req, res) => {
  try {
    const stickyInfo = req.body || res.send(Boom.badImplementation('Please add the sticky information'));
    const data = await addSticky(stickyInfo);
    if (data) return res.send(data);
    return res.send(Boom.badImplementation('Internal error'));
  } catch (err) {
    return res.send(err);
  }
};

// update sticky details.
const updateSticky = async (req, res) => {
  try {
    if (!req.params.id && req.params.status) {
      return res.send(Boom.badImplementation('Please add the sticky information'));
    }
    const data = await updateDeleteSticky(req.params.id, req.params.status);
    if (data) return res.send(data);
    return res.send(Boom.badImplementation('Internal error'));
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  getSticky,
  addStickyInfo,
  updateSticky,
};
