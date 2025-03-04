import express from "express";
import mysql from "mysql2/promise";
import session from "express-session";
import bcrypt from "bcrypt";
import "dotenv/config";

const app = express();

const saltRounds = 10;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
  })
);
//db connection
const connection = await mysql.createConnection({
  host: `${process.env.HOST_NAME}`,
  user: `${process.env.USER_NAME}`,
  database: `${process.env.DB_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
});

app.get("/api/tips", async (req, res) => {
  console.log(req.session);
  const [result] = await connection.query(
    "SELECT responseID, responseTips FROM responses WHERE userID = ?  ORDER BY  responseDate  DESC  LIMIT 7",
    [req.session.userId]
  );
  console.log(result);
  res.json(result);
});

app.post("/api/submit", async (req, res) => {
  const date = new Date(req.body.date);
  console.log(req.session.userId);
  const formattedDate = date.toLocaleDateString("en-CA");
  const [result] = await connection.query(
    "INSERT INTO responses (userID, responseDate,  responseMinutes, responseFocus, responseTips) VALUES(?,?, ?, ?,?)",
    [
      req.session.userId,
      formattedDate,

      req.body.minutes,
      req.body.focus,
      req.body.tips,
    ]
  );

  console.log(req.body);
});

app.post("/api/signup", async (req, res) => {
  const username = req.body.username;
  console.log(username);

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const [result, error] = await connection.query(
      "INSERT INTO users(name, password) VALUES (?,?)",
      [req.body.username, hash]
    );

    const [id] = await connection.query("SELECT id FROM users WHERE name=? ", [
      req.body.username,
    ]);

    console.log(id);
    req.session.userId = id[0].id;
    console.log(id[0].id);
    res.json(true);
  } catch (err) {
    console.log(err);
    res.json(false);
  }
});

app.get("/api/goal", async (req, res) => {
  const [result] = await connection.query(
    "SELECT ID, goal, status FROM goals WHERE userID = ? ORDER BY ID DESC ",
    [req.session.userId]
  );

  res.json(result);
});

app.post("/api/goal", async (req, res) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-CA");

  const [result] = await connection.query(
    "INSERT INTO goals (userID, data, goal ) VALUES (?, ?, ?)",
    [req.session.userId, formattedDate, req.body.goal]
  );
  const [goals] = await connection.query(
    "SELECT ID, goal, status FROM goals WHERE userID = ? ORDER BY ID DESC ",
    [req.session.userId]
  );
  console.log("questi sono quelli nuovi", goals);

  res.json(goals);
});

app.delete("/api/goal/:id", async (req, res) => {
  const id = req.params.id;
  const [result] = await connection.query("DELETE FROM GOALS WHERE ID = ?", [
    req.params.id,
  ]);
  const [goals] = await connection.query(
    "SELECT ID, goal, status FROM goals WHERE userID = ?  ORDER BY ID DESC",
    [req.session.userId]
  );

  res.json(goals);
});

app.put("/api/goal/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const [result] = await connection.query(
    "UPDATE goals SET status = CASE status WHEN 0 THEN 1 WHEN 1 THEN 0 END WHERE ID = ?",
    [id]
  );

  const [goals] = await connection.query(
    "SELECT * FROM goals WHERE userID = ? ORDER BY ID DESC",
    [req.session.userId]
  );
  console.log(goals);
  res.json(goals);
});

app.get("", (req, res) => {
  console.log("ciao");
  res.json("ciao");
});

app.get("/api/stats", async (req, res) => {
  console.log("id", req.session.userId);
  const [result] = await connection.query(
    "SELECT responseDate, responseMinutes, responseFocus FROM responses WHERE userID = ?",
    [req.session.userId]
  );

  res.json(result);
});

app.post("/api/login", async (req, res) => {
  console.log("ciao");
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, 10);

  console.log(hash);

  try {
    const [user] = await connection.query("SELECT * FROM users WHERE name=? ", [
      req.body.username,
    ]);
    console.log(user);
    const userCredential = user[0];
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      userCredential.password
    );
    console.log("this is userCred", isPasswordCorrect);
    console.log(userCredential.id);
    if (isPasswordCorrect) {
      req.session.auth = true;
      req.session.userId = userCredential.id;
      console.log(req.session.userId);
    } else {
      req.session.auth = false;
    }
  } catch (err) {
    console.log(err);
    req.session.auth = false;
  }
  console.log("the real ", req.session.userId);
  res.json(req.session.auth);
});

app.get("/api/auth", (req, res) => {
  res.json("false");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
