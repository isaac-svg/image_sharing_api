/**
 *
 * @param {number} page - next page to go to
 * @param {number} size size or number of items to query
 * @returns {{limit: number, offset: number}}
 */
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
module.exports = getPagination;
