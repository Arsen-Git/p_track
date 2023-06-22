import "./App.scss";

import { useState, useEffect } from "react";

import axios from "axios";
import TrainDay from "../trainDay/TrainDay";

function App() {
  const [userData, setUserData] = useState({});
  const [newDayName, setNewDayName] = useState("");

  const onLogout = () => {
    localStorage.removeItem("user");
    setUserData(null);
  };

  const onInputChange = (e) => {
    setNewDayName(e.target.value);
  };

  const onAddDay = (event) => {
    event.preventDefault();
    if (newDayName === "") {
      setNewDayName("Не може бути пустим!");
    } else {
      setUserData({
        name: userData.name,
        trains: [...userData.trains, { name: newDayName, excersizes: [] }],
      });
      axios.put(
        `https://6363becf37f2167d6f8223de.mockapi.io/data/${userData.id}`,
        {
          name: userData.name,
          trains: [...userData.trains, { name: newDayName, excersizes: [] }],
        }
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: userData.name,
          trains: [...userData.trains, { name: newDayName, excersizes: [] }],
        })
      );

      setNewDayName("");
    }
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <div className="wrapper">
      {userData ? (
        <>
          <header>
            <h2 className="logo">P-Track</h2>
            <p className="head-title">
              Прогресуй та розвивайся з P-Track це легко!
            </p>
            <div className="user">
              <h2 className="user__acc">{userData.name} /</h2>
              <svg
                onClick={onLogout}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                id="exit"
              >
                <path
                  fill="lightgray"
                  d="M6 2a4 4 0 0 0-4 4v3h2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3H2v3a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H6Z"
                ></path>
                <path
                  fill="lightgray"
                  d="M3 11a1 1 0 1 0 0 2h9.582l-2.535 2.536a1 1 0 0 0 1.414 1.414l4.196-4.196a.998.998 0 0 0 0-1.508L11.46 7.05a1 1 0 1 0-1.414 1.414L12.582 11H3Z"
                ></path>
              </svg>
            </div>
          </header>
          <main>
            <h1 className="main-title">Що потренуємо сьогодні?</h1>
            <div className="train__container">
              {userData.trains?.map((train, index) => (
                <TrainDay key={index} train={train} />
              ))}
              <form className="train__form">
                <input
                  onChange={onInputChange}
                  type="text"
                  value={newDayName}
                  placeholder="Назва тренінгу"
                />
                <button onClick={onAddDay} type="submit">
                  Додати новий день
                </button>
              </form>
            </div>
          </main>
        </>
      ) : (
        <LoginModal onLogin={setUserData} />
      )}
    </div>
  );
}

function LoginModal({ onLogin }) {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onLoginClick = () => {
    axios
      .get("https://6363becf37f2167d6f8223de.mockapi.io/data")
      .then((data) => {
        const filteredData = data.data.filter(
          (user) => user.name === inputValue
        );
        const user = filteredData.length > 0 ? filteredData[0] : null;
        if (user) {
          onLogin(user);
          localStorage.setItem("user", JSON.stringify(user));
        }
      });
  };

  return (
    <div className="login__container">
      <div className="login__content">
        <h2 className="login__title">Введіть ваш логін:</h2>
        <input onChange={onInputChange} type="text" value={inputValue} />
        <button onClick={onLoginClick}>Увійти</button>
      </div>
    </div>
  );
}

export default App;
