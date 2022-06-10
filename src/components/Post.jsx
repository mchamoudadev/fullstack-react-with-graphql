import { Link } from "react-router-dom";
import { Card, CardInfo, Category, Title } from "../styles/Posts";

const Post = ({ id, title, body, thumbnail, category, user, date, index }) => {
	return (
		<Card to={`/post/${id}`} thumbnail={thumbnail} index={index}>
			<CardInfo>
				<Category>
					<span>Coding</span>
				</Category>

				<Title index={index}>{title}</Title>
				{index === 0 && (
					<div>
						<span>Mc Hamouda</span> -{" "}
						<span>{new Date(date).toDateString()}</span>
					</div>
				)}
			</CardInfo>
		</Card>
	);
};

export default Post;
