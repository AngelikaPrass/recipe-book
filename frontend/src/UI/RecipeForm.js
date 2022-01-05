import React from 'react';
import { connect } from 'react-redux';
import { addNewRecipe } from "../ducks/recipes/operations";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

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
    createdOn: Yup.date().default(() => new Date()),
})

const RecipeForm = ({ addNewRecipe }, props) => {
    const handleSubmit = (values) => {
        addNewRecipe(values);

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
                isVegetarian: false,
                dateAdded: new Date()
            }}
                    validationSchema={RecipeSchema}
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