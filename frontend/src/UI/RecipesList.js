import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router';
import {connect, shallowEqual, useSelector} from 'react-redux';
import {getRecipes} from "../ducks/recipes/selectors";
import {deleteRecipe, getRecipeList} from "../ducks/recipes/operations";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'


const RecipesList = ( {recipes, getRecipeList, deleteRecipe }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sorting, setSorting] = useState(()=>()=>1);
    const [filtering, setFiltering] = useState( () => () => true);
    const [filtering2, setFiltering2] = useState( () => () => true);
    const [filtering3, setFiltering3] = useState( () => () => true);
    const [displayedData, setDisplayedData] = useState(recipes);

    useEffect(() => {
        setDisplayedData(recipes.filter(e => filtering(e) && filtering2(e) && filtering3(e)).sort(sorting))
    }, [filtering, filtering2, filtering3, sorting, recipes]);

    const handleFiltering = (e) => {
        if(e.target.value !== ''){
            const key = e.target.value;
            setFiltering(() => recipe => recipe[key]);
        }
        else{
            setFiltering(() => () => true);
        }
    }

    const handleSorting = e => {
        switch(e.target.value){
            case 'alphabetASC':
                setSorting(() => (recipe1, recipe2) => {
                    return recipe1.name.localeCompare(recipe2.name);
                })
                break;
            case 'alphabetDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return recipe2.name.localeCompare(recipe1.name);
                })
                break;
            case 'dateASC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.createdOn > recipe2.createdOn;
                })
                break;
            case 'dateDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return '' + recipe1.createdOn < recipe2.createdOn;

                })
                break;
            case 'ingredientsASC':
                setSorting(() => (recipe1, recipe2) => {
                    return recipe1.ingredients.length - recipe2.ingredients.length;
                })
                break;
            case 'ingredientsDESC':
                setSorting(() => (recipe1, recipe2) => {
                    return recipe2.ingredients.length - recipe1.ingredients.length;
                })
                break;
            default:
                setSorting(() => () => 1)
        }
    }

    const handleDelete = (id) => {
        deleteRecipe(id);
        alert("deleted recipe");
    }

    const dropdownFilter = (e) => {
        if(e.target.value !== ''){
            setFiltering3(() => recipe => {
                return recipe.preparationTime === Number(e.target.value);
            });
        }
        else{
            setFiltering3(() => () => true);
        }
    }

    const searching = (searchTerm) => {
        return (recipe) => {
            return recipe.ingredients?.some(x => x.toLowerCase().includes(searchTerm.toLowerCase()));
        }
    };

    useEffect(()=>{
        setFiltering2(()=>searching(searchTerm))
    }, [searchTerm])

    const displayVegan = recipe => {
        if(recipe.isVegetarian && !recipe.isVegan){
            return "vegetarian";
        }
        else if(recipe.isVegan){
            return "vegan";
        }
    }

    return(
        <div>
            <div className="d-flex p-2">
                <form className="vegan">
                    <ul>
                        <li>
                            vegan:
                            <input type="radio" name="radio" value={"isVegan"} onClick={handleFiltering}/>
                        </li>
                        <li>
                            vegetarian:
                            <input type="radio" name="radio" value={"isVegetarian"} onClick={handleFiltering}/>
                        </li>
                        <li>
                            no filtering:
                            <input type="radio" name="radio" value={""} onClick={handleFiltering}/>
                        </li>

                    </ul>
                </form>
                <div className="sorting">
                    sort by:
                    <select name="sort" onChange={handleSorting} defaultValue={"none"}>
                        <option value="none"> - </option>
                        <option value="alphabetASC"> alphabetically ascending </option>
                        <option value="alphabetDESC"> Alphabetically descending </option>
                        <option value="dateASC"> By date ascending </option>
                        <option value="dateDESC"> By date descending </option>
                        <option value="ingredientsASC"> By amount of ingredients ascending </option>
                        <option value="ingredientsDESC"> By amount of ingredients descending </option>
                    </select>
                </div>

                <div className="time">
                    preparation time:
                    <select name="time" onChange={dropdownFilter} defaultValue={"none"}>
                        <option value="none"> - </option>
                        <option value="25"> less than 30 minutes </option>
                        <option value="45"> 30 minutes - 1 hour </option>
                        <option value="90"> 1 hour - 2 hours </option>
                        <option value="125"> over 2 hours </option>
                        <option value="500"> overnight </option>
                    </select>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search for an ingredient..." onChange={e => {
                        setSearchTerm(e.target.value)
                    }}/>
                </div>
            </div>

            <Container>
            <Row xs={1} md={4} className="g-4">
    {displayedData.map(recipe => {
                return (
                    <Col key={recipe._id}>
                    <Card className="h-100">
                        <Card.Img variant="top" src={recipe.photo} className="h-50"/>
                        <Card.Body>
                            <Card.Title> <a href={`/recipes/${recipe._id}`} class="text-muted"> {recipe.name} </a> </Card.Title>
                            <Card.Subtitle>
                                {displayVegan(recipe)}
                            </Card.Subtitle>
                            <Card.Text>
                                <ul>
                                    tags:
                                    {recipe.tags.map(tag => <li key={tag}> {tag} </li>)}
                                </ul>
                            </Card.Text>
                            <Card.Footer><Button variant="primary" onClick={ () => handleDelete(recipe._id)}> x </Button>{' '}</Card.Footer>
                        </Card.Body>
                    </Card>
                    </Col>

                )}
            )}
            <Link to={'/form'}> <Button variant="primary"> Add new recipe </Button></Link>
            </Row>
            </Container>

                <Outlet />
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log(state)
    return {
        recipes: getRecipes(state)
    };
}

const mapDispatchToProps  = {
    getRecipeList, deleteRecipe
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);