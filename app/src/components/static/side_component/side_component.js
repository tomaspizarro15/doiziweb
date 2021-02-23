import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './side_component.css';
import bellLogo from './side_component_icons/bell_icon.png'
import msgLogo from './side_component_icons/message_icon.png'
import newsLogo from './side_component_icons/news_icon.png'
import promLogo from './side_component_icons/promotion-icon.png'
import groupLogo from './side_component_icons/groups.png'
import addGroupLogo from './side_component_icons/add_groups.png'
import joinGroupLogo from './side_component_icons/join_groups.png'
import Nots from '../../../util/nots/nots';
const SideComponent = props => {

    useEffect(() => {
        console.log(props.user)
    }, [])

    const [state, setState] = useState({
        barElements: [
            {
                id: 1,
                status: false,
                label: "Grupos",
                href: '/new-group',
                properties: [
                    { id: 0, label: "Create group", logo: addGroupLogo, href: "/new-group" },
                    { id: 1, label: "Join group", logo: joinGroupLogo, href: "/join-group" },
                    { id: 2, label: "   My groups", logo: groupLogo, href: "/my-groups" },
                ],
                delay: 100
            },
            {
                id: 2,
                status: false,
                label: "Notificaciones",
                notIcon: true,
                properties: [
                    { id: 0, label: "Mensajes", logo: msgLogo, href: "/messages" },
                    { id: 1, label: "Noticias", logo: newsLogo, href: "/news" },
                    { id: 2, label: "Notificaciones", logo: bellLogo, href: "/notifications" },
                    { id: 3, label: "Promociones", logo: promLogo, href: "/promotions" }
                ],
                delay: 100
            }
        ],
        userBarStatus: false,
        userProperties: [{ id: 0, label: "Ver perfil", href: "/", dinamic: true }, { id: 1, label: "Amigos", href: "/", dinamic: false }],
        user: {},
    })
    useEffect(() => {
        if (props.user) {
            setState({ userBarStatus: state.userBarStatus, barElements: state.barElements, userProperties: state.userProperties, user: props.user })
        }
    }, [props.user])

    const displayProfile = () => setState({ userBarStatus: !state.userBarStatus, barElements: state.barElements, userProperties: state.userProperties, user: state.user })
    const displayBarElement = (i) => {
        const newBarElements = [...state.barElements];
        newBarElements[i].status = !newBarElements[i].status;
        setState({ userBarStatus: state.userBarStatus, barElements: newBarElements, userProperties: state.userProperties, user: state.user })
    }
    let classes = {
        userBar: 'dis user_bar__props',
        userBarLink: 'user_bar__link',
        userBarLi: 'dis user_bar__props_li',
        sideBar: 'dis side_bar__props',
        sideBarLink: 'dis side_bar__link displayed',
        userBarTitle: 'user_bar__title'
    }
    if (state.userBarStatus) {
        classes.userBar = 'dis user_bar__props displayed'
        classes.userBarLi = 'user_bar__props_li displayed'
        classes.userBarLink = 'user_bar__link displayed'
        classes.userBarTitle = 'user_bar__title displayed'
    }
    return (
        <ul className="side_bar">
            <div className="disC side_bar__wrap">
                <li className=" side_bar__element">
                    <div className={classes.userBarLink} onClick={displayProfile}>
                        <p className={classes.userBarTitle}>{props.user.name} {props.user.lastname}</p>
                    </div>
                    <div className={classes.userBar} style={state.userBarStatus ? { height: `${state.userProperties.length * 3}rem` } : null} >
                        {state.userProperties.map((propElement, i) => <div style={{ transitionDelay: `${i * 100 + 100}ms` }} className={classes.userBarLi} key={propElement.id}><Link className="side_bar_ref" to={propElement.href + state.user.username}>{propElement.label}</Link></div>)}
                    </div>
                </li>
                {state.barElements.map((el, i) =>
                    <li key={el.id} className="side_bar__element" style={{ animationDelay: `${el.delay * el.id}ms` }}>
                        <div className={el.status ? "side_bar__link displayed" : "side_bar__link"} onClick={() => { displayBarElement(i) }} >
                            <p className="side_bar__link_label" to={el.href}>{el.label}</p>
                            {el.notIcon ? <Nots arr={state.user.invitations} /> : null}
                        </div>
                        {el.status ?
                            <div className={classes.sideBar} style={{ height: `${el.properties.length * 3}rem` }}>
                                {el.properties.map((propElement, i) => {
                                    return (
                                        <div className="disRL side_bar__props_li" style={{ animationDelay: `${i * 100 + 150}ms` }} key={propElement.id}>
                                            <Link className="side_bar_ref" to={propElement.href}>{propElement.label}</Link>
                                            <img className="side_bar_icon" src={propElement.logo}></img>
                                        </div>)
                                })}
                            </div> : null}
                    </li>)}
            </div>
        </ul>
    )

}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(SideComponent);