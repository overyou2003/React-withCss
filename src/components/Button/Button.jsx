import "./Button.css";

import React from "react";

export default function Button({children, ...attributes}) {
    return <button className="button__styled" {...attributes}>{children}</button>
}
