import React from 'react'

export default function SubmitSuccess() {
    return (
    <div>
        {/* The button to open modal */}
        <label htmlFor="my-modal" className="btn modal-button">open modal</label>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Congratulations random Interner user!</h3>
            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <div className="modal-action">
            <label htmlFor="my-modal" className="btn">Yay!</label>
            </div>
        </div>
        </div>
    </div>
    );
}
