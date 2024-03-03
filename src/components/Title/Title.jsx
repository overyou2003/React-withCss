import "./Title.css";

import React from "react";

import PropTypes from "prop-types";

function Title({ text }) {
    return <h1 className="title__styled">{text}</h1>;
}

Title.propTypes = {
    text: PropTypes.string.isRequired
};

export default Title;
