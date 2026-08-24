import React, { useState, useEffect } from "react";
import { getMyLoans, getLoanHistory, returnBook } from "../../api/loans";
import MyLoansPresenter from "./MyLoansPresenter";

function MyLoansContainer() {
    const [loans, setLoans] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        loadLoans();
    }, [showHistory]);

    const loadLoans = async () => {
        const data = showHistory ? await getLoanHistory() : await getMyLoans();
        setLoans(data);
    };

    const handleReturn = async (loanId) => {
        await returnBook(loanId);
        loadLoans();
    };

    const toggleView = () => {
        setShowHistory(!showHistory);
    }

    return (
        <MyLoansPresenter
            loans={loans}
            onReturn={handleReturn}
            showHistory={showHistory}
            onToggleView={toggleView}
        />
    );
}

export default MyLoansContainer;