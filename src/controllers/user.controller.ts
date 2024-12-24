import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../untils/db.server";
import type { User } from "../interface/users.types";
import bcrypt from "bcrypt";

// ฟังก์ชัน hash รหัสผ่าน
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // จำนวนรอบในการสร้าง salt
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw new Error("Error hashing password");
  }
};

const getUsers = async (request: FastifyRequest, reply: FastifyReply, offset: number, limit: number) => {
  const users = await db.user.findMany({
    skip: offset,
    take: limit,
  });

  return reply.code(200).send({
    message: "Get users successfully",
    data: users,
  });
};

const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.body as User;

  if (!user) {
    return reply.code(400).send({
      message: "Bad request",
    });
  }

  if (!user.email || !user.password) {
    return reply.code(400).send({
      message: "Email and password is required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(user.email)) {
    return reply.code(400).send({
      message: "Invalid email format",
    });
  }

  try {
    const createUser = await db.user.create({
      data: {
        name: user.name ? user.name : undefined,
        email: user.email,
        password: await hashPassword(user.password),
      },
    });

    return reply.code(201).send({
      message: "User created successfully",
      data: createUser,
    });
  } catch (error) {
    console.log(error);

    return reply.code(500).send({
      message: "Internal server error",
      error,
    });
  }
};

export default {
  getUsers,
  createUser,
};
