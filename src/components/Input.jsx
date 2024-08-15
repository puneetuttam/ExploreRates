import React, { useEffect, useState, useMemo } from "react";
import {
    TextField,
    Grid,
    Typography,
    MenuItem,
    Box,
    Slider,
} from "@mui/material";
import stateData from "../assets/data.json";
import { Api } from "../utils/Api";
import BarChart from "./BarChart";

const Input = () => {
    const [housePrice, setHousePrice] = useState(200000);
    const [loanAmt, setLoanAmt] = useState(180000);
    const [creditScore, setCreditScore] = useState(700);
    const [downPaymentAmount, setDownPaymentAmount] = useState(20000);
    const [state, setState] = useState("Alabama");
    const [stateCode, setStateCode] = useState("AL");
    const [rate, setRate] = useState(10);
    const [rateType, setRateType] = useState("Fixed");
    const [rateTypeCode, setRateTypeCode] = useState("fixed");
    const [loanTerm, setLoanTerm] = useState(15);
    const [loanType, setLoanType] = useState("Conventional");
    const [loanTypeCode, setLoanTypeCode] = useState("conf");
    const [data, setData] = useState();

    const minCreditScore = 600;
    const maxCreditScore = 850;
    const creditScoreStep = 19;
    const creditScoreMarks = useMemo(
        () => [
            { value: minCreditScore, label: minCreditScore },
            { value: maxCreditScore, label: maxCreditScore },
        ],
        []
    );

    useEffect(() => {
        // Recalculate loan amount based on house price and down payment amount
        setLoanAmt(housePrice - downPaymentAmount);
    }, [housePrice, downPaymentAmount]);

    useEffect(() => {
        // Recalculate down payment amount based on house price and rate
        const newDownPaymentAmount = housePrice * (rate / 100);
        setDownPaymentAmount(newDownPaymentAmount);
        setLoanAmt(housePrice - newDownPaymentAmount);
    }, [rate, housePrice]);

    useEffect(() => {
        Api(
            housePrice,
            loanAmt,
            creditScore,
            stateCode,
            rateTypeCode,
            loanTerm,
            loanTypeCode
        ).then((res) => setData(res));
    }, [
        housePrice,
        loanAmt,
        creditScore,
        stateCode,
        rateTypeCode,
        loanTerm,
        loanTypeCode,
        downPaymentAmount
    ]);

    const handleCreditScoreChange = (event, newValue) => {
        setCreditScore(newValue);
    };

    const creditScoreLabelFormat = () => {
        const rangeEnd = Math.min(
            creditScore + creditScoreStep,
            maxCreditScore
        );
        return `${creditScore} - ${rangeEnd}`;
    };

    return (
        <Box
            sx={{
                padding: 3,
                maxWidth: "100%",
                margin: "40px ", 
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Grid container spacing={3}>
                {/* Left Column - Reduced Size */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ width: "100%", textAlign: "center", marginBottom: 4 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2, padding: 2 }}>
                            Credit Score Range
                        </Typography>
                        <Slider
                            value={creditScore}
                            onChange={handleCreditScoreChange}
                            valueLabelDisplay="on"
                            valueLabelFormat={creditScoreLabelFormat}
                            min={minCreditScore}
                            max={maxCreditScore}
                            step={creditScoreStep}
                            marks={creditScoreMarks}
                            sx={{ color: creditScore < 700 ? "red" : "green" }}
                        />
                        <Typography variant="body2" sx={{ marginTop: 2 }}>
                            Credit score has a big impact on the rate you'll receive.{" "}
                            <span
                                style={{
                                    color: "#007bff",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                Learn more
                            </span>
                        </Typography>
                    </Box>

                    {/* State selection dropdown */}
                    <TextField
                        select
                        label="State"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={state}
                        onChange={(e) => {
                            const selectedState = e.target.value;
                            const selectedStateData = stateData.find(
                                (item) => item.state === selectedState
                            );
                            setState(selectedState);
                            setStateCode(
                                selectedStateData ? selectedStateData.stateCode : ""
                            );
                        }}
                    >
                        {stateData.map((state) => (
                            <MenuItem key={state.id} value={state.state}>
                                {state.state}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* House Price Input */}
                    <TextField
                        label="House Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={housePrice}
                        onChange={(e) => setHousePrice(Number(e.target.value))}
                    />

                    {/* Down Payment and Rate Inputs */}
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Down Payment"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={downPaymentAmount}
                                onChange={(e) =>{
                                    setDownPaymentAmount(Number(e.target.value));
                                    const newRate = (Number(e.target.value) / housePrice) * 100;
                                    setRate(newRate);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Rate (%)"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                            />
                        </Grid>
                    </Grid>

                    {/* Loan Amount Display */}
                    <Typography variant="h6" style={{ marginTop: 20 }}>
                        Loan Amount: ${loanAmt}
                    </Typography>

                    {/* Loan Details Inputs */}
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Rate Type"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={rateType}
                                onChange={(e) => {
                                    const selectedRateType = e.target.value;
                                    setRateType(selectedRateType);
                                    setRateTypeCode(
                                        selectedRateType === "Adjustable"
                                            ? "arm"
                                            : selectedRateType.toLowerCase()
                                    );
                                }}
                            >
                                <MenuItem value="Fixed">Fixed</MenuItem>
                                <MenuItem value="Adjustable">Adjustable</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Loan Term"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(Number(e.target.value))}
                            >
                                <MenuItem value={15}>15 Years</MenuItem>
                                <MenuItem value={30}>30 Years</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Loan Type"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={loanType}
                                onChange={(e) => {
                                    const selectedLoanType = e.target.value;
                                    setLoanType(selectedLoanType);
                                    setLoanTypeCode(
                                        selectedLoanType === "Conventional"
                                            ? "conf"
                                            : selectedLoanType.toLowerCase()
                                    );
                                }}
                            >
                                <MenuItem value="Conventional">Conventional</MenuItem>
                                <MenuItem value="FHA">FHA</MenuItem>
                                <MenuItem value="VA">VA</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            marginTop: 2,
                        }}
                    >
                        {/* Render the BarChart */}
                        {data ? (
                            <Box sx={{ width: '100%', height: '100%' }}>
                                <BarChart data={data} />
                            </Box>
                        ) : (
                            <Typography variant="h6" align="center">
                                Loading chart data...
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Input;
