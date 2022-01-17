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
        console.log(values)
        if(recipeFromState) {
            editRecipe(values, id);
        }
        else {
            addNewRecipe(values);
        }
        navigate(-1);
    };

    return(
        <div>
            <h3> Add a recipe: </h3>
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
                <Form>
                    <label htmlFor="name"> Name </label>
                    <Field id="name" name="name" placeholder="Spaghetti"/>
                    <ErrorMessage name="name" />
                    <FieldArray name="tags">
                        {({remove, push }) => (
                            <div>
                                {values.tags.length > 0 &&
                                values.tags.map((tag, index) => (
                                    <div className="row" key={index}>
                                    <div className="col">
                                        <label htmlFor={`tags.${index}`}> Tag </label>
                                        <Field
                                            name={`tags.${index}`}
                                            placeholder="Lunch"
                                            type="text"
                                            />
                                        <ErrorMessage
                                            name={`tags.${index}`}
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
                                    onClick={() => push('')}
                                >
                                    Add Tag
                                </button>
                            </div>
                        )}
                    </FieldArray>

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

                    <label htmlFor="recipe"> Recipe: </label>
                    <Field name="recipe" as="textarea" rows="10" cols="30" placeholder="Enter recipe here..."/>
                    <ErrorMessage name="recipe" />

                    <label htmlFor="photo"> Photo: </label>
                    <Field name="photo" placeholder="Paste a link to picture..."/>
                    <ErrorMessage name="photo" />

                    <label htmlFor="isVegan"> vegan: </label>
                    <Field type="checkbox" name="toggleVegan" />

                    <label htmlFor="isVegetarian"> vegetarian: </label>
                    <Field type="checkbox" name="toggleVegetarian" />

                    <label htmlFor="preparationTime"> Preparation time: </label>
                    <Field as="select" name="preparationTime">
                        <option value=""> </option>
                        <option value="20"> 10 - 30 minutes</option>
                        <option value="25"> less than 30 minutes </option>
                        <option value="45"> 30 minutes - 1 hour </option>
                        <option value="90"> 1 - 2 hours </option>
                        <option value="125"> over 2 hours </option>
                        <option value="500"> overnight </option>
                    </Field>
                    <ErrorMessage name="preparationTime" />

                    <label htmlFor="cookingTime"> Cooking time: </label>
                    <Field as="select" name="cookingTime">
                        <option value=""> </option>
                        <option value="20"> 10 - 30 minutes</option>
                        <option value="25"> less than 30 minutes </option>
                        <option value="45"> 30 minutes - 1 hour </option>
                        <option value="90"> 1 - 2 hours </option>
                        <option value="125"> over 2 hours </option>
                        <option value="500"> overnight </option>
                    </Field>
                    <ErrorMessage name="cookingTime" />

                    <button type="submit" >
                        Add
                    </button>
                </Form>
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