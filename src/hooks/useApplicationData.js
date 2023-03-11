import axios from "axios";
import { useState, useEffect } from "react";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Creates a new appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const days = updateSpots(state, appointments);
        setState({
          ...state,
          appointments,
          days,
        });
        return response;
      })
      .catch((err) => {
        throw new Error("Can't book interview");
      });
  }
  // Deletes an existing appointment
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const days = updateSpots(state, appointments);
      setState({
        ...state,
        appointments,
        days,
      });
      return response;
    });
  }
  // Update spots for a specific day based on whether an appointment was booked / cancelled
  const updateSpots = function (state, appointments) {
    const dayObj = state.days.find((d) => d.name === state.day);

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const day = { ...dayObj, spots };
    return state.days.map((d) => (d.name === state.day ? day : d));
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
