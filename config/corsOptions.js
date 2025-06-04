const allowedOrigins = require("./allowedOrigins");

//cors: cross origin resorce sharing
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions };
