import { Logo, Nav, Menu, MenuItem } from "../styles/Header";

const Header = () => {
	return (
		<Nav>
			<Logo to="/">Hacker News</Logo>
			<Menu>
				<MenuItem to="/">Home</MenuItem>
				<MenuItem to="/new-post">New Post</MenuItem>
			</Menu>
		</Nav>
	);
};

export default Header;
