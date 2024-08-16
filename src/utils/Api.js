export function Api(
    housePrice,
    loanAmt,
    creditScore,
    stateCode,
    rateTypeCode,
    loanTerm,
    loanTypeCode,
    armType = "5-1"
) {
    const url = `/api/proxy?price=${housePrice}&loan_amount=${loanAmt}&minfico=${creditScore}&maxfico=${creditScore + 19}&state=${stateCode}&rate_structure=${rateTypeCode}&loan_term=${loanTerm}&loan_type=${loanTypeCode}&arm_type=${armType}`;

    return fetch(url)
        .then((res) => res.json())
        .catch((err) => {
            console.error(err);
            return null; 
        });
}
