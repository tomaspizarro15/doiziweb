
import React, { Fragment, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import SearchBar from '../../../util/SearchBar/searchBar';
import Title from '../../../util/Titles/titles';
import './new_group.css';
import Fields from '../../../util/Fields/fields';
const newGroup = (props) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    const [state, setState] = useState({
        searchBar: {
            id: 0,
            label: "Titulo del Grupo",
            type: 'input',
            value: "SUP!",
            placeholder: "titulo",
            error: false,
            requirements: {
                length: {
                    required: false,
                },
                special: {
                    required: true,
                }
            }
        },
        fields: [
            {
                id: 0,
                label: "Titulo del Grupo",
                type: 'input',
                value: "",
                placeholder: "titulo",
                error: false,
                requirements: {
                    length: {
                        required: true,
                        min: 4,
                        max: 32
                    },
                    special: {
                        required: true,
                    }
                }
            },
            {
                id: 1,
                label: "Descripcion del grupo",
                type: 'textarea',
                value: "",
                placeholder: "descripción",
                error: false,
                requirements: {
                    length: {
                        required: true,
                        min: 0,
                        max: 250,
                    },
                }
            },
            {
                id: 2,
                label: "Imagen del grupo",
                type: 'file',
                value: "",
                placeholder: "file",
                error: false,
                requirements: {
                    length: {
                        required: true,
                        min: 0,
                        max: 250,
                    },
                }
            },
        ]
    })
    const [foundUsers, setFoundUsers] = useState([])

    const findUsers = (event) => {
        const searchBar = { ...state.searchBar }
        searchBar.value = event.target.value;
        setState({ searchBar: searchBar, fields: state.fields })
    }
    let timer;
    const fetchTimer = () => {
        const cookie = new Cookies('session');
        timer = setTimeout(() => {
            fetch('http://localhost:8080/search?q=' + state.searchBar.value, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": cookie
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.users)
                    setFoundUsers(data.users)
                })
        }, 500)
    }
    const refreshTimer = () => {
        clearTimeout(timer)
    }
    const inputHandler = (event, i) => {
        const fields = [...state.fields];
        fields[i].value = event.target.value;
        setState({ fields: fields, searchBar: state.searchBar })
    }

   

    return (
        <div className="dis main_container">
            <div className="disRLT new_group__container">
                <form className="dis new_group__form">
                    <Title texto="Crear nuevo grupo" color="#5A7FEE" size="22" />
                    {state.fields.map(field => {
                        return (
                            <Fragment key={field.id}>
                                <label>{field.label}</label>
                                <Fields field = {field} change = {(event) => {inputHandler(event , field.id)}}/>
                            </Fragment>
                        )
                    })}
                    <button type="submit" className="new_group__btn">Crear</button>
                </form>
                <div className="dis new_group__users">
                    <SearchBar value={state.searchBar.value} keyDown={refreshTimer} keyUp={fetchTimer} change={(event) => { findUsers(event) }} />
                    <ul>
                        {foundUsers.map(user => <li className="found_user">{user.name}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default newGroup; 
