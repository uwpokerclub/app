import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import List, {SpecialForm} from "../components/DynamicList";
import './Settings.scss';

function SettingsButton(): ReactElement {
    return (
        <button>
            Test button
        </button>
    );
}



function Settings(): ReactElement {
    return (
        <div style={{backgroundColor:'gray',
        width: '3000px',
        height: '3000px'}}>
            <p> This is the settings page</p>
            <ul>
                <ul className="dl-list">
                    <SpecialForm />
                </ul>
                <List />
            </ul>
        </div>

    );  
  }
  
  export default Settings;