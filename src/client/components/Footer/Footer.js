import React            from 'react';
import { isMobileOnly } from 'react-device-detect';

const Footer = () => {
    return (
        <footer className={isMobileOnly ? "fixed-footer text-center" : "footer text-center"}>
            <div className="container">
                COPYRIGHT © 2019 PRAYONTIME.COM. ALL RIGHTS RESERVED.
            </div>
        </footer>
    );
};

export default Footer;