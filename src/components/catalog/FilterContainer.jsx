import React from "react";
import { IconButton, Panel, PanelGroup } from "rsuite";
import ButtonSelectGroup from "../common/ButtonSelectGroup";
import RangeSlider from "../common/RangeSlider";
import clsx from "clsx";
import SearchIcon from "@rsuite/icons/Search";
import CloseIcon from "@rsuite/icons/Close";
import filterSchema from "../../schema/filterSchema";
import { useDispatch } from "react-redux";
import {
  selectFilter,
  selectFilters,
  setSelectedFilters,
} from "../../redux/catalog/catalogSlice";

function renderPanelTitle(text) {
  return <span className="fw-500">{text}</span>;
}

const filter = { ...filterSchema };

function FilterContainer({ className, onClose = () => {} }) {
  const dispatch = useDispatch();

  const handleChangeFilter = ({ value, name, advanceValues }) => {
    if (advanceValues?.length > 0) {
      dispatch(selectFilters(advanceValues));
    } else {
      dispatch(
        selectFilter({
          name,
          value,
        })
      );
    }
  };

  const handleChangePriceFilter = (filter) => {
    if (filter.name) {
      const advanceValues = [
        { name: `${filter.name}_gte`, value: filter.value.min },
        { name: `${filter.name}_lte`, value: filter.value.max },
      ];

      handleChangeFilter({ advanceValues });
    }
  };

  const clearFilters = () => {
    dispatch(setSelectedFilters({}));
  };

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
            onChange={handleChangePriceFilter}
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
          <IconButton icon={<CloseIcon />} onClick={clearFilters}>
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
