import './Footer.scss';
import GitHubIcon from '../../assets/GitHubLogo.png';

function Footer(props) {
	return (
		<footer className="footer">
			@ Created by Caden
			{props.children}
			<a href="https://github.com/nekumelon/GetTam-Analytics">
				<img width="25" alt="GitHub Icon" src={GitHubIcon}></img>
			</a>
		</footer>
	);
}

export default Footer;
