import React    from 'react';
import { Link } from 'react-router-dom';
import Head     from '../../../helpers/helmet';

const NotFound = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    
    const headInfo = { 
        title: '404: Page not found', 
        ogTitle: 'Page not found', 
        ogURL: 'http://localhost:3000'
    };

    return (
        <div className="row">
            <div className="col-md-12 text-center">
                <Head {...headInfo} />
                <h1>404: PAGE NOT FOUND</h1>
                <p><Link to='/' className="navbar-brand" >Go back to the Home Page</Link></p>
            </div>
        </div>
    );
};

export default {
    component: NotFound
};