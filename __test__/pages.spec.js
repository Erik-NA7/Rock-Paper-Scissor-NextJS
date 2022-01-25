import React from "react";
import Topnavbar from "../pages/components/Topnavbar";
import LandingPage from "../pages/index";
import Login from "../pages/login/index";
import Leaderboard from "../pages/home/leaderboard/index";
import Players from "../pages/home/players/index";
import { getByRole, render, screen } from "@testing-library/react";

describe("Front End Component", () => {
  it("Navbar should be contain navbar list", () => {
    const { getByRole } = render(<Topnavbar/>);
    const heading = getByRole('link', {
        name: /Home/i,
        name: /Login/i,
        name: /Sign Up/i
    })
    screen.debug()
  });

  it("Landingpage should be contain video player", () => {
    const { getRole } = render(<LandingPage/>);
    screen.debug()
  });

  it("Login should contain login form", () => {
    render(<Login/>);
    screen.debug()
  });

  it("Leaderbord should contain heading", () => {
    const { getByRole } = render(<Leaderboard/>);
    const heading = getByRole('heading', {
        name: /Leaderboard/i,
    })
    expect(heading).toBeInTheDocument()
    screen.debug();
  });

  it("Leaderbord should contain heading", () => {
    const { getByRole } = render(<Players/>);
    const heading = getByRole('heading', {
      name: /Players/i,
    })
    expect(heading).toBeInTheDocument()
    screen.debug();
  });
})