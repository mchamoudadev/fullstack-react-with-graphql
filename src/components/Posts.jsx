import { Grid } from "../styles/Posts";
import Post from "./Post";
import { gql, useQuery } from "@apollo/client";
import { GET_LATEST_POSTS } from "../graphql/queries";
import { useState } from "react";

// const posts = [
// 	{
// 		id: uuid(),
// 		title: "ReactJs Is Really Cool For Building High Performance Apps .",
// 		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quia.",
// 		thumbnail:
// 			"https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80",
// 		user: "Kalid",
// 		category: "Natural Thing",
// 		date: "2022-09-08",
// 	},
// 	{
// 		id: uuid(),
// 		title: "VueJs is Prograsive Web App.",
// 		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quia.",
// 		thumbnail:
// 			"https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2922&q=80",
// 		user: "Kalid",
// 		category: "Natural Thing",
// 		date: "2022-09-08",
// 	},
// 	{
// 		id: uuid(),
// 		title: "NextJs For SSR and SSG.",
// 		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quia.",
// 		thumbnail:
// 			"https://images.unsplash.com/photo-1543877087-ebf71fde2be1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
// 		user: "Kalid",
// 		category: "Natural Thing",
// 		date: "2022-09-08",
// 	},
// 	{
// 		id: uuid(),
// 		title: "Natural Things there.",
// 		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quia.",
// 		thumbnail:
// 			"https://images.unsplash.com/photo-1414872785488-7620d2ae7566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
// 		user: "Kalid",
// 		category: "Natural Thing",
// 		date: "2022-09-08",
// 	},
// 	{
// 		id: uuid(),
// 		title: "Whats is your next plane for this year?",
// 		body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quia.",
// 		thumbnail:
// 			"https://images.unsplash.com/photo-1590608897129-79da98d15969?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
// 		user: "Kalid",
// 		category: "Natural Thing",
// 		date: "2022-09-08",
// 	},
// ];

// const GET_POSTS = gql`
// 	query getAllPosts {
// 		posts(limit: 5) {
// 			id
// 			title
// 			body
// 			thumbnail
// 			date
// 		}
// 	}
// `;

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const { data, error, loading } = useQuery(GET_LATEST_POSTS);

	console.log("data", data);
	console.log("error", error);

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>something went wrong</h1>;
	return (
		<Grid>
			{!loading &&
				!error &&
				data.posts.map((post, index) => (
					<Post key={index} {...post} index={index} />
				))}
		</Grid>
	);
};

export default Posts;
