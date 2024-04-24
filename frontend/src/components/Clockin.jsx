import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from 'yup'

const clockinSchema = Yup.object().shape({
    location: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
});

function Clockin() {
    
}

export default Clockin