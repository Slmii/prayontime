import React        from 'react';
import { connect }  from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
    class RequireAuth extends React.Component {
        render() {
            switch(this.props.authUser)
            {
                case false:
                    return <Redirect to="/login" />;
                case null:
                    return <div>Loading...</div>;
                default:
                    return <ChildComponent {...this.props} />;
            }
        };        
    };

    return connect()(RequireAuth);
};  