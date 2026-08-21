import React, { useState, useEffect } from "react";
import { getMyLoans, returnBook } from "../../api/loans";
import MyLoansPresenter from "./MyLoansPresenter";

function MyLoansContainer() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        loadLoans();
    }, []);

    const loadLoans = async () => {
        const data = await getMyLoans();
        setLoans(data);
    };

    const handleReturn = async (loanId) => {
        await returnBook(loanId);
        loadLoans();
    };

    return <MyLoansPresenter loans={loans} onReturn={handleReturn} />;
}

export default MyLoansContainer;