import React from "react";
import ChecklistCard from "./ChecklistCard";

const ChecklistGrid = () => {
    const obj = {name: 'luca'}

    return (
        <>
            <h1>list</h1>
            <ChecklistCard checklistObj={obj}/>
        </>
    );
};

export default ChecklistGrid;