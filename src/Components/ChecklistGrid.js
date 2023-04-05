import React, {useEffect} from "react";
import ChecklistCard from "./ChecklistCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchChecklist } from "../store";


const ChecklistGrid = () => {
    const { checklist } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchChecklist());
    }, []);

    return (
        <>
            <h1>list</h1>
            {checklist?.map(ele => {
                return <ChecklistCard key={ele._id} checklistObj={ele} />})
            }
        </>
    );
};

export default ChecklistGrid;