/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import {
    Redirect,
    Route,
    RouteProps,
    RouteComponentProps
} from "react-router-dom";
import { useAuth } from "../config/auth";

/**
 * Component to forbid access to chosen route when the user doesn't have a token
 */
export interface ProtectedRouteProps extends RouteProps {
    hasAdequateRole: boolean;
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
    const { authToken } = useAuth();

    const isAuthenticated = authToken != null;

    const { component: ComponentToRender, hasAdequateRole, ...rest } = props;
    console.log("Entering protected Route", authToken, "isAuthenticated: ", isAuthenticated)
    return (
        <Route
            {...rest}
            render={(routeProps): any =>
                isAuthenticated && hasAdequateRole ? (
                    <ComponentToRender {...routeProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: routeProps.location }
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
