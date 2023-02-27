export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(item => item.name === day);
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


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const val = interview.interviewer;
  const interviewer = state.interviewers[val];
  interview.interviewer = interviewer;
  
  return interview;
}

