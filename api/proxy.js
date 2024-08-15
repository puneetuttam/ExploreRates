// api/proxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
    // Extract query parameters from the request
    const {
        housePrice,
        loanAmt,
        creditScore,
        stateCode,
        rateTypeCode,
        loanTerm,
        loanTypeCode,
        armType,
    } = req.query;

    // Build the URL to make the request to the external API
    const url = `https://www.consumerfinance.gov/oah-api/rates/rate-checker?price=${housePrice}&loan_amount=${loanAmt}&minfico=${creditScore}&maxfico=${
        creditScore + 19
    }&state=${stateCode}&rate_structure=${rateTypeCode}&loan_term=${loanTerm}&loan_type=${loanTypeCode}&arm_type=${armType}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
}
