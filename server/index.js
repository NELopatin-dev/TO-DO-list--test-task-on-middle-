const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

app.use(cors());
app.use(express.json());

config();

const db = mysql.createConnection({
    host: process.env.MYSQL_CONN_HOST,
    user: process.env.MYSQL_CONN_USER,
    password: process.env.MYSQL_CONN_PASS,
    database: process.env.MYSQL_CONN_DB,
});

const generateJwt = (id, login, boss) => {
    return jwt.sign({ id, login, boss }, process.env.SECRET_KEY, {
        expiresIn: "60d",
    });
};

const getDecodedToken = (token) => {
    return jwt.decode(token);
};

app.get("/getStatus", (req, res) => {
    db.query("SELECT * FROM task_status", (err, result) => {
        if (err) {
            res.send({
                error: "Ошибка",
            });
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/getPriority", (req, res) => {
    db.query("SELECT * FROM task_priority", (err, result) => {
        if (err) {
            res.send({
                error: "Ошибка",
            });
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/getUserInfo", (req, res) => {
    const { token } = req.body;

    const { id, login, boss } = getDecodedToken(token);

    db.query(
        "SELECT name, surname, patronymic, boss_status FROM users WHERE id = ? AND login = ? AND boss_status = ?",
        [id, login, boss],
        (err, result) => {
            if (err) {
                res.send({
                    error: "Ошибка",
                });
                console.log(err);
            } else {
                if (result.length === 0) {
                    res.send({ mess: "Нет пользователя" });
                } else {
                    res.send(result[0]);
                }
            }
        }
    );
});

app.post("/auth", (req, res) => {
    const { login, password } = req.body;

    db.query(
        "SELECT id, login, boss_status, password FROM users WHERE login = '" +
            login +
            "'",
        (err, result) => {
            if (err) {
                res.send({
                    error: "Ошибка",
                });
                console.log(err);
            } else {
                if (result.length === 0) {
                    res.send({
                        error: "Пользователь c таким логином не найден",
                    });
                } else {
                    let check_login = false;
                    let check_password = false;

                    for (const user of result) {
                        check_login = false;

                        if (user.login === login) {
                            check_login = true;
                            if (user.password === password) {
                                check_password = true;
                            }
                        }

                        if (check_login && check_password) {
                            res.send(
                                generateJwt(
                                    user.id,
                                    user.login,
                                    user.boss_status
                                )
                            );

                            break;
                        }
                    }

                    if (check_login && !check_password) {
                        res.send({
                            error: "Пароль введён неверно. Повторите попытку.",
                        });
                    }
                }
            }
        }
    );
});

app.post("/check", (req, res) => {
    const { token } = req.body;

    const { id, login, boss } = getDecodedToken(token);

    db.query(
        "SELECT * FROM users WHERE  id = ? AND login = ? AND boss_status = ?",
        [id, login, boss],
        (err, result) => {
            if (err) {
                res.send({
                    error: "Ошибка",
                });
                console.log(err);
            } else {
                if (result.length === 0) {
                    res.send({ auth: false });
                } else {
                    res.send({ auth: true });
                }
            }
        }
    );
});

app.post("/getEmployees", (req, res) => {
    const { token } = req.body;

    const { id } = getDecodedToken(token);

    db.query(
        "SELECT id, name, surname, patronymic FROM users WHERE  boss_id = ?",
        [id],
        (err, result) => {
            if (err) {
                res.send({
                    error: "Ошибка",
                });
                console.log(err);
            } else {
                if (result.length === 0) {
                    res.send({ mess: "Нет сотрудников" });
                } else {
                    res.send(result);
                }
            }
        }
    );
});

app.post("/getTasks", (req, res) => {
    const { token } = req.body;
    const user = getDecodedToken(token);

    if (user.boss === 1) {
        db.query(
            "SELECT tasks.*, users.name AS employee_name, users.surname AS employee_surname, users.patronymic  AS employee_patronymic, task_priority.title AS priority_title, task_status.title AS status_title  FROM tasks JOIN users ON users.id = tasks.employee_id JOIN task_priority ON task_priority.id = tasks.priority_id JOIN task_status ON task_status.id = tasks.status_id  WHERE users.boss_id = ? ORDER BY tasks.data_update",
            [user.id],
            (err, result) => {
                if (err) {
                    res.send({
                        error: "Ошибка",
                    });
                    console.log(err);
                } else {
                    if (result.length === 0) {
                        res.send({ mess: "Нет сотрудников или задач" });
                    } else {
                        res.send(result);
                    }
                }
            }
        );
    } else {
        db.query(
            "SELECT tasks.*, task_priority.title AS priority_title, task_status.title AS status_title  FROM tasks JOIN task_priority ON task_priority.id = tasks.priority_id JOIN task_status ON task_status.id = tasks.status_id WHERE tasks.employee_id = ? ORDER BY tasks.data_update",
            [user.id],
            (err, result) => {
                if (err) {
                    res.send({
                        error: "Ошибка",
                    });
                    console.log(err);
                } else {
                    if (result.length === 0) {
                        res.send({ mess: "Нет задач" });
                    } else {
                        res.send(result);
                    }
                }
            }
        );
    }
});

app.post("/taskToDB", (req, res) => {
    const {
        id,
        title,
        description,
        data_start,
        data_update,
        data_finish,
        priority_id,
        status_id,
        employee_id,
        token,
    } = req.body;

    const user = getDecodedToken(token);

    if (id === null) {
        db.query(
            "INSERT INTO tasks (title, description, data_start, data_finish, data_update, priority_id, status_id, creater_id, employee_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                title,
                description,
                new Date(data_start),
                new Date(data_finish),
                new Date(data_update),
                parseInt(priority_id),
                parseInt(status_id),
                user.id,
                parseInt(employee_id),
            ],
            (err, result) => {
                if (err) {
                    res.send({
                        error: "Ошибка",
                    });
                    console.log(err);
                } else {
                    res.send({ mess: "Запись добавлена" });
                }
            }
        );
    } else {
        db.query(
            "UPDATE tasks SET title = ?, description = ?, status_id = ?, employee_id = ?, data_update = ?, data_finish = ?, data_start = ?, priority_id = ? WHERE id = ?",
            [
                title,
                description,
                status_id,
                employee_id,
                new Date(data_update),
                new Date(data_finish),
                new Date(data_start),
                priority_id,
                id,
            ],
            (err, result) => {
                if (err) {
                    res.send({
                        error: "Ошибка",
                    });
                    console.log(err);
                } else {
                    res.send({ mess: "Запись обновлена" });
                }
            }
        );
    }
});

app.listen(3001, () => {
    console.log("Listening on port 3001!");
});
