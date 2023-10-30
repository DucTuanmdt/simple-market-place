import React, { useState } from "react";
import { Button, IconButton, Panel, PanelGroup } from "rsuite";
import ButtonSelectGroup from "./common/ButtonSelectGroup";
import RangeSlider from "./common/RangeSlider";
import clsx from "clsx";
import SearchIcon from "@rsuite/icons/Search";
import CloseIcon from "@rsuite/icons/Close";

function renderPanelTitle(text) {
  return <span className="fw-500">{text}</span>;
}

export const filterData = {
  category: {
    filterName: "category",
    items: [
      {
        label: "Beginer Drone",
        value: "beginer_drone",
      },
      {
        label: "Best Seller",
        value: "best_seller",
      },
      {
        label: "Long Range",
        value: "long_range",
      },
      {
        label: "Mini Drone",
        value: "mini_drone",
      },
    ],
  },
  rating: {
    filterName: "rating",
    items: [
      {
        label: "1",
        value: 1,
      },
      {
        label: "2",
        value: 2,
      },
      {
        label: "3",
        value: 3,
      },
      {
        label: "4",
        value: 4,
      },
      {
        label: "5",
        value: 5,
      },
    ],
  },
  cameraResolution: {
    filterName: "cameraResolution",
    items: [
      {
        label: "720p",
        value: "720p",
      },
      {
        label: "1080p",
        value: "1080p",
      },
      {
        label: "2K",
        value: "2K",
      },
      {
        label: "4K",
        value: "4K",
      },
    ],
  },
  advancedFeatures: {
    filterName: "advancedFeatures",
    items: [
      {
        label: "GPS",
        value: "gps",
      },
      {
        label: "Foldable",
        value: "foldable",
      },

      {
        label: "Sensors",
        value: "sensors",
      },
    ],
  },
  price: {
    filterName: "price",
    rule: {
      min: 0,
      max: 5000,
    },
  },
  sortBy: {
    filterName: "sortBy",
    items: [
      {
        label: "Most popular",
        value: "gps",
      },
      {
        label: "Lowest price",
        value: "foldable",
      },

      {
        label: "Highest price",
        value: "sensors",
      },
      {
        label: "Light weight",
        value: "sensors",
      },
    ],
  },
};

function FilterContainer({ className, onClose = () => {} }) {
  const [filter, setFilter] = useState(filterData);

  const handleChangeFilter = ({ value, name }) => {
    console.log("🚀 DX ~ value:", value, name);
  };

  const handleClearFilter = () => {};

  return (
    <div className={clsx("filter-container shadow-sm", className)}>
      <h4 className="filter-title">Filter Products</h4>
      <PanelGroup accordion>
        <Panel header={renderPanelTitle("Category")} defaultExpanded>
          <ButtonSelectGroup
            items={filter.category.items}
            onChange={handleChangeFilter}
            name={filter.category.filterName}
            className="two-col"
          />
        </Panel>
        <Panel header={renderPanelTitle("Price")} defaultExpanded>
          <RangeSlider
            name={filter.price.filterName}
            min={filter.price.rule.min}
            max={filter.price.rule.max}
            onChange={handleChangeFilter}
          />
        </Panel>
        <Panel header={renderPanelTitle("Rating Count")} defaultExpanded>
          <ButtonSelectGroup
            items={filter.rating.items}
            onChange={handleChangeFilter}
            name={filter.rating.filterName}
          />
        </Panel>
        <Panel header={renderPanelTitle("Camera resolution")} defaultExpanded>
          <ButtonSelectGroup
            items={filter.cameraResolution.items}
            onChange={handleChangeFilter}
            name={filter.cameraResolution.filterName}
            className="two-col"
          />
        </Panel>
        <Panel header={renderPanelTitle("Advanced features")} defaultExpanded>
          <ButtonSelectGroup
            items={filter.advancedFeatures.items}
            onChange={handleChangeFilter}
            name={filter.advancedFeatures.filterName}
          />
        </Panel>
      </PanelGroup>
      <Panel>
        <div className="d-flex justify-content-between">
          <IconButton icon={<CloseIcon />} onClick={handleClearFilter}>
            Clear
          </IconButton>
          <IconButton
            className="d-block d-lg-none"
            icon={<SearchIcon />}
            onClick={onClose}
          >
            Search
          </IconButton>
        </div>
      </Panel>
    </div>
  );
}

export default FilterContainer;
