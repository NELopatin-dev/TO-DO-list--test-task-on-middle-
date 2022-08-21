import "./css/style.css";

const Auth = () => {
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

                    <form method="post">
                        <div class="form-inputs">
                            <input
                                type="text"
                                name="login"
                                placeholder="Логин"
                            ></input>
                            <br></br>
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                            ></input>
                        </div>

                        <button type="submit" name="auth_btn">
                            ➜
                        </button>
                    </form>

                    <p class="error"></p>
                </div>
            </main>
        </>
    );
};

export default Auth;
