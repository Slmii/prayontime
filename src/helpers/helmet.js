import { Helmet }  from 'react-helmet';
import React       from 'react';

const Head = ({ title, ogTitle, ogURL }) => (
    <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:url" content={ogURL} />
    </Helmet>
);

export default Head;