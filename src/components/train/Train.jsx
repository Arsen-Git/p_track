import "./Train.scss";

import { useState } from "react";

export default function Train({ name, sets = "0", reps = "0", weights = "0" }) {
  const [set, setSets] = useState(sets);
  const [rep, setReps] = useState(reps);
  const [weight, setWeight] = useState(weights);

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
      <button>Update</button>
    </div>
  );
}
