import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  // const token = req.header("Authorization");
  // console.log('req.header: ', req.header("Authorization"));
  const token = req.cookies?.accessToken;
  console.log('token: ', token);
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('error: ', error);
    res.status(403).json({ msg: "Invalid token" });
  }
};

export default authenticate;
