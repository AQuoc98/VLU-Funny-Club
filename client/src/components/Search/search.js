import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./search.css";

import { AiFillCloseCircle } from "react-icons/ai";

class search extends Component {
  render() {
    return (
      <div className="flex-container">
        <InputGroup>
          <Input style={{ margin: "auto" }} placeholder="Tìm kiếm...">
          </Input>
          <InputGroupAddon addonType="append">
            <InputGroupText style={{ width: "8em", height: "2.4em" }}>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Câu lạc bộ
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Tất cả</DropdownItem>
                  <DropdownItem>Cấp khoa</DropdownItem>
                  <DropdownItem>Cấp trường</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </InputGroupText>
            <InputGroupText
              style={{ margin: "auto", width: "2.4em", height: "2.4em" }}
            >
              <img
                src="/images/search.png"
                alt="search"
                style={{ width: "1em", height: "1em" }}
              />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default search;
