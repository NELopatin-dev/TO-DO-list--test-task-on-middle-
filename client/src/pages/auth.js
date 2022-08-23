import "./css/style.css";
import { useState } from "react";
import Axios from "axios";
import cookieCutter from "cookie-cutter";
import bcrypt from "bcryptjs";

const Auth = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const urlAPI = process.env.REACT_APP_URLAPI;

    const logIn = () => {
        Axios.post(`${urlAPI}/auth`, {
            login: login,
            password: bcrypt.hashSync(
                password,
                "$2a$10$CwTycUXWue0Thq9StjUM0u"
            ),
        }).then((res) => {
            if (res.data.error) {
                setError(res.data.error);
            } else {
                setError(null);
                cookieCutter.set("userToken", res.data);
                window.location.reload(false);
            }
        });
    };

    return (
        <>
            <main>
                <h1 class="bg-title">
                    TO-DO
                    <br />
                    SUCCESS
                </h1>

                <div class="panel auth">
                    <p class="panel-title">Авторизация</p>

                    <div class="panel-body">
                        <div class="form-inputs">
                            <input
                                type="text"
                                name="login"
                                placeholder="Логин"
                                onChange={(e) => {
                                    setLogin(e.target.value);
                                }}
                            ></input>
                            <br></br>
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            ></input>
                        </div>

                        <button
                            type="submit"
                            name="auth_btn"
                            onClick={() => {
                                logIn();
                            }}
                        >
                            ➜
                        </button>
                    </div>

                    <p class="error">{error ? error : null}</p>
                </div>
            </main>
        </>
    );
};

export default Auth;
