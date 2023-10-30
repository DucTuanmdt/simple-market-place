import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  InputGroup,
  InputNumber,
  RangeSlider as RangeSliderInput,
} from "rsuite";

const getInitialValue = (name, min, max, defaultValues) => {
  let minValue = min;
  let maxValue = max;

  if (defaultValues instanceof Array) {
    const [defaultMin, defaultMax] = defaultValues;

    if (defaultMin >= min && defaultMin <= max && defaultMin <= defaultMax) {
      minValue = defaultMin;
    }
    if (defaultMax >= min && defaultMax <= max && defaultMax <= defaultMin) {
      maxValue = defaultMax;
    }
  }

  return [minValue, maxValue];
};

function RangeSlider({ name, min, max, defaultValues, onChange }) {
  const [value, setValue] = useState(() =>
    getInitialValue(defaultValues, min, max)
  );

  const emitChanges = (values) => {
    onChange({
      name,
      value: {
        min: values[0],
        max: values[1],
      },
    });
  };

  const handleChange = (values) => {
    setValue(values);
    emitChanges(values);
  };

  const handleChangeStartValue = (nextValue) => {
    const [, end] = value;
    if (nextValue > end) {
      return;
    }

    const newValues = [+nextValue, end];
    setValue(newValues);
    emitChanges(newValues);
  };

  const handleChangeEndValue = (nextValue) => {
    const [start] = value;
    if (start > nextValue) {
      return;
    }

    const newValues = [start, +nextValue];
    setValue(newValues);
    emitChanges(newValues);
  };

  return (
    <div className="range-slider-container">
      <RangeSliderInput
        progress
        value={value}
        onChange={handleChange}
        className="mt-2 mb-4 mx-1"
      />
      <InputGroup>
        <InputNumber
          min={min}
          max={max}
          value={value[0]}
          onChange={handleChangeStartValue}
        />
        <InputGroup.Addon>to</InputGroup.Addon>
        <InputNumber
          min={min}
          max={max}
          value={value[1]}
          onChange={handleChangeEndValue}
        />
      </InputGroup>
    </div>
  );
}

RangeSlider.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValues: PropTypes.array,
  onChange: PropTypes.func,
};

RangeSlider.defaultProps = {
  min: 0,
  max: 100,
  defaultValues: [0, 100],
  onChange: () => {},
};

export default RangeSlider;
