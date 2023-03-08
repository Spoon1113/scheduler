export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((item) => item.name === day);
  let appArr = [];

  if (filteredDay.length === 0) {
    return appArr;
  }

  if (filteredDay.length > 0) {
    appArr = filteredDay[0].appointments;
  }

  const filteredAppointment = appArr.map((appointment) => {
    return state.appointments[`${appointment}`];
  });

  return filteredAppointment;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter((item) => item.name === day);
  let appArr = [];

  if (filteredDay.length === 0) {
    return [];
  }

  if (filteredDay.length > 0) {
    appArr = filteredDay[0].interviewers;
  }

  const filteredInterviewers = appArr.map((interviewer) => {
    return state.interviewers[`${interviewer}`];
  });

  return filteredInterviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}
