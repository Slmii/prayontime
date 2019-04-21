import App        from './App';
import Home       from './components/Home/Home';
import NotFound   from './components/NotFound/NotFound';

const routes = [
    {
        ...App,
        routes: [
            {
                ...Home,
                path: '/',
                exact: true
            },
            {
                ...NotFound
            }
        ]
    }
]

export default routes;