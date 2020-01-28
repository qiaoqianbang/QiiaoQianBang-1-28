import React from 'react';
import defaultRoutes from './routes';
import RouterMap from './map';
const index = props => {
    const Routes = props.routes ? props.routes : defaultRoutes;
    return (
        <div>
            <RouterMap routes={Routes} {...props} />
        </div>
    );
};

export default index;
