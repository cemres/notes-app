import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt-helpers.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.findAll({
      where: {
        email,
      },
    });
    if (!users.length) {
      return res.status(401).json({
        error: "Email or password invalid",
      });
    }
    const validPassword = await bcrypt.compare(password, users[0].password);
    if (!validPassword) {
      return res.status(401).json({ error: "Email or password invalid" });
    }
    //JWT
    let tokens = jwtTokens(users[0]);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
    });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/refresh-token", (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken)
      return res.status(401).json({ error: "Null refresh token" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        res.cookie("refresh_token", tokens.refreshToken, {
          httpOnly: true,
        });
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.delete("/refresh-token", (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "refresh token deleted" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
