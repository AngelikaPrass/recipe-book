import React, {useEffect} from 'react';
import {connect, shallowEqual, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {addNewRecipe, editRecipe} from "../ducks/recipes/operations";
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {selectRecipe} from "../ducks/recipes/selectors";

const RecipeSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, "name is too short")
        .max(30, "name is too long")
        .required('Please enter a recipe name'),
    tags: Yup.array().of(Yup.string()).required('At least one tag is required').min(1),
    ingredients: Yup.array().of(Yup.string()).required('Recipe must contain at least one ingredient').min(1),
    recipe: Yup.string()
        .min(50, "recipe is too short")
        .required('Please enter the recipe'),
    photo: Yup.string().url().required('Please add a link to picture'),
    isVegan: Yup.boolean(),
    isVegetarian: Yup.boolean(),
    preparationTime: Yup.string().required('Please select preparation time'),
    cookingTime: Yup.string().required('Please select cooking time'),
})

const RecipeForm = ({ addNewRecipe, editRecipe }) => {

    let { id } = useParams();
    const recipeFromState = useSelector(state => selectRecipe(state, id), shallowEqual);
    const navigate = useNavigate();

    useEffect(() => {
        if(recipeFromState){

            console.log(recipeFromState);
        }
    }, [recipeFromState])

    const {
        name = '',
        tags= [],
        ingredients = [],
        recipe = '',
        photo = '',
        isVegan = false,
        isVegetarian = false,
        preparationTime = '',
        cookingTime = '',
        } = recipeFromState || {};

    const handleSubmit = (values) => {
        (async(values) => {
            if(recipeFromState) {
                await editRecipe(values, id);
                navigate(`/recipes/${id}`);
            }
            else {
                await addNewRecipe(values);
                navigate(`/recipes`)
            }
        })(values)
    };

    return(
    <div>
        <Formik initialValues={{
            name,
            tags,
            ingredients,
            recipe,
            photo,
            isVegan,
            isVegetarian,
            preparationTime,
            cookingTime,
        }}
                validationSchema={RecipeSchema}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
                enableReinitialize={true}>
            {({ values, errors, touched}) => (
                <div className="container">
                    <Form>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label"> Name: </label>
                        <div className="col-sm-8">
                            <Field id="name" name="name" placeholder="Spaghetti" className="form-control"/>
                            <ErrorMessage name="name" />
                        </div>
                    </div>

                    <FieldArray name="tags">
                        {({remove, push }) => (
                            <div>
                                {values.tags.length > 0 &&
                                    values.tags.map((tag, index) => (
                                        <div className="form-group row">
                                                <label className="col-sm-2 col-form-label"> Tag </label>
                                                <div className="col-sm-2">
                                                    <Field name={`tags.${index}`} type="text" placeholder="Lunch" className="form-control" />
                                                    <ErrorMessage name={`tags.${index}`} component="div" className="invalid-feedback" />
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
                              Add Tag
                          </button>
                      </div>
                            </div>
                        )}
                    </FieldArray>

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

                    <div className="form-group">
                    <label htmlFor="recipe"> Recipe: </label>
                    <Field className="form-control" name="recipe" as="textarea" rows="3" cols="1" placeholder="Enter recipe here..."/>
                    <ErrorMessage name="recipe" />
                    </div>

                    <div className="form-group row">
                        <label htmlFor="photo" className="col-sm-2 col-form-label"> Photo: </label>
                        <div className="col-sm-8">
                            <Field name="photo" placeholder="Paste a link to picture..." className="form-control"/>
                            <ErrorMessage name="photo" />
                        </div>
                    </div>


                    <label htmlFor="isVegan"> vegan: </label>
                    <Field type="checkbox" name="isVegan" />

                    <label htmlFor="isVegetarian"> vegetarian: </label>
                    <Field type="checkbox" name="isVegetarian" />

                    <div className="form-group">
                        <label htmlFor="preparationTime"> Preparation time: </label>
                        <Field as="select" name="preparationTime" className="form-select">
                            <option value=""> </option>
                            <option value="20"> 10 - 30 minutes</option>
                            <option value="25"> less than 30 minutes </option>
                            <option value="45"> 30 minutes - 1 hour </option>
                            <option value="90"> 1 - 2 hours </option>
                            <option value="125"> over 2 hours </option>
                            <option value="500"> overnight </option>
                        </Field>
                        <ErrorMessage name="preparationTime" />
                    </div>

                    <div className="form-group">
                    <label htmlFor="cookingTime"> Cooking time: </label>
                    <Field as="select" name="cookingTime" className="form-select">
                        <option value=""> </option>
                        <option value="20"> 10 - 30 minutes</option>
                        <option value="25"> less than 30 minutes </option>
                        <option value="45"> 30 minutes - 1 hour </option>
                        <option value="90"> 1 - 2 hours </option>
                        <option value="125"> over 2 hours </option>
                        <option value="500"> overnight </option>
                    </Field>
                    <ErrorMessage name="cookingTime" />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </Form>
                </div>
            )}
        </Formik>

    </div>
    )
};
const mapStateToProps = (state) => {
    return {
        recipes: state.recipes
}};

const mapDispatchToProps = {
    addNewRecipe, editRecipe
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);

// <label htmlFor="isVegan"> vegan: </label>
// <Field type="checkbox" name="isVegan"/>
//
// <label htmlFor="isVegetarian"> vegetarian: </label>
// <Field type="checkbox" name="isVegetarian"/>