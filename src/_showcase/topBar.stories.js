import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";

import { Mapper } from "../components";
import { useToggler } from "../hooks";
import { providerDecorator } from "../_storybook";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
`;

const Logo = styled.h1`
  font-size: ${({ big }) => (big ? "20px" : "14px")};
  margin: 0;
  padding: 0;
`;

const MenuWrapper = styled.ul`
  display: flex;
  list-style: none;
`;

const MenuItem = styled.li`
  margin: 0;
  padding: 0;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

const TopBarDefault = () => (
  <Wrapper>
    <Logo>ReactPonsive</Logo> <span>☰</span>
  </Wrapper>
);

const TopBarDesktop = () => (
  <Wrapper>
    <Logo big>ReactPonsive</Logo>
    <MenuWrapper>
      <MenuItem>About</MenuItem>
      <MenuItem>Private area</MenuItem>
      <MenuItem>Contact</MenuItem>
    </MenuWrapper>
  </Wrapper>
);

storiesOf("Showcase", module)
  .addDecorator(providerDecorator())
  .add("TopBar", () => {
    const mqs = {
      default: <TopBarDefault />,
      "(min-width: 1024px)": <TopBarDesktop />
    };
    return <Mapper mqs={mqs} />;
  })
  .add("TopBar (simplified)", () => {
    const TopBarSimplified = () => {
      const isDesktop = useToggler("(min-width: 1024px)");
      return isDesktop ? <TopBarDesktop /> : <TopBarDefault />;
    };
    return <TopBarSimplified />;
  });
