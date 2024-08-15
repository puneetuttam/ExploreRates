export default async function handler(req, res) {
    const { method } = req;
    
    if (method === 'GET') {
        const { query } = req;
        const apiUrl = `https://www.consumerfinance.gov/oah-api/rates/rate-checker?price=${query.price}&loan_amount=${query.loan_amount}&minfico=${query.minfico}&maxfico=${query.maxfico}&state=${query.state}&rate_structure=${query.rate_structure}&loan_term=${query.loan_term}&loan_type=${query.loan_type}&arm_type=${query.arm_type}`;
        
        try {
            const apiResponse = await fetch(apiUrl);
            const data = await apiResponse.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
