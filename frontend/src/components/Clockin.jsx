import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { form_data } from "../redux/action";
import { setClockedIn } from "../redux/slice";
import axios from "axios";
import * as Yup from 'yup'

const clockinSchema = Yup.object().shape({
    location: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
});

function Clockin( {user} ) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const clockedIn = useSelector((state) => state.clockStatus.clockedIn);

    useEffect(() => {
        if (clockedIn) {
          navigate("/clockout/");
        }
      }, [clockedIn, navigate]);

    
}

export default Clockin