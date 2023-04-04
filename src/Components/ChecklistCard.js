import React from "react";

const ChecklistCard = (prop) => {
    return (
        <>
        <h1>card</h1>
        <pre>{JSON.stringify(prop.checklistObj, null, 2)}</pre>
        </>
    );
};

export default ChecklistCard;