import React, { ReactElement } from "react";
import { discordLine, instagramLine, facebookLine, emailLine } from "../../../assets"
import useToggle from "./useToggle";

const LineImages = [
    {discordLine},
    {instagramLine},
    {facebookLine},
    {emailLine}
]

const LineArray = [
    { number:1, title: 'JOIN THE DISCORD', image: 'discord_line' },
    
    {number:2,title: 'FOLLOW ON INSTAGRAM',    image: 'instagram_line'},

    {number:3, title: 'LIKE THE FACEBOOK!', image: 'facebook_line'},

    { number:4,title: 'CONTACT OUR EMAIL', image: 'email_line'},
]

const Links = [
    'https://discord.gg/2k4h9sM',
    'https://www.instagram.com/uwpokerclub/',
    'https://www.facebook.com/uwpokerstudie',
    'mailto:uwaterloopoker@gmail.com'
  ];




function ToggleButton(toggleElement: ReactElement, buttonDescription:string){
    const [toggle,setToggle] = useToggle(true);
    
    return (
    <div>
        <button
            onClick ={setToggle}
            className="btn btn-secondary mb-5">
        {buttonDescription}
        </button>

        {toggle && (toggleElement)}
    </div>
    
    )
}


function ButtonTing(){
    return(
        ToggleButton(
        <div>
            "Test"
        </div>,"XXX")
    )
}

function SpecialForm (){

    return (
        ToggleButton(
                <li>
                <a className="form-link" href="https://forms.gle/p7hB6XbTPfsdijrE6" target="_blank" rel="noreferrer">
                <img src={require('../../../assets/' + 'form_line' +'.svg')} className="mr-4 pl-1" alt=""/>
                    2023 WINTER MIDTERM
                    </a>
                </li>,"Special Event Form" )
)}


export default function List() {
    

    const listItems = LineArray.map((item, index) =>
        <div>
            <li>
                <a className='text-link' href={Links[index]} target="_blank" rel="noreferrer">
                    <img
                    src={require('../../../assets/' + item.image +'.svg')}
                    className="mr-4 pl-1"
                    alt=''/>
                    {item.title}
                </a>
            </li>
 
    </div>
        
  );
  return (<ul className="socials-list">{listItems}</ul>);
  
}

export {SpecialForm};