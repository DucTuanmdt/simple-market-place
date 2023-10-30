import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "rsuite";
import clsx from "clsx";

const getActiveItem = (items, activeItem) => {
  if (activeItem?.label) {
    return activeItem.value;
  }

  if (items?.length > 0) {
    return items[0]?.value;
  }

  return null;
};

function ButtonSelectGroup({ name, items, activeItem, onChange, className }) {
  const [selectedValue, setSelectedValue] = useState(() =>
    getActiveItem(items, activeItem)
  );

  const handleSelectItem = (index) => {
    const item = items[index];
    setSelectedValue(item.value);
    onChange({ name, value: item.value, advanceValues: item.advanceValues });
  };

  return (
    items?.length > 0 && (
      <div className={clsx("button-select-group-container", className)}>
        {items.map(({ label, value }, index) => (
          <Button
            key={value}
            onClick={() => handleSelectItem(index)}
            appearance={selectedValue === value ? "primary" : "default"}
            className="w-100"
          >
            {label}
          </Button>
        ))}
      </div>
    )
  );
}

const itemType = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

ButtonSelectGroup.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
  activeItem: itemType,
  onSelect: PropTypes.func,
};

ButtonSelectGroup.defaultProps = {
  items: null,
  onSelect: () => {},
};

export default ButtonSelectGroup;
