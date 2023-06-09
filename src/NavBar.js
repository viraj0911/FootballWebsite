import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
	return (
		<div className="nav-bar-container">
			<div className="left-container">
				<Link to="/" className="league">
					Serie A
				</Link>
				<Link to="/premier-league" className="league">
					Premier League
				</Link>
				<Link to="/la-liga" className="league">
					La Liga
				</Link>
				<Link to="/bundesliga" className="league">
					BundesLiga
				</Link>
				<Link to="/ligue-1" className="league">
					Ligue 1
				</Link>
				<Link to="/eredivisie" className="league">
					Eredivisie
				</Link>
			</div>
			<div className="right-container">
				<Link to="/user-form" className="logo-link" >
					<div className="logo-container">
						<span className="icon-text">Team Survey</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
