import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  const interList = props.interviewers.map(inter => {
    return (
      <InterviewerListItem
        key={inter.id}
        name={inter.name}
        avatar={inter.avatar}
        selected={inter.id === props.value}
        setInterviewer={() => props.onChange(inter.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interList}
      </ul>
    </section>
  );
}