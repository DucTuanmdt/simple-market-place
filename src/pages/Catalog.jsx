import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  IconButton,
  Input,
  InputGroup,
  Loader,
  Message,
  Placeholder,
  Row,
  Sidenav,
} from "rsuite";
import { debounce } from "lodash-es";

import { MdOutlineFilterAlt } from "react-icons/md";
import SearchIcon from "@rsuite/icons/Search";

import ProductCard from "../components/ProductCard";
import FilterContainer from "../components/FilterContainer";
import useToggle from "../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import filterSchema from "../schema/filterSchema";
import { loadMoreCatalog, searchCatalog } from "../redux/catalog/catalogThunk";
import {
  resetCatalog,
  selectFilter,
  selectFilters,
} from "../redux/catalog/catalogSlice";
import useMessage from "../hooks/useMessage";

const SEARCH_DELAY_TIME = 400;

const filterData = { ...filterSchema };

function Catalog() {
  const {
    catalogList: droneList,
    selectedFilters,
    error,
    isLoading,
    isLoadMore,
    hasMoreResult,
  } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const [sortBy, setSortBy] = useState(filterData.sortBy.items[0]);

  const [showFilterDrawer, toggleFilterDrawer] = useToggle(false);

  const { showToast } = useMessage();
  const delaySearchByKeyword = useMemo(
    () =>
      debounce((value) => {
        dispatch(
          selectFilter({
            name: "keyword",
            value: value,
          })
        );
      }, SEARCH_DELAY_TIME),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleInputSearchChange = (value) => {
    setKeyword(value);
    delaySearchByKeyword(value);
  };

  const handleChangeSort = (item) => {
    setSortBy(item);
    const filters = [
      {
        name: "sortBy",
        value: item.value,
      },
    ];

    if (item.order) {
      filters.push({
        name: "order",
        value: item.order,
      });
    }

    dispatch(selectFilters(filters));
  };

  const handleViewMore = () => {
    dispatch(loadMoreCatalog());
  };

  useEffect(() => {
    if (error) {
      showToast(error, { type: "error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    dispatch(searchCatalog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  useEffect(() => {
    // refresh page after every 60s
    const intervalId = setInterval(() => {
      // show notification
      showToast("Refresh data!!!");

      // set selected filters to be empty
      dispatch(resetCatalog());
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMobileDrawer = () => {
    return (
      <Drawer
        open={showFilterDrawer}
        onClose={toggleFilterDrawer}
        size="full"
        placement="left"
        className="filter-drawer-container"
        backdropClassName="navigation-drawer-backdrop"
      >
        <Drawer.Body className="bg-light">
          <div>
            <Sidenav>
              <Sidenav.Body>
                <FilterContainer
                  className="bg-white"
                  onClose={toggleFilterDrawer}
                />
              </Sidenav.Body>
            </Sidenav>
          </div>
        </Drawer.Body>
      </Drawer>
    );
  };

  const renderResults = () => {
    // loading
    if (isLoading) {
      return (
        <div className="my-4">
          <Placeholder.Paragraph rows={8} />
          <Loader content="loading..." vertical />
        </div>
      );
    }

    // no result
    if (droneList.length < 1) {
      return (
        <Message
          showIcon
          type="info"
          header="No Results Found"
          className="mt-4 mb-2"
        >
          Sorry, no results match your selected search/filter criteria. Please
          try again with different criteria.
        </Message>
      );
    }

    return (
      <>
        <div className="card-list-container">
          {droneList.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
        {hasMoreResult && (
          <div className="d-flex justify-content-center mt-5 mb-2">
            <Button
              appearance="primary"
              disabled={isLoadMore}
              loading={isLoadMore}
              onClick={handleViewMore}
            >
              View more
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="catalog-container container my-4">
      <Row>
        <Col xs={24} lg={16} xl={18}>
          <div className="rounded-2 p-3 shadow-sm">
            <div className="catalog-header py-2">
              <div className="result-title">
                <h2>Catalog Drones</h2>
                <p>These products have been approved by our best experts</p>
              </div>

              <InputGroup className="search-box">
                <Input
                  placeholder="Search..."
                  value={keyword}
                  onChange={handleInputSearchChange}
                />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-3">
              <span className="fw-500">
                {isLoading ? "..." : `${droneList.length} results`}
              </span>
              <div>
                <IconButton
                  size="sm"
                  appearance="primary"
                  icon={<MdOutlineFilterAlt />}
                  className="me-2 d-inline-flex d-lg-none"
                  onClick={toggleFilterDrawer}
                />
                <Dropdown
                  size="sm"
                  title={
                    <span>
                      <small className="me-2">Sort by:</small>
                      <small className="fw-500">{sortBy.label}</small>
                    </span>
                  }
                >
                  {filterData.sortBy.items.map((item) => (
                    <Dropdown.Item
                      key={item.label}
                      onClick={() => handleChangeSort(item)}
                    >
                      {item.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>

            {renderResults()}
          </div>
        </Col>
        <Col xs={24} lg={8} xl={6} className="d-none d-lg-block">
          <FilterContainer />
        </Col>
      </Row>
      {renderMobileDrawer()}
    </div>
  );
}

export default Catalog;
