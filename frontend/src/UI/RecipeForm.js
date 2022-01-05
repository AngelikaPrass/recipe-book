import React from 'react';
import { connect } from 'react-redux';
import {createRecipeAction} from "../ducks/recipes/actions";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';


const RecipeForm = (props) => {
    const handleSubmit = (values) => {
        createRecipeAction(values);
    };

    return(
        <div>
            <h3> Add a recipe: </h3>
            <Formik initialValues={{
                id: uuidv4(),
                name: '',
                tags: [{
                    tag: ''
                }],
                ingredients: [{
                    ingredient: ''
                }],
                recipe: '',
                photo: '',
                isVegan: false,
                isVegetarian: false
            }}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                    enableReinitialize={true}>
                {({ values }) => (
                <Form>
                    <label htmlFor="name"> Name </label>
                    <Field id="name" name="name" placeholder="Spaghetti"/>
                    <FieldArray name="tags">
                        {({insert, remove, push }) => (
                            <div>
                                {values.tags.length > 0 &&
                                values.tags.map((tag, index) => (
                                    <div className="row" key={index}>
                                    <div className="col">
                                        <label htmlFor={`tags.${index}.tag`}> Tag </label>
                                        <Field
                                            name={`tags.${index}.tag`}
                                            placeholder="Lunch"
                                            type="text"
                                            />
                                        <ErrorMessage
                                            name={`tags.${index}.tag`}
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
                                    onClick={() => push({ tag: ''})}
                                >
                                    Add Tag
                                </button>
                            </div>
                        )}
                    </FieldArray>

                    <FieldArray name="ingredients">
                        {({insert, remove, push }) => (
                            <div>
                                {values.ingredients.length > 0 &&
                                    values.ingredients.map((ingredient, index) => (
                                        <div className="row" key={index}>
                                            <div className="col">
                                                <label htmlFor={`ingredients.${index}.ingredient`}> Ingredient </label>
                                                <Field
                                                    name={`ingredients.${index}.ingredient`}
                                                    placeholder="Zucchini"
                                                    type="text"
                                                />
                                                <ErrorMessage
                                                    name={`ingredients.${index}.ingredient`}
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
                                    onClick={() => push({ ingredient: ''})}
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
                    <button type='button'>
                        is VEGAN?
                    </button>
                    <button type='button'>
                        is VEGETARIAN?
                    </button>

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
    };
}
const mapDispatchToProps = {
    createRecipeAction
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);