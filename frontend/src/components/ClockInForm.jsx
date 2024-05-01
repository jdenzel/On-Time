import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { form_data } from "../redux/action";
import { setClockedIn } from "../redux/slice";
import api from "../api";
import * as Yup from "yup";
import "../styles/timeclock.css";

const clockinSchema = Yup.object().shape({
  location: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
});

function ClockInForm({ date }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clockedIn = useSelector((state) => state.clockStatus.clockedIn);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (clockedIn) {
      navigate("/clockout/");
    }
  }, [clockedIn, navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    const form = {
      employee: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      clock_in_time: date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      ...values,
    };
    api
      .post("api/clockin/", form)
      .then((response) => {
        dispatch(form_data({ id: response.data.data.id, ...form }));
        console.log(response);
        console.log({ id: response.data.data.id, ...form });
        navigate("/clockout/");
        dispatch(setClockedIn());
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });
  };
  return (
    <Formik
      initialValues={{ location: "", role: "" }}
      validationSchema={clockinSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="cin-form-lr">
          <div className="form-location">
            <i className="material-icons">location_on </i>
            <Field
              className="location-select"
              type="text"
              name="location"
              placeholder="location"
            />
          </div>
          <div className="err">
            <ErrorMessage name="location" component="div" />
          </div>

          <div className="form-role">
            <i className="material-icons">person </i>
            <Field className="role-select" as="select" name="role">
              <option value="">Select a role</option>
              <option value="scoreboard">Scoreboard</option>
              <option value="paperscorer">Paper Scorer</option>
              <option value="camera">Camera Operator</option>
              <option value="onlinescorer">Online Scorer</option>
              <option value="gamechange">Game Changer</option>
              <option value="subtime">Sub timer</option>
            </Field>
          </div>
          <div className="err">
            <ErrorMessage name="role" component="div" />
          </div>

          <button className="form-btn" type="submit" disabled={isSubmitting}>
            Clock In
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ClockInForm;
