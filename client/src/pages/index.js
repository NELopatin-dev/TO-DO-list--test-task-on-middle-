import "./css/style.css";

const Main = () => {
    return (
        <>
            <main class="main">
                <div class="topbar">
                    <div class="panel user-info">
                        <p class="user-fullname">Lopatin N.E.</p>
                        <button class="btn user-exit">Выйти</button>
                    </div>

                    <div class="panel tools">
                        <button class="btn new_task">+</button>
                        <div class="group-buttons">
                            <button class="btn new_task">
                                Без группировки
                            </button>
                            <button class="btn new_task">По сроку</button>
                            <button class="btn new_task">По исполнителю</button>
                        </div>
                    </div>
                </div>

                <div class="tabel">
                    <div class="row status-titles">
                        <div class="status-col"></div>
                        <div class="status">
                            <p class="status-title">To-Do</p>
                        </div>

                        <div class="status">
                            <p class="status-title">Process</p>
                        </div>

                        <div class="status">
                            <p class="status-title">Ready</p>
                        </div>
                    </div>

                    <div class="row tasks">
                        <div class="group">
                            <div class="status-col">
                                <p class="status-title">Status 1</p>
                            </div>
                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="group">
                            <div class="status-col">
                                <p class="status-title">Status 1</p>
                            </div>
                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="group">
                            <div class="status-col">
                                <p class="status-title">Status 1</p>
                            </div>
                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="group">
                            <div class="status-col">
                                <p class="status-title">Status 1</p>
                            </div>
                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="group">
                            <div class="status-col">
                                <p class="status-title">Status 1</p>
                            </div>
                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="group">
                            <div class="status-col">
                                <p class="status-title">Status 1</p>
                            </div>
                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="status">
                                <div class="task-card">
                                    <div class="task-card-header">
                                        Test task
                                    </div>
                                    <div class="task-card-body">
                                        <p class="task-card-priority">
                                            FIRE!!!
                                        </p>
                                        <p class="task-card-data-finish">
                                            22.08.22
                                        </p>
                                        <p class="task-card-employee">
                                            Lopatin N.E.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-wrapper ">
                    <div class="panel modal">
                        <div class="modal-left-side">
                            <input
                                class="modal-header"
                                type="text"
                                placeholder="Заголовок"
                            ></input>
                            <textarea placeholder="Описание"></textarea>
                        </div>
                        <div class="modal-right-side">
                            <input type="datetime-local"></input>
                            <select>
                                <option>Приоритет</option>
                                <option>Не срочно</option>
                                <option>Быстрее</option>
                                <option>Огонь!!!</option>
                            </select>
                            <select>
                                <option>Статус</option>
                                <option>Надо сделать</option>
                                <option>В процессе</option>
                                <option>Готово</option>
                            </select>
                            <select>
                                <option>Ответственный</option>
                                <option>Н.Е. Лопатин</option>
                                <option>Кто-то другой</option>
                            </select>

                            <div class="modal-buttons">
                                <button class="btn modal-save">
                                    Сохранить
                                </button>
                                <button class="btn modal-close">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Main;
