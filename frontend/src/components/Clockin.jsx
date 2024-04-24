import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { form_data } from "../redux/action";
import { setClockedIn } from "../redux/slice";
import api from "../api";
import * as Yup from "yup";

const clockinSchema = Yup.object().shape({
  location: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
});

function ClockIn({ user, date }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clockedIn = useSelector((state) => state.clockStatus.clockedIn);

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
      clock_in_time: date.toLocaleTimeString(),
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
        <Form>
          <h3>Date: {date.toLocaleDateString()}</h3>
          <h3>Time: {date.toLocaleTimeString()}</h3>

          <h3>Location</h3>
          <Field type="text" name="location" />
          <ErrorMessage name="location" component="div" />

          <h3>Role</h3>
          <Field as="select" name="role">
            <option value="">Select a role</option>
            <option value="scoreboard">Scoreboard</option>
            <option value="paperscorer">Paper Scorer</option>
            <option value="camera">Camera Operator</option>
            <option value="onlinescorer">Online Scorer</option>
            <option value="gamechange">Game Changer</option>
            <option value="subtime">Sub timer</option>
          </Field>
          <ErrorMessage name="role" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Clock In
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ClockIn;
