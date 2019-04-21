import React                            from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Home   from './components/Home/Home';
import Footer from './components/Footer/Footer';

const App = () => (
    <BrowserRouter>
        <React.Fragment>
            <Header />
            <div className="container h-100">
                <Switch>
                    <Route path="/" {...Home} />
                </Switch>
            </div>
            <Footer />
        </React.Fragment>
    </BrowserRouter>
);

export default App;