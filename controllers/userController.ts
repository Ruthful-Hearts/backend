import * as userService from "../services/userService";
import type { Context } from "hono";

export const getAllUsers = async (c: Context) => {
	try {
		const filters = c.req.query() || {};
		const users = await userService.getAllUsers(filters);
		return c.json(users, 200);
	} catch (error) {
		return c.json({ error: error.message }, 500);
	}
};

export const getUserById = async (c: Context) => {
	try {
		const userId = c.req.param("id");
		const user = await userService.getUserById(userId);
		return c.json(user, 200);
	} catch (error) {
		return c.json({ error: error.message }, 404);
	}
};

export const updateUser = async (c: Context) => {
	try {
		const userId = c.req.param("id");
		const updateData = await c.req.json();
		const updatedUser = await userService.updateUser(userId, updateData);
		return c.json(
			{ message: "User updated successfully", user: updatedUser },
			200,
		);
	} catch (error) {
		return c.json({ error: error.message }, 400);
	}
};

export const deleteUser = async (c: Context) => {
	try {
		const userId = c.req.param("id");
		const deletedUser = await userService.deleteUser(userId);
		return c.json(
			{ message: "User deleted successfully", user: deletedUser },
			200,
		);
	} catch (error) {
		return c.json({ error: error.message }, 404);
	}
};
