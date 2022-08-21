import "./css/style.css";

const NoPage = () => {
    return (
        <>
            <main>
                <h1 class="bg-title">
                    404
                    <br />
                    ERROR
                </h1>

                <div class="panel error-panel">
                    <p class="panel-title">Страница не существует.</p>

                    <p class="panel-body">
                        Возможно, вы ошиблись ссылкой или страница была удалена.
                        Вернитесь на домашнюю страницу.
                    </p>

                    <a class="btn" href="/">
                        Домой
                    </a>
                </div>
            </main>
        </>
    );
};

export default NoPage;
