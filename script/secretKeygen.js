require('dotenv').config();
const bcrypt = require('bcryptjs');

var initiate = require('faker').random.words();
var encoded = require('jsonwebtoken').sign({ key: initiate }, process.env.JWT_SIGNATURE_KEY || "This is a super secret key" );
var salt = bcrypt.genSaltSync(10);

bcrypt.hash(encoded, salt)
  .then(encrypted => {
    encrypted = encrypted
      .split("")
      .filter(i => i != "$")
      .join("");
    console.log(encrypted)
  })
  .catch(err => console.error(err));
