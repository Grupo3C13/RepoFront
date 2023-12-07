import React from 'react';
import CompartirRedes from "../Share/CompartirRedes";

const SharePopup = ({ shareData, onClose }) => {
    return (
        <div className="share-popup">
            <CompartirRedes shareData={shareData} />
        </div>
    );
};

export default SharePopup;