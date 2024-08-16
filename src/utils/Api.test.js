import { Api } from "./Api";

describe("Api function", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should make a fetch call with the correct URL and return the correct data", async () => {
        const housePrice = 500000;
        const loanAmt = 400000;
        const creditScore = 720;
        const stateCode = "CA";
        const rateTypeCode = "fixed";
        const loanTerm = 30;
        const loanTypeCode = "conf";
        const armType = "5-1";

        // Mock fetch to resolve with the exact data provided
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                data: {
                    "7.375": 7,
                    "7.250": 2,
                    "6.875": 5,
                    "7.125": 10,
                    "7.625": 2,
                    "7.000": 5,
                    "6.500": 1,
                    "7.500": 4,
                    "6.250": 3,
                    "6.625": 1,
                    "8.625": 1,
                    "8.125": 6,
                    "7.750": 1,
                    "5.875": 9,
                    "6.990": 1,
                    "6.375": 2,
                    "7.875": 1,
                    "5.750": 5,
                    "7.490": 2,
                    "7.175": 1,
                    "5.500": 2,
                    "5.625": 5,
                    "6.000": 2,
                    "6.700": 5,
                    "6.750": 5,
                },
            }),
        });

        // Act: Call the function
        const response = await Api(
            housePrice,
            loanAmt,
            creditScore,
            stateCode,
            rateTypeCode,
            loanTerm,
            loanTypeCode,
            armType
        );

        // Assert: Verify the fetch call
        expect(global.fetch).toHaveBeenCalledWith(
            `/api/proxy?price=${housePrice}&loan_amount=${loanAmt}&minfico=${creditScore}&maxfico=${
                creditScore + 19
            }&state=${stateCode}&rate_structure=${rateTypeCode}&loan_term=${loanTerm}&loan_type=${loanTypeCode}&arm_type=${armType}`
        );

        // Assert: Verify the response data
        expect(response).toEqual({
            data: {
                "7.375": 7,
                "7.250": 2,
                "6.875": 5,
                "7.125": 10,
                "7.625": 2,
                "7.000": 5,
                "6.500": 1,
                "7.500": 4,
                "6.250": 3,
                "6.625": 1,
                "8.625": 1,
                "8.125": 6,
                "7.750": 1,
                "5.875": 9,
                "6.990": 1,
                "6.375": 2,
                "7.875": 1,
                "5.750": 5,
                "7.490": 2,
                "7.175": 1,
                "5.500": 2,
                "5.625": 5,
                "6.000": 2,
                "6.700": 5,
                "6.750": 5,
            },
        });
    });

    it("should handle errors gracefully and return null", async () => {
        // Mock fetch to reject (simulate a network error)
        global.fetch.mockRejectedValue(new Error("Network Error"));

        const response = await Api(
            500000,
            400000,
            720,
            "CA",
            "fixed",
            30,
            "conf"
        );

        expect(console.error).toHaveBeenCalled(); // Ensure error is logged
        expect(response).toBeNull(); // Expect the function to return null
    });
});
