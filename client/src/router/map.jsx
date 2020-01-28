import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
export default class map extends Component {
    render() {
        const { routes } = this.props;
        const defaultRedirect = <Redirect from="/" to="/login" exact key={'key'}></Redirect>;
        return (
            <div>
                <Switch>
                    {routes
                        .map(i => {
                            const Routes = i.children === undefined ? [] : i.children;
                            const Com = i.component;
                            return (
                                <Route
                                    key={i.path}
                                    path={i.path}
                                    component={props => {
                                        return <Com routes={Routes} {...props} />;
                                    }}
                                />
                            );
                        })
                        .concat([defaultRedirect])}
                </Switch>
            </div>
        );
    }
}
