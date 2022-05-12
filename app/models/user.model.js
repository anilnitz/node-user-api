const sql = require("./db.js");
// constructor
const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};
User.register = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created users: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
// for login api

User.getLogin = (email,password, result) => {
  sql.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

//for login api end
User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
User.getAll = (name, result) => {
  let query = "SELECT * FROM users";
  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};
User.getAllPublished = result => {
  sql.query("SELECT * FROM users ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
    [user.name, user.email, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated users: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};
User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted users with id: ", id);
    result(null, res);
  });
};
User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};
module.exports = User;