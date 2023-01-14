import React from 'react';
import s from "./Header.module.css"
const Header = () => {
    return (
        <header className={s.header}>
            <img
                className={s.img}
                src="https://w7.pngwing.com/pngs/614/817/png-transparent-outlined-settings-cog-wheel-core-ui-outlined-icon.png"
            />
        </header>
    );
};
export default Header;

