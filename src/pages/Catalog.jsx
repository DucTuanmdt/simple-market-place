import React, { useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  IconButton,
  Input,
  InputGroup,
  Row,
  Sidenav,
} from "rsuite";
import { MdOutlineFilterAlt } from "react-icons/md";
import SearchIcon from "@rsuite/icons/Search";

import drones from "../mock/drones";
import ProductCard from "../components/ProductCard";
import FilterContainer, { filterData } from "../components/FilterContainer";
import useToggle from "../hooks/useToggle";

const catalogList = ["All Brand", "MIG Turbo", "Mini Drone", "Dji Drone"];
function Catalog() {
  const [catalog, setCatalog] = useState(catalogList[0]);
  const [droneList, setDroneList] = useState(drones);
  const [sortBy, setSortBy] = useState(filterData.sortBy.items[0]);

  const [showFilterDrawer, toggleFilterDrawer] = useToggle(false);

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
                <Input placeholder="Search..." />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-3">
              <span className="fw-500">10 products</span>
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
                      key={item.value}
                      onClick={() => setSortBy(item)}
                    >
                      {item.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>

            <div className="card-list-container">
              {droneList.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>

            <div className="d-flex justify-content-center mt-5 mb-2">
              <Button appearance="primary">View more</Button>
            </div>
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
