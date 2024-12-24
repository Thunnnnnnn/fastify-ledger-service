import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../untils/db.server";
import type { User } from "../interface/users.types";
import bcrypt from "bcrypt";

import { v4 as uuidv4 } from "uuid";

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

const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  return;
};

const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.body as User;

  if (!user) {
    return reply.code(400).send({
      message: "Bad request",
    });
  }

  if(!user.email || !user.password) {
    return reply.code(400).send({
      message: "Email and password is required",
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
