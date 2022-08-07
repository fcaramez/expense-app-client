import React from "react";
import { CalendarIcon, PlusSquareIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import { Icon } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Bar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  background-color: #81e6d9;
  width: 100%;
  height: 10vh;
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 24px 24px 0px 0px;

  .icons {
    height: 30px;
    width: 30px;
  }
`;

function Appbar() {
  return (
    <Bar>
      <Link to={"/create-expense"}>
        <PlusSquareIcon className="icons" size="md" color={"black"} />
      </Link>
      <Link to={"/profile"}>
        <Icon as={CgProfile} className="icons" color={"black"} />
      </Link>
      <Link to={"/progress"}>
        <CalendarIcon size="md" className="icons" color={"black"} />
      </Link>
    </Bar>
  );
}

export default Appbar;
