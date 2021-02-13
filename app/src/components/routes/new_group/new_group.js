
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
            value: "",
            placeholder: "nombre de usuario",
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
                        min: 2.5,
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
    const [userFile, setUserFile] = useState({})
    const [invitedUsers, setInvitedUsers] = useState([])

    const findUsers = (event) => {
        const searchBar = { ...state.searchBar }
        searchBar.value = event.target.value;
        setState({ searchBar: searchBar, fields: state.fields })
    }
    let timer;
    const fetchTimer = () => {
        const cookie = new Cookies('session');
        timer = setTimeout(() => {
            if (state.searchBar.value !== "") {
                fetch('http://localhost:8080/search?q=' + state.searchBar.value, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": cookie
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        setFoundUsers(data.users)
                    })
            } else {
                setFoundUsers([])
            }
        }, 500)
    }
    const refreshTimer = () => {
        clearTimeout(timer)
    }
    const inputHandler = (event, i) => {
        if (state.fields[i].type === 'file') {
            const file = event.target.files;
            const fields = [...state.fields]

            const reader = new FileReader();
            reader.readAsArrayBuffer(file[0])
            reader.onload = (e) => {
                setUserFile(e.target.result)
            }
            reader.onerror = (e) => {
                setUserFile({})
            }

        } else {
            const fields = [...state.fields];
            fields[i].value = event.target.value;
            setState({ fields: fields, searchBar: state.searchBar })
        }
    }

    const inviteUsers = (i) => {
        let isInvited = false;
        if (user.username === foundUsers[i].username) {
            console.log("Username identical", user.username, foundUsers[i].username)
            return null;
        }
        invitedUsers.map(invitedUser => {
            if (invitedUser.username === foundUsers[i].username) {
                isInvited = true;
            }
        })
        if (!isInvited) {
            setInvitedUsers([...invitedUsers, foundUsers[i]])
            const newFoundUsers = [...foundUsers]
            newFoundUsers.splice(i, 1)
            setFoundUsers([...newFoundUsers])
        }
    }

    const deleteUsers = (i) => {
        const newInvitedUsers = [...invitedUsers];
        newInvitedUsers.splice(i, 1)
        setInvitedUsers([...newInvitedUsers])
    }

    const submitHandler = () => {
        const formdata = new FormData();
        formdata.append('image')
        fetch('http://localhost:8080/groups', {
            method: 'POST',
            headers: {
                "Authorization": ""
            }
        })
    }
    console.log(invitedUsers)

    return (
        <div className="dis main_container">
            <div className="disRLT new_group__container">
                <div className="dis new_group">
                    <form className="dis new_group__form">
                        <Title texto="Crear nuevo grupo" color="#5A7FEE" size="2.5" />
                        {state.fields.map(field => {
                            return (
                                <Fragment key={field.id}>
                                    <label className="field">{field.label}</label>
                                    <Fields field={field} change={(event) => { inputHandler(event, field.id) }} />
                                </Fragment>
                            )
                        })}
                        <button type="submit" className="global_button">Crear</button>
                    </form>
                    <div className="dis new_group__email">
                        <Title color="#5A7EFF" texto="Invitar por email" size="2.5" />
                        <input className="global_input" />
                        <button className="global_button">Enviar correo</button>
                    </div>
                </div>

                <div className="dis new_group__users">
                    <div className="dis new_group__users_search">
                        <Title color="#5A7EFF" size="2.5" texto="Invitar usuarios" />
                        <SearchBar placeholder={state.searchBar.placeholder} value={state.searchBar.value} keyDown={refreshTimer} keyUp={fetchTimer} change={(event) => { findUsers(event) }} />
                    </div>
                    <div className="disR new_group__users_results">
                        <div className="disC new_group__users_invite">
                            <Title texto="Dueño del grupo" color="#5A7EFF" size="2.5" />
                            <li className="disRL found_user" key={user.username}>
                                <p className="found_user_name">{user.name} {user.lastname}</p>
                                <p className="found_user_nick">@{user.username}</p>
                            </li>
                            <Title texto="Usuarios Invitados" color="#5A7EFF" size="2.5" />
                            {invitedUsers.map((user, i) => {
                                return (
                                    <li key={user.username} className="disRL found_user">
                                        <div style={{ width: '90%' }}>
                                            <p className="found_user_name">{user.name} {user.lastname}</p>
                                            <p className="found_user_nick">@{user.username}</p>
                                        </div>
                                        <button className="found_user_delete" onClick={() => { deleteUsers(i) }}>X</button>
                                    </li>
                                )
                            })}
                        </div>
                        <ul className="disC new_group__users_found">
                            <Title texto="Search result..." color="#5A7EFF" size="2.5" />

                            {foundUsers.length !== 0 ? foundUsers.map((user, i) => {
                                return (
                                    <li key={user.username} className="disRL found_user">
                                        <div style={{ width: '90%' }}>
                                            <p className="found_user_name">{user.name} {user.lastname}</p>
                                            <p className="found_user_nick">@{user.username}</p>
                                        </div>
                                        <button className="found_user_add" onClick={() => { inviteUsers(i) }}>+</button>
                                    </li>
                                )
                            }) : <div className="dis" style={{height : '100%'}}> <Title color="#7b7b7b" texto="Buscar usuarios..." /></div>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default newGroup; 
