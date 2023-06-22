import Train from "../train/Train";
import "./TrainDay.scss";

export default function TrainDay({ train }) {
  return (
    <details>
      <summary className="train">
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
            name={ex.name}
            sets={ex.sets}
            reps={ex.reps}
            weights={ex.weight}
            train={train}
          />
        ))}
        <button>Підлити масла в вогонь...</button>
      </div>
    </details>
  );
}
