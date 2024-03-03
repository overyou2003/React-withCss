import "./Input.css";

import React from "react";

export default function Input({...attributes}) {
    return <input className="input__styled" {...attributes} />;
}
