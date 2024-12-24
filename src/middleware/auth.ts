import { FastifyRequest, FastifyReply } from "fastify";
import {db} from "../untils/db.server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const { serialize, parse } = require("@fastify/cookie");

const login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
  
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    // ตรวจสอบข้อมูลผู้ใช้
    if (!user) {
      return reply.status(401).send({ message: "Invalid email" });
    } else {
      if (!(await bcrypt.compare(password, user.password))) {
        return reply.status(401).send({ message: "Password wrong" });
      }
  
      try {
        const token = uuidv4();
  
        const cookie = serialize(token, {
          maxAge: 60 * 60 * 24, // ตั้งค่าเวลาหมดอายุของ cookie เป็น 1 วัน
          path: "/", // ใช้สำหรับทุก route
        });
        reply.header("token", cookie);
  
        return reply.send({ message: "Login successful" });
      } catch (error) {
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  }

  export default {
    login,
  }
