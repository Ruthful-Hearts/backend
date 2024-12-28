const notFoundHandler = async (c) => {
  return c.json(
    {
      error: true,
      message: `Route not found: ${c.req.method} ${c.req.url}`,
    },
    404
  );
};

module.exports = notFoundHandler;
