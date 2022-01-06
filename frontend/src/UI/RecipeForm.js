import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewRecipe, editRecipe } from "../ducks/recipes/operations";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const today = new Date();
const RecipeSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, "name is too short")
        .max(30, "name is too long")
        .required('Required'),
    tags: Yup.array().of(Yup.string()),
    ingredients: Yup.array().of(Yup.string()),
    recipe: Yup.string()
        .min(50, "recipe is too short")
        .required('Required'),
    photo: Yup.string().url().nullable(),
    isVegan: Yup.boolean(),
    isVegetarian: Yup.boolean(),
    createdOn: Yup.date().default(() => new Date()).max(today).min('2015-01-01'),
})

const RecipeForm = ({ addNewRecipe, targetRecipe }, props) => {
    const navigate = useNavigate();
    const {
        id: targetRecipeId,
        name = '',
        tags= [],
        ingredients = [],
        recipe = '',
        photo = '',
        isVegan = false,
        isVegetarian = false,
        dateAdded = new Date()
        } = targetRecipe || {};

    const handleSubmit = (values) => {
        console.log(values)
        if(targetRecipe){
            editRecipe(values, targetRecipeId);
            navigate(`/recipes/${targetRecipeId}`);

        }
        else{
            addNewRecipe(values).then(response => {
                const newRecipeId = response.id;
                navigate(`/recipes/${newRecipeId}`);
            });
        }
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
                dateAdded
            }}
                    validationSchema={RecipeSchema}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                    enableReinitialize={true}>
                {({ values}) => (
                <Form>
                    <label htmlFor="name"> Name </label>
                    <Field id="name" name="name" placeholder="Spaghetti"/>
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
                    <Field name="recipe" as="textarea" rows="10" cols="30"/>
                    <label htmlFor="photo"> Photo: </label>
                    <Field name="photo" />
                    <label htmlFor="isVegan"> vegan: </label>
                    <Field type="checkbox" name="toggleVegan" />

                    <label htmlFor="isVegetarian"> vegetarian: </label>
                    <Field type="checkbox" name="toggleVegetarian" />

                    <button type="submit">
                        Dodaj
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
    addNewRecipe
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);