const errorHandler = async (err, c) => {
	console.error("Error:", err.message);

	const status = err.status || 500;

	const message = status === 500 ? "Internal Server Error" : err.message;

	if (err.code === "LIMIT_FILE_SIZE") {
		return c.json(
			{ error: true, message: "File size exceeds the limit of 5MB." },
			400,
		);
	}

	if (err.message.includes("Invalid file type")) {
		return c.json({ error: true, message: err.message }, 400);
	}

	return c.json(
		{
			error: true,
			message,
			...(process.env.NODE_ENV === "development" && { stack: err.stack }),
		},
		status,
	);
};

export default errorHandler;
