import {connect} from "react-redux";
import {addNewCuisine} from "../ducks/cuisines/operations";
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import React from "react";

const CuisineSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, "name is too short")
        .max(30, "name is too long")
        .required('Please enter a cuisine name'),
    description: Yup.string()
        .min(50, "description is too short")
        .required("please enter the description"),
    ingredients: Yup.array().of(Yup.string()).required("please provide key ingredients of the cuisine"),
    photo: Yup.string().url().required('Please add a link to picture'),
})

const CuisineForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        addNewCuisine(values);
        navigate(-1);
    }
    return(
        <div>
            <h1>Add new cuisine </h1>
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    ingredients: [],
                }}
                validationSchema={CuisineSchema}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
                enableReinitialize={true}>
                {({ values, errors, touched}) => (
                <Form>
                    <label htmlFor="name"> Name </label>
                    <Field id="name" name="name" placeholder="Italian" />
                    <ErrorMessage name="name" />

                    <label htmlFor="description"> Description </label>
                    <Field id="description" name="description" placeholder="Enter description here..." />
                    <ErrorMessage name="description" />

                    <label htmlFor="photo"> Photo: </label>
                    <Field name="photo" placeholder="Paste a link to picture..."/>
                    <ErrorMessage name="photo" />

                    <FieldArray name="ingredients">
                        {({remove, push }) => (
                            <div>
                                {values.ingredients.length > 0 &&
                                    values.ingredients.map((ingredient, index) => (
                                        <div className="row" key={index}>
                                            <div className="col">
                                                <label htmlFor={`ingredients.${index}`}> Ingredient </label>
                                                <Field
                                                    name={`ingredients.${index}`}
                                                    placeholder="Zucchini"
                                                    type="text"
                                                />
                                                <ErrorMessage
                                                    name={`ingredients.${index}`}
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                            <div className="col">
                                                <button
                                                    type="button"
                                                    className="secondary"
                                                    onClick={()=>remove(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => push( '')}
                                >
                                    Add Ingredient
                                </button>
                            </div>
                        )}
                    </FieldArray>

                    <button type="submit">Submit</button>
                </Form>
                )}
            </Formik>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        cuisines: state.cuisines
    }};

const mapDispatchToProps = {
    addNewCuisine
};

export default connect(mapStateToProps, mapDispatchToProps)(CuisineForm);