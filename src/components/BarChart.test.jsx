import React from "react";
import { render, screen } from "@testing-library/react";
import BarChart from "./BarChart";
import '@testing-library/jest-dom';


jest.mock("react-chartjs-2", () => ({
    Bar: () => <div>Bar chart mock</div>,
}));

const mockData = {
    data: {
        7.375: 7,
        "7.250": 2,
        6.875: 5,
        7.125: 10,
        7.625: 2,
        "7.000": 5,
        "6.500": 1,
        "7.500": 4,
        "6.250": 3,
        6.625: 1,
        8.625: 1,
        8.125: 6,
        "7.750": 1,
        5.875: 9,
        "6.990": 1,
        6.375: 2,
        7.875: 1,
        "5.750": 5,
        "7.490": 2,
        7.175: 1,
        "5.500": 2,
        5.625: 5,
        "6.000": 2,
        "6.700": 5,
        "6.750": 5,
    },
};

test("renders BarChart with provided data", () => {
    render(<BarChart data={mockData} />);
    expect(screen.getByText(/Bar chart mock/i)).toBeInTheDocument();
});

test("renders message when no data is provided", () => {
    render(<BarChart data={{}} />);
    expect(
        screen.getByText(/No data available to display./i)
    ).toBeInTheDocument();
});
