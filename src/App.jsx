import { useState } from "react";
import { SubmissionError } from "redux-form";

import DishesForm from "./components/DishesForm";

import { fetchSendNewDish } from "./lib/fetchDishes";

function App() {
  const [fetchResponse, setFetchResponse] = useState({
    status: undefined,
    message: undefined,
  });

  const hideFetchResponseHandle = (elTouched) => {
    setFetchResponse(elTouched);
  };

  const orderDishesSubmitHandler = (values, dispatchFunc, props) => {
    let {
      name,
      type,
      preparation_time,
      no_of_slices,
      diameter,
      spiciness_scale,
      slices_of_bread,
    } = values;

    const formClear = () => {
      props.clearFields(false, false, ["name"]);
      props.clearFields(false, false, ["type"]);
      props.clearFields(false, false, ["preparation_time"]);
      props.clearFields(false, false, ["no_of_slices"]);
      props.clearFields(false, false, ["diameter"]);
      props.clearFields(false, false, ["spiciness_scale"]);
      props.clearFields(false, false, ["slices_of_bread"]);
    };

    if (no_of_slices) {
      no_of_slices = parseInt(no_of_slices);
    }

    if (diameter) {
      diameter = parseFloat(diameter);
    }

    if (spiciness_scale) {
      spiciness_scale = parseInt(spiciness_scale);
    }

    if (slices_of_bread) {
      slices_of_bread = parseInt(slices_of_bread);
    }

    return fetchSendNewDish({
      name,
      type,
      preparation_time,
      no_of_slices,
      diameter,
      spiciness_scale,
      slices_of_bread,
    }).then(({ response, data }) => {
      if (response.status !== 200 && data) {
        setFetchResponse({
          status: false,
          message: "Something went terribly wrong",
        });
        throw new SubmissionError(data);
      } else {
        setFetchResponse({
          status: true,
          message: "Everything sent successfully",
        });

        formClear();
      }
    });
  };

  const fetchData = { fetchResponse, hideFetchResponseHandle };

  return (
    <div>
      <DishesForm onSubmit={orderDishesSubmitHandler} fetchData={fetchData} />
    </div>
  );
}

export default App;
