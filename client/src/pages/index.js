import "./css/style.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import cookieCutter from "cookie-cutter";
import { format } from "date-fns";

const Main = () => {
    const [userInfo, setUserInfo] = useState(null);

    const [modalActive, setModalActive] = useState(false);
    const [arrStatus, setArrStatus] = useState([]);
    const [arrGroups, setArrGroups] = useState([]);
    const [arrPriority, setArrPriority] = useState([]);
    const [arrEmployees, setArrEmployees] = useState([]);

    const [currGroup, setCurrGroup] = useState(0);
    const [tasks, setTasks] = useState([]);

    const [modalId, setModalId] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [modalDataStart, setModalDataStart] = useState(Date.now());
    const [modalDataFinish, setModalDataFinish] = useState(Date.now());
    const [modalPriority, setModalPriority] = useState(null);
    const [modalStatus, setModalStatus] = useState(null);
    const [modalEmployee, setModalEmployee] = useState(null);
    const [modalMess, setModalMess] = useState("");
    const [modalError, setModalError] = useState("");

    const urlAPI = process.env.REACT_APP_URLAPI;

    useEffect(() => {
        let user = null;

        Axios.post(`${urlAPI}/getUserInfo`, {
            token: cookieCutter.get("userToken"),
        }).then((res) => {
            setUserInfo(res.data);
            user = res.data;
        });
        Axios.get(`${urlAPI}/getStatus`).then((res) => {
            setArrStatus(res.data);
        });
        Axios.get(`${urlAPI}/getPriority`).then((res) => {
            setArrPriority(res.data);
        });

        if ((userInfo && userInfo.boss_status) || (user && user.boss_status)) {
            Axios.post(`${urlAPI}/getEmployees`, {
                token: cookieCutter.get("userToken"),
            }).then((res) => {
                setArrEmployees(res.data);
            });
        }

        Axios.post(`${urlAPI}/getTasks`, {
            token: cookieCutter.get("userToken"),
        }).then((res) => {
            setTasks(res.data);

            let arr = [];
            let arrId = [];
            if (res.data.length > 0) {
                for (const task of res.data) {
                    if (
                        currGroup === 1 &&
                        !arr.includes(
                            format(new Date(task.data_finish), "dd.MM.yyyy")
                        )
                    ) {
                        arr.push(
                            format(new Date(task.data_finish), "dd.MM.yyyy")
                        );
                    } else if (
                        currGroup === 2 &&
                        !arrId.includes(task.employee_id)
                    ) {
                        arrId.push(task.employee_id);
                        if (!userInfo.boss_status) {
                            arr.push(
                                `${userInfo.surname} ${userInfo.name[0]}.${userInfo.patronymic[0]}.`
                            );
                        } else {
                            arr.push(
                                `${task.employee_surname} ${task.employee_name[0]}.${task.employee_patronymic[0]}.`
                            );
                        }
                    }
                }
            }
            setArrGroups(arr);
        });
    }, [currGroup]);

    const logOut = () => {
        cookieCutter.set("userToken", "0", { expires: new Date(0) });
        window.location.reload(false);
    };

    const toggelTaskModal = (task_id = null) => {
        if (!modalActive && tasks.length > 0) {
            for (const task of tasks) {
                if (task.id === task_id) {
                    setModalId(task.id);
                    setModalTitle(task.title);
                    setModalDescription(task.description);
                    setModalDataStart(task.data_start);
                    setModalDataFinish(task.data_finish);
                    setModalPriority(task.priority_id);
                    setModalStatus(task.status_id);
                    setModalEmployee(task.employee_id);
                    setModalMess("");
                    setModalError("");

                    break;
                }
            }
        }

        setModalActive(modalActive ? false : true);
    };

    const taskToDB = () => {
        Axios.post(`${urlAPI}/taskToDB`, {
            id: modalId,
            title: modalTitle,
            description: modalDescription,
            data_start: modalDataStart,
            data_update: new Date(),
            data_finish: modalDataFinish,
            priority_id: modalPriority,
            status_id: modalStatus,
            employee_id: modalEmployee,
            token: cookieCutter.get("userToken"),
        }).then((res) => {
            if (res.data.error) {
                setModalError(res.data.error);
            } else if (res.data.mess) {
                setModalMess(res.data.mess);
                toggelTaskModal();

                setModalId(null);
                setModalTitle("");
                setModalDescription("");
                setModalDataStart(new Date());
                setModalDataFinish(new Date());
                setModalPriority(null);
                setModalStatus(null);
                setModalEmployee(null);
                setModalMess("");
                setModalError("");

                window.location.reload();
            }
        });
    };

    return (
        <>
            <main class="main">
                <div class="topbar">
                    <div class="panel user-info">
                        {userInfo ? (
                            <p class="user-fullname">{`${userInfo.surname} ${userInfo.name[0]}.${userInfo.patronymic[0]}.`}</p>
                        ) : null}
                        <button class="btn user-exit" onClick={() => logOut()}>
                            Выйти
                        </button>
                    </div>

                    <div class="panel tools">
                        {userInfo && userInfo.boss_status ? (
                            <button
                                class="btn new_task"
                                onClick={() => toggelTaskModal()}
                            >
                                +
                            </button>
                        ) : null}
                        <div
                            class={
                                userInfo && userInfo.boss_status
                                    ? "group-buttons"
                                    : "group-buttons no-left-gap"
                            }
                        >
                            <button
                                class={currGroup === 0 ? "btn active" : "btn"}
                                onClick={() => {
                                    setCurrGroup(0);
                                }}
                            >
                                Без группировки
                            </button>
                            <button
                                class={currGroup === 1 ? "btn active" : "btn"}
                                onClick={() => {
                                    setCurrGroup(1);
                                }}
                            >
                                По дате завершения
                            </button>
                            <button
                                class={currGroup === 2 ? "btn active" : "btn"}
                                onClick={() => {
                                    setCurrGroup(2);
                                }}
                            >
                                По исполнителю
                            </button>
                        </div>
                    </div>
                </div>

                <div class="tabel">
                    <div class="row status-titles">
                        <div class="status-col"></div>
                        {arrStatus.map((status, i) => (
                            <div class="status">
                                <p class="status-title" id={"s_" + i}>
                                    {status.title}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div class="row tasks">
                        {arrGroups.length !== 0 ? (
                            arrGroups.map((group, indexGroup) => (
                                <div class="group">
                                    <div class="status-col">
                                        <p class="status-title">{group}</p>
                                    </div>
                                    {arrStatus.map((status, indexStatus) => (
                                        <div class="status">
                                            {tasks.map((task) =>
                                                task.status_id === status.id &&
                                                (group ===
                                                    format(
                                                        new Date(
                                                            task.data_finish
                                                        ),
                                                        "dd.MM.yyyy"
                                                    ) ||
                                                    group ===
                                                        (!userInfo.boss_status
                                                            ? `${userInfo.surname} ${userInfo.name[0]}.${userInfo.patronymic[0]}.`
                                                            : `${task.employee_surname} ${task.employee_name[0]}.${task.employee_patronymic[0]}.`)) ? (
                                                    <div
                                                        class="task-card"
                                                        onClick={() =>
                                                            toggelTaskModal(
                                                                task.id
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            class={
                                                                status.id < 3 &&
                                                                new Date() <
                                                                    new Date(
                                                                        task.date_finish
                                                                    )
                                                                    ? "red task-card-header"
                                                                    : status.id ===
                                                                      3
                                                                    ? "green task-card-header"
                                                                    : "task-card-header"
                                                            }
                                                        >
                                                            {task.title}
                                                        </div>
                                                        <div class="task-card-body">
                                                            <p class="task-card-priority">
                                                                {
                                                                    task.priority_title
                                                                }
                                                            </p>
                                                            <p class="task-card-data-finish">
                                                                {format(
                                                                    new Date(
                                                                        task.data_finish
                                                                    ),
                                                                    "dd.MM.yyyy"
                                                                )}
                                                            </p>
                                                            <p class="task-card-employee">
                                                                {!userInfo.boss_status
                                                                    ? `${userInfo.surname} ${userInfo.name[0]}.${userInfo.patronymic[0]}.`
                                                                    : `${task.employee_surname} ${task.employee_name[0]}.${task.employee_patronymic[0]}.`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : null
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div class="group">
                                <div class="status-col">
                                    <p class="status-title">Без группировки</p>
                                </div>
                                {arrStatus.map((status, indexStatus) => (
                                    <div class="status">
                                        {tasks.length > 0
                                            ? tasks.map((task) =>
                                                  task.status_id ===
                                                  status.id ? (
                                                      <div
                                                          class="task-card"
                                                          onClick={() =>
                                                              toggelTaskModal(
                                                                  task.id
                                                              )
                                                          }
                                                      >
                                                          <div
                                                              class={
                                                                  status.id <
                                                                      3 &&
                                                                  new Date() <
                                                                      new Date(
                                                                          task.date_finish
                                                                      )
                                                                      ? "red task-card-header"
                                                                      : status.id ===
                                                                        3
                                                                      ? "green task-card-header"
                                                                      : "task-card-header"
                                                              }
                                                          >
                                                              {task.title}
                                                          </div>
                                                          <div class="task-card-body">
                                                              <p class="task-card-priority">
                                                                  {
                                                                      task.priority_title
                                                                  }
                                                              </p>
                                                              <p class="task-card-data-finish">
                                                                  {format(
                                                                      new Date(
                                                                          task.data_finish
                                                                      ),
                                                                      "dd.MM.yyyy"
                                                                  )}
                                                              </p>
                                                              <p class="task-card-employee">
                                                                  {!userInfo.boss_status
                                                                      ? `${userInfo.surname} ${userInfo.name[0]}.${userInfo.patronymic[0]}.`
                                                                      : `${task.employee_surname} ${task.employee_name[0]}.${task.employee_patronymic[0]}.`}
                                                              </p>
                                                          </div>
                                                      </div>
                                                  ) : null
                                              )
                                            : null}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={
                        modalActive ? "modal-wrapper active" : "modal-wrapper"
                    }
                >
                    <div class="panel modal">
                        <div class="modal-left-side">
                            <input
                                class="modal-header"
                                type="text"
                                placeholder="Заголовок"
                                value={modalTitle}
                                onChange={(e) => {
                                    setModalTitle(e.target.value);
                                }}
                                disabled={
                                    userInfo && userInfo.boss_status
                                        ? null
                                        : "disabled"
                                }
                            ></input>
                            <textarea
                                placeholder="Описание"
                                value={modalDescription}
                                onChange={(e) => {
                                    setModalDescription(e.target.value);
                                }}
                                disabled={
                                    userInfo && userInfo.boss_status
                                        ? null
                                        : "disabled"
                                }
                            ></textarea>

                            {modalMess ? <p class="mess">{modalMess}</p> : null}
                            {modalError ? (
                                <p class="error">{modalError}</p>
                            ) : null}
                        </div>
                        <div class="modal-right-side">
                            <div>
                                <label>Дата начала</label>
                                <br />
                                <input
                                    type="date"
                                    value={format(
                                        new Date(modalDataStart),
                                        "yyyy-MM-dd"
                                    )}
                                    onChange={(e) => {
                                        setModalDataStart(e.target.value);
                                    }}
                                    disabled={
                                        userInfo && userInfo.boss_status
                                            ? null
                                            : "disabled"
                                    }
                                ></input>
                            </div>
                            <div>
                                <label>Дата завершения</label>
                                <br />
                                <input
                                    type="date"
                                    min={format(
                                        new Date(modalDataStart),
                                        "yyyy-MM-dd"
                                    )}
                                    value={format(
                                        new Date(modalDataFinish),
                                        "yyyy-MM-dd"
                                    )}
                                    onChange={(e) => {
                                        setModalDataFinish(e.target.value);
                                    }}
                                    disabled={
                                        userInfo && userInfo.boss_status
                                            ? null
                                            : "disabled"
                                    }
                                />
                            </div>
                            <select
                                value={modalPriority}
                                onChange={(e) => {
                                    setModalPriority(e.target.value);
                                }}
                                disabled={
                                    userInfo && userInfo.boss_status
                                        ? null
                                        : "disabled"
                                }
                            >
                                <option value={null}>Приоритет</option>
                                {arrPriority.map((priority) => (
                                    <option value={priority.id}>
                                        {priority.title}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={modalStatus}
                                onChange={(e) => {
                                    setModalStatus(e.target.value);
                                }}
                            >
                                <option value={null}>Статус</option>
                                {arrStatus.map((status) => (
                                    <option value={status.id}>
                                        {status.title}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={modalEmployee}
                                onChange={(e) => {
                                    setModalEmployee(e.target.value);
                                }}
                                disabled={
                                    userInfo && userInfo.boss_status
                                        ? null
                                        : "disabled"
                                }
                            >
                                <option value={null}>Ответственный</option>
                                {arrEmployees.map((employee) => (
                                    <option value={employee.id}>
                                        {`${employee.surname} ${employee.name[0]}.${employee.patronymic[0]}.`}
                                    </option>
                                ))}
                            </select>

                            <div class="modal-buttons">
                                <button
                                    class="btn modal-save"
                                    onClick={() => {
                                        taskToDB();
                                    }}
                                >
                                    Сохранить
                                </button>
                                <button
                                    class="btn modal-close"
                                    onClick={() => toggelTaskModal()}
                                >
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Main;
