import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './/css/Book.css';
import {Router} from "./routes/Router";
import Home from "./View/HomeView";

const headers = ["Book", "Author", "Language", "Published", "Sales"];

const data = [["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 million"],
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],
    ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"],
    ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
    ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],];

function App() {
    return (
        // ReactDOM.render(
        //     React.createElement(Excel, {
        //         headers: headers,
        //         initialData: data
        //     }
        //     <Home/>),
        //     document.getElementById("root")
        // )
        <Router/>
    );
}

export default App;
