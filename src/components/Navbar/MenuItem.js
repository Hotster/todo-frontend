import React from "react";

class MenuItem extends React.Component {
    render() {
        return (
            <React.Fragment>
                <li>{this.props.name}</li>
            </React.Fragment>
        )
    }
}

export default MenuItem;