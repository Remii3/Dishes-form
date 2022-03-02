export const valueRequired = (value) =>
  value ? undefined : "This value must be provided";

export const timeRequired = (value) =>
  value === "00:00:00" || value === undefined
    ? "This value must be provided"
    : undefined;

export const selectRequired = (value) =>
  value === "initial" || value === undefined
    ? "This value must be provided"
    : undefined;

export const maxValue = (max) => (value) =>
  value && value > max ? `This value must be lower than ${max}` : undefined;

export const minValue = (min) => (value) =>
  value && value < min ? `This value must be higher than ${min}` : undefined;

export const onlyInteger = (value) =>
  value && (value.includes(",") || value.includes("."))
    ? "This must be an integer number"
    : undefined;
