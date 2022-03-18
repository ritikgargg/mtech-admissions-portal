import React from "react"

function Info() {
    const curr_year = new Date().getFullYear();

    return (
        <div className="min-h-screen">
            <div className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Selection</h2>
                    <p>Selection will be based on the GATE performance for the year {curr_year-2}/{curr_year-1}/{curr_year}. Please note that the candidates are required to register on "Common Offer and Acceptance Portal" (COAP) 2021(<a href="https://coap.iitd.ac.in/"  target="_blank" rel="noopener noreferrer" style={{color:"rgb(88 80 236)"}}>https://coap.iitd.ac.in/</a>) before applying online to the Institute. You are required to look at COAP Website for all round of the offers.</p>
                </div>
            </div>
            <div className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Financial Assistance</h2>
                    <p>GATE fellowship at the rate of Rs. 12400/- p.m. (tenable for a maximum period of 24 months) will be awarded to Indian Nationals doing the MTech Programmes, subject to Institute rules. They are required to assist the department for 8 hours of work per week related to academic activities of the department such as laboratory demonstration, tutorials, evaluation of assignments, test papers, seminars, research projects etc.</p>
                </div>
            </div>
            <div className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Reservation of Seats</h2>
                    <p>Seats are reserved for Indian National under the categories, SC / ST / OBC(Non-creamy layer) / EWS(Economically Weaker Section) and PWD(Persons with Disability) according to the Government of India rules.</p>
                </div>
            </div>
            <div className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 mb-6 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Final Authority</h2>
                    <p>In all matters relating to the admission to MTech programme, the decision of the MTech Admission Committee is final.</p>
                </div>
            </div>
        </div>
    )
}

export default Info;