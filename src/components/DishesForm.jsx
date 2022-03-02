import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";

import {
  maxValue,
  minValue,
  onlyInteger,
  selectRequired,
  timeRequired,
  valueRequired,
} from "../helpers/redux-formValidators";

const minValue0 = minValue(0);
const minValue01 = minValue(0.1);
const minValue1 = minValue(1);
const maxValue10 = maxValue(10);

const theme = createTheme();

const dishTypeClear = ({ clearFields }) => {
  clearFields(false, false, ["no_of_slices"]);
  clearFields(false, false, ["diameter"]);
  clearFields(false, false, ["spiciness_scale"]);
  clearFields(false, false, ["slices_of_bread"]);
};

const renderField = ({
  input,
  label,
  type,
  step,
  min,
  max,
  placeholder,
  meta: { touched, error },
  elValue,
  hideFetchResponse,
}) => (
  <div>
    <label>{label}</label>
    <div>
      <TextField
        {...input}
        inputProps={{
          step: step ? step : "1",
          min,
          max,
        }}
        type={type}
        placeholder={placeholder}
        fullWidth
        margin="normal"
        value={elValue ? elValue : ""}
        error={touched && error !== undefined}
        onClick={() => {
          if (hideFetchResponse.fetchResponse.status !== undefined) {
            hideFetchResponse.hideFetchResponseHandle(false);
          }
        }}
      />
      {touched && error && (
        <Typography component="span" sx={{ color: "#ff4447" }}>
          {error}
        </Typography>
      )}
    </div>
  </div>
);

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  elValue,
  hideFetchResponse,
  children,
  ...custom
}) => (
  <div>
    <label>{label}</label>
    <div>
      <Select
        {...input}
        {...custom}
        value={elValue}
        fullWidth
        error={touched && error !== undefined}
        sx={{ mb: "8px", mt: "16px" }}
      >
        {children}
      </Select>
      {touched && error && (
        <Typography component="span" sx={{ color: "#ff4447" }}>
          {error}
        </Typography>
      )}
    </div>
  </div>
);

let DishesForm = (props) => {
  const {
    nameValue,
    preparationTimeValue,
    dishTypeValue,
    noOfSlicesValue,
    diameterValue,
    spicinessScaleValue,
    slicesOfBreadValue,
    handleSubmit,
    fetchData,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              borderBottom: "1px solid rgb(133, 133, 133)",
              width: "75%",
              textAlign: "center",
              paddingBottom: 1,
            }}
          >
            Add new dish
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "350px" }}
          >
            <Field
              name="name"
              component={renderField}
              type="text"
              label="Dish name"
              validate={valueRequired}
              placeholder="Dish name"
              elValue={nameValue}
              hideFetchResponse={fetchData}
            />

            <Field
              name="preparation_time"
              component={renderField}
              type="time"
              step="2"
              label="Preparation time"
              validate={timeRequired}
              elValue={preparationTimeValue ? preparationTimeValue : "00:00:00"}
              hideFetchResponse={fetchData}
            />

            <Field
              name="type"
              component={renderSelectField}
              label="Dish type"
              validate={selectRequired}
              onChange={() => dishTypeClear(props)}
              elValue={dishTypeValue ? dishTypeValue : "initial"}
              hideFetchResponse={fetchData}
            >
              <MenuItem value="initial" sx={{ display: "none" }}>
                Select the type
              </MenuItem>
              <MenuItem value="pizza">Pizza</MenuItem>
              <MenuItem value="soup">Soup</MenuItem>
              <MenuItem value="sandwich">Sandwich</MenuItem>
            </Field>

            {dishTypeValue === "pizza" && (
              <div>
                <Field
                  name="no_of_slices"
                  component={renderField}
                  type="number"
                  label="Number of slices"
                  validate={[onlyInteger, minValue1, valueRequired]}
                  placeholder="1"
                  min="1"
                  elValue={noOfSlicesValue}
                  hideFetchResponse={fetchData}
                />
                <Field
                  name="diameter"
                  component={renderField}
                  type="number"
                  step={"0.1"}
                  label="Diameter"
                  validate={[minValue01, valueRequired]}
                  placeholder="0,1"
                  min="0.1"
                  elValue={diameterValue}
                  hideFetchResponse={fetchData}
                />
              </div>
            )}

            {dishTypeValue === "soup" && (
              <div>
                <Field
                  name="spiciness_scale"
                  component={renderField}
                  type="number"
                  label="Spiciness"
                  validate={[minValue1, maxValue10, onlyInteger, valueRequired]}
                  placeholder="1"
                  min="1"
                  max="10"
                  elValue={spicinessScaleValue}
                  hideFetchResponse={fetchData}
                />
              </div>
            )}

            {dishTypeValue === "sandwich" && (
              <div>
                <Field
                  name="slices_of_bread"
                  component={renderField}
                  type="number"
                  label="Number of bread slices"
                  validate={[onlyInteger, valueRequired, minValue0]}
                  placeholder="0"
                  min="0"
                  elValue={slicesOfBreadValue}
                  hideFetchResponse={fetchData}
                />
              </div>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 3 }}
            >
              Add
            </Button>

            {fetchData.fetchResponse.status !== undefined && (
              <Typography
                component={"p"}
                sx={{
                  textAlign: "center",
                  color: fetchData.fetchResponse.status ? "#228b22" : "#ff4447",
                }}
              >
                {fetchData.fetchResponse.message}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

DishesForm = reduxForm({
  form: "dishes",
})(DishesForm);

const selector = formValueSelector("dishes");

DishesForm = connect((state) => {
  const nameValue = selector(state, "name");
  const preparationTimeValue = selector(state, "preparation_time");
  const dishTypeValue = selector(state, "type");

  const noOfSlicesValue = selector(state, "no_of_slices");
  const diameterValue = selector(state, "diameter");

  const spicinessScaleValue = selector(state, "spiciness_scale");

  const slicesOfBreadValue = selector(state, "slices_of_bread");

  return {
    nameValue,
    preparationTimeValue,
    dishTypeValue,
    noOfSlicesValue,
    diameterValue,
    spicinessScaleValue,
    slicesOfBreadValue,
  };
})(DishesForm);

export default DishesForm;
