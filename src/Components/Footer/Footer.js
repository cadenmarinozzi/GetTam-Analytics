import './Footer.scss';
import GitHubIcon from '../../assets/GitHubLogo.png';
import GetTamIcon from '../../assets/logoSmall.png';

function Footer(props) {
	return (
		<footer className="footer">
			@ Created by Caden
			{props.children}
			<div>
				<a href="https://lankmann.github.io/GetTam">
					<img width="25" alt="GetTam Icon" src={GetTamIcon}></img>
				</a>
				<a href="https://github.com/nekumelon/GetTam-Analytics">
					<img width="25" alt="GitHub Icon" src={GitHubIcon}></img>
				</a>
			</div>
		</footer>
	);
}

export default Footer;
