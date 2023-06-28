import Train from "../train/Train";
import "./TrainDay.scss";

import { useState } from "react";

export default function TrainDay({
  train,
  onAddTrain,
  onDelete,
  onDeleteTrain,
  onUpdateTrain,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    onDelete(train.name);
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTrain = () => {
    if (inputValue === "") {
      setInputValue("А як же назва?");
    } else if (
      train.excersizes.filter((exc) => exc.name === inputValue).length === 0
    ) {
      train.excersizes.push({
        child: train.name,
        name: inputValue,
        sets: "0",
        reps: "0",
        weight: "0",
      });
      onAddTrain(train);
    }
  };

  return (
    <details>
      <summary className="train">
        <button onClick={handleDelete} className="train__delete">
          X
        </button>
        <h2 className="train__text">{train.name}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="lightgray" d="M24 12l-12-9v5h-12v8h12v5l12-9z" />
        </svg>
      </summary>
      <div className="trains">
        {train.excersizes?.map((ex, index) => (
          <Train
            key={index}
            child={ex.child}
            name={ex.name}
            sets={ex.sets}
            reps={ex.reps}
            weights={ex.weight}
            train={train}
            onUpdateTrain={onUpdateTrain}
            onDeleteTrain={onDeleteTrain}
          />
        ))}
        <div className="train__form">
          <input
            onChange={onInputChange}
            type="text"
            value={inputValue}
            placeholder="Назва вправи"
          />
          <button onClick={addTrain}>Додати нову вправу</button>
        </div>
      </div>
    </details>
  );
}
