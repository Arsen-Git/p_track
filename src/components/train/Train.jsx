import "./Train.scss";

import { useState } from "react";

export default function Train({
  child,
  name,
  sets = "0",
  reps = "0",
  weights = "0",
  onUpdateTrain,
  onDeleteTrain,
}) {
  const [set, setSets] = useState(sets);
  const [rep, setReps] = useState(reps);
  const [weight, setWeight] = useState(weights);

  const onHandleUpdate = (e) => {
    if (set !== sets || rep !== reps || weight !== weights) {
      e.target.textContent = "Вдало!";
      e.target.classList.add("animated-done");

      setTimeout(() => {
        e.target.textContent = "Update";
        e.target.classList.remove("animated-done");
      }, 700);

      onUpdateTrain({ child, name, reps: rep, sets: set, weight });
    } else {
      e.target.textContent = "Випадково?";
      e.target.classList.add("animated-reject");

      setTimeout(() => {
        e.target.textContent = "Update";
        e.target.classList.remove("animated-reject");
      }, 700);
    }
  };

  const onHandleDelete = () => {
    onDeleteTrain(name, child);
  };

  const onInputChange = (e) => {
    switch (e.target.getAttribute("id")) {
      case "set":
        setSets(e.target.value);
        break;
      case "rep":
        setReps(e.target.value);
        break;
      case "weight":
        setWeight(e.target.value);
        break;
      default:
        throw new Error("Error!");
    }
  };
  return (
    <div className="element">
      <button onClick={onHandleDelete} className="train__delete">
        X
      </button>
      <h2 className="element__title">{name}</h2>
      <div className="element__settings">
        <div className="setting">
          <input onChange={onInputChange} type="text" id="set" value={set} />
          <p>sets</p>
        </div>
        <div className="setting">
          <input onChange={onInputChange} type="text" id="rep" value={rep} />
          <p>reps</p>
        </div>
        <div className="setting">
          <input
            onChange={onInputChange}
            type="text"
            id="weight"
            value={weight}
          />
          <p>weight</p>
        </div>
      </div>
      <button className="element__update" onClick={onHandleUpdate}>
        Update
      </button>
    </div>
  );
}
