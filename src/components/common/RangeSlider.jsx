import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  InputGroup,
  InputNumber,
  RangeSlider as RangeSliderInput,
} from "rsuite";
import { debounce } from "lodash-es";

const getInitialValue = (defaultValues, min, max) => {
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

const DELAY_TIME = 500;
function RangeSlider({ name, min, max, defaultValues, onChange }) {
  const [value, setValue] = useState(() =>
    getInitialValue(defaultValues, min, max)
  );

  const delayEmit = useMemo(
    () =>
      debounce((values) => {
        emitChanges(values);
      }, DELAY_TIME),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
    delayEmit(values);
  };

  const handleChangeStartValue = (nextValue) => {
    const [, end] = value;
    if (nextValue > end) {
      return;
    }

    const newValues = [+nextValue, end];
    setValue(newValues);
    delayEmit(newValues);
  };

  const handleChangeEndValue = (nextValue) => {
    const [start] = value;
    if (start > nextValue) {
      return;
    }

    const newValues = [start, +nextValue];
    setValue(newValues);
    delayEmit(newValues);
  };

  return (
    <div className="range-slider-container">
      <RangeSliderInput
        progress
        value={value}
        onChange={handleChange}
        className="mt-2 mb-4 mx-1"
        min={min}
        max={max}
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
