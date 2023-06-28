import "./App.scss";

import { useState, useEffect } from "react";

import TrainDay from "../trainDay/TrainDay";

import { Api } from "../../utils/api";
import Timer from "../timer/Timer";

function App() {
  const [userData, setUserData] = useState({});
  const [newDayName, setNewDayName] = useState("");

  const { getData, putData } = Api();

  const onLogout = () => {
    localStorage.removeItem("user");
    setUserData(null);
  };

  const onDeleteDay = (dayName) => {
    const newArray = userData.trains.filter((day) => day.name !== dayName);
    putTrainsData(newArray);
  };

  const onDeleteTrain = (trainName, trainChild) => {
    const newDays = userData.trains.map((day) => {
      if (day.name === trainChild) {
        const newTrains = day.excersizes.filter(
          (exc) => exc.name !== trainName
        );
        return { name: day.name, excersizes: newTrains };
      }
      return day;
    });
    putTrainsData(newDays);
  };

  const onUpdateTrain = (exc) => {
    const newTrains = userData.trains.map((day) => {
      if (day.name === exc.child) {
        const newExcersizes = day.excersizes.map((e) => {
          if (e.name === exc.name) {
            return exc;
          }
          return e;
        });
        return { name: day.name, excersizes: newExcersizes };
      }
      return day;
    });
    putTrainsData(newTrains);
  };

  const putTrainsData = (data) => {
    const newObj = {
      id: userData.id,
      name: userData.name,
      trains: data,
    };
    setUserData(newObj);
    putData(userData.id, newObj);
  };

  const fetchingData = async (name) => {
    const response = await getData(name);
    dataFetched(response[0]);
  };

  const dataFetched = (data) => {
    setUserData(data);
  };

  const onInputChange = (e) => {
    setNewDayName(e.target.value);
  };

  const onAddDay = (event) => {
    event.preventDefault();
    if (newDayName === "") {
      setNewDayName("Не може бути пустим!");
    } else if (
      userData.trains.filter((day) => day.name === newDayName).length === 0
    ) {
      setUserData({
        id: userData.id,
        name: userData.name,
        trains: [
          ...userData.trains,
          { child: newDayName, name: newDayName, excersizes: [] },
        ],
      });

      putData(userData.id, {
        id: userData.id,
        name: userData.name,
        trains: [
          ...userData.trains,
          { child: newDayName, name: newDayName, excersizes: [] },
        ],
      });

      setNewDayName("");
    } else {
      setNewDayName("Вже є!");
    }
  };

  const onAddTrain = (day) => {
    const newDays = userData.trains.map((d) => {
      if (d.name === day.name) {
        return day;
      }
      return d;
    });
    putTrainsData(newDays);
  };

  useEffect(() => {
    fetchingData(JSON.parse(localStorage.getItem("user")));
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
                <TrainDay
                  key={index}
                  train={train}
                  onAddTrain={onAddTrain}
                  onDelete={onDeleteDay}
                  onUpdateTrain={onUpdateTrain}
                  onDeleteTrain={onDeleteTrain}
                />
              ))}
              <div className="train__form">
                <input
                  onChange={onInputChange}
                  type="text"
                  value={newDayName}
                  placeholder="Назва тренінгу"
                />
                <button onClick={onAddDay}>Додати новий день</button>
              </div>
            </div>
          </main>
          <Timer />
        </>
      ) : (
        <LoginModal onLogin={setUserData} />
      )}
    </div>
  );
}

const LoginModal = ({ onLogin }) => {
  const [inputValue, setInputValue] = useState("");

  const { getData } = Api();

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onLoginClick = async (e) => {
    const response = await getData(inputValue);
    if (response.length > 0) {
      onLogin(response[0]);
      localStorage.setItem("user", JSON.stringify(response[0].name));
    } else {
      e.target.textContent = "Спробувати ще раз?";
    }
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
};

export default App;
