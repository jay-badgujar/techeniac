const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const Token = req.header('accessToken_techeniac_user');

  if (!Token) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(Token, "importantsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};


module.exports = { validateToken  };
