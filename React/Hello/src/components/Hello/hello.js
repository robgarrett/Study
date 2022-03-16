import React from "react";

import Styles from "./hello.module.css";

class Hello extends React.Component {
    render() {
        return (
            <div className={Styles.hello}>
                Hello World
            </div>
        );
    }
}
export default Hello;
