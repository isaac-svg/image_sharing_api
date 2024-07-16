const getPagination = require("../../utils/getPagination");

/**
 *@param {import('express').Request} req - The request object from Express.
 * @param {import('express').Response} res
 */
const queryData = async (req, res) => {
  try {
    const { page = 0, size = 15, query } = req.query;
    const { limit, offset } = getPagination(page, size);
  } catch (error) {}
};
