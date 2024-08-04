import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as LeaguePageModule from "pages/league-page/LeaguePage";
import React from "react";

describe("test LeaguePage component", () => {
  beforeEach(() => {
    const setState = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce((initState) => [[], setState]);
  });

  test("Should render remaining time message for same day", () => {
    const currentTime = new Date("2024-08-04T01:15:00");

    jest
      .spyOn(LeaguePageModule, "getCurrentDate")
      .mockImplementation(() => currentTime);

    render(<LeaguePageModule.LeaguePage currentTime={currentTime} />);

    const remainingTimeMessage = screen.getByTestId("remaining-time-message");
    expect(remainingTimeMessage).toBeInTheDocument();
    expect(remainingTimeMessage).toHaveTextContent(
      "Next automatic round in 1 hours and 45 minutes."
    );
  });

  test("Should render remaining time message for next day", () => {
    const currentTime = new Date("2024-08-04T12:15:00");

    jest
      .spyOn(LeaguePageModule, "getCurrentDate")
      .mockImplementation(() => currentTime);

    render(<LeaguePageModule.LeaguePage currentTime={currentTime} />);

    const remainingTimeMessage = screen.getByTestId("remaining-time-message");
    expect(remainingTimeMessage).toBeInTheDocument();
    expect(remainingTimeMessage).toHaveTextContent(
      "Next automatic round in 14 hours and 45 minutes."
    );
  });
});
