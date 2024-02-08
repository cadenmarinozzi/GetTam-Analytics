import './Footer.scss';
import { createRef } from 'react';
import GitHubIcon from '../../assets/GitHubLogo.png';
import GetTamIcon from '../../assets/logoSmall.png';
import GroupToggle from '../GroupToggle';
import colors from '../../colors.scss';
import PropTypes from 'prop-types';

function Footer(props) {
	let ref = createRef();

	return (
		<footer className="footer" ref={ref}>
			@ Created by Caden
			{props.children}
			<div>
				<GroupToggle // "Never make a theme switcher after you have already created the project" - nekumelon
					toggles={[
						{
							label: 'Light',
							default: true,
							onClick: () => {
								if (!ref.current) return;

								props.setTheme('light');

								document.body.style.backgroundColor =
									colors.light;
								ref.current.style.backgroundColor =
									colors.light;
								document
									.querySelectorAll('*')
									.forEach(element => {
										if (element.tagName === 'BUTTON')
											return;

										element.style.color = colors.dark;
									});
								document
									.querySelectorAll('button')
									.forEach(element => {
										if (
											element.className ===
												'button-active' ||
											element.className ===
												'button-inactive'
										)
											return;

										element.style.backgroundColor =
											colors.dark;
									});
							}
						},
						{
							label: 'Dark',
							onClick: () => {
								if (!ref.current) return;

								props.setTheme('dark');

								document.body.style.backgroundColor =
									colors.dark;
								ref.current.style.backgroundColor = colors.mid;
								document
									.querySelectorAll('*')
									.forEach(element => {
										if (element.tagName === 'BUTTON')
											return;

										element.style.color = colors.light;
									});
								document
									.querySelectorAll('button')
									.forEach(element => {
										if (
											element.className ===
												'button-active' ||
											element.className ===
												'button-inactive'
										)
											return;

										element.style.backgroundColor =
											colors.dark;
									});
							}
						}
					]}
				/>
				<a href="https://lankmann.github.io/GetTam">
					<img width="25" alt="GetTam Icon" src={GetTamIcon}></img>
				</a>
				<a href="https://github.com/cadenmarinozzi/GetTam-Analytics">
					<img width="25" alt="GitHub Icon" src={GitHubIcon}></img>
				</a>
			</div>
		</footer>
	);
}

Footer.propTypes = {
	setTheme: PropTypes.func.isRequired
};

export default Footer;
