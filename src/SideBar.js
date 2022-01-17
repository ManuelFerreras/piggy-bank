import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faChartLine, faBoxes, faMoneyBill, faComment, faSortNumericDown, faSortNumericUp } from '@fortawesome/free-solid-svg-icons';

import piggy from './piggy.png';

export default ({ openStoreMenu, openWithdrawMenu, openDashboardMenu, openContactMenu, openErcStoreMenu, openErcWithdrawMenu }) => {

    return(

        <div className='sideBar'>

            <div className='sideBarHeader'>
                <img className='piggyImg' src={piggy}></img>
                <h1>Piggy Bank</h1>
            </div>

            <nav className='sideBarMenuList'>
                <a onClick={e => {e.preventDefault(); openDashboardMenu();}} ><FontAwesomeIcon icon={faChartLine} />DashBoard</a>
                <a onClick={e => {e.preventDefault(); openStoreMenu();}} ><FontAwesomeIcon icon={faBoxes} />Store Ether</a>
                <a onClick={e => {e.preventDefault(); openWithdrawMenu();}}><FontAwesomeIcon icon={faMoneyBill} />Withdraw Ether</a>
                <a onClick={e => {e.preventDefault(); openErcStoreMenu();}} ><FontAwesomeIcon icon={faBoxes} />Store Token</a>
                <a onClick={e => {e.preventDefault(); openErcWithdrawMenu();}}><FontAwesomeIcon icon={faMoneyBill} />Withdraw Token</a>
                <a onClick={e => {e.preventDefault(); openContactMenu();}}><FontAwesomeIcon icon={faComment} />Contact Me</a>
                
            </nav>

            <div className='sideBarFooter'>
                <nav className='sideBarSocials'>
                    <a href='https://github.com/ManuelFerreras'>
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href='https://www.linkedin.com/in/manuel-ferreras-47aa4b189'>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href='https://twitter.com/FerrerasManuel'>
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href='https://www.instagram.com/manu_ferreras_'>
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </nav>

                <p>Developed By Manuel Ferreras</p>
            </div>

        </div>
    );

}