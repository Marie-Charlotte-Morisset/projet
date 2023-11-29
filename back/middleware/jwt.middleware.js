import jwt from "jsonwebtoken";

export const secret = "MOTDEPASSEPARDEFAUT";

const jwtOptions = {
  expiresIn: 28800000, // 8h
};

const jwtVerifiy = (token) => {
  try {
    if (!secret) throw new Error("Secret must be defined !");
    const decoded = jwt.verify(token, secret);
    const userId = decoded.data;
    return userId || null;
  } catch (err) {
    console.error("jwtVerify: error => ", err.message);
    return null;
  }
};

export const jwtSign = (data) => jwt.sign({ data: data }, secret, jwtOptions);

export const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const userId = jwtVerifiy(token);
  if (!userId) return res.status(401).json({ message: "unauthorized" });

  req.body = { ...req.body, userId };
  next();
};

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Acess Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    console.log(token);
    req.body.userId = jwtVerifiy(token);

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
