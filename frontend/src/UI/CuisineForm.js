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
                    <div className="form-group">
                        <label htmlFor="name"> Name </label>
                        <Field id="name" name="name" className="form-control" placeholder="Italian" />
                        <ErrorMessage name="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description"> Description </label>
                            <Field id="description"  className="form-control" name="description" placeholder="Enter description here..." />
                            <ErrorMessage name="description" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo"> Photo: </label>
                            <Field name="photo" className="form-control" placeholder="Paste a link to picture..."/>
                            <ErrorMessage name="photo" />
                        </div>

                    <FieldArray name="ingredients">
                        {({remove, push }) => (
                            <div>
                                {values.ingredients.length > 0 &&
                                    values.ingredients.map((ingredient, index) => (
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label"> Ingredient </label>
                                            <div className="col-sm-2">
                                                <Field name={`ingredients.${index}`} type="text" placeholder="Lunch" className="form-control" />
                                                <ErrorMessage name={`ingredients.${index}`} component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="col-sm-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={()=>remove(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                <div className="form-group col-6">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => push('')}
                                    >
                                        Add ingredient
                                    </button>
                                </div>
                            </div>
                        )}
                    </FieldArray>
                        <button type="submit" className="btn btn-primary">Submit</button>
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