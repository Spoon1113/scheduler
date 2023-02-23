import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const lists = props.days.map((list) => {
    return (
      <DayListItem
        key={list.id}
        name={list.name}
        spots={list.spots}
        selected={list.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  
  return <ul>
    {lists}
  </ul>;
}