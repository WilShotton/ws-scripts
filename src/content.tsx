import * as React from "react";


// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<{}, {}> {
    render() {
        return (
            <h1>Hello from TypeScript!</h1>
        )
    }
}
