import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DELETE_POST } from "../graphql/mutations";
import { GET_LATEST_POSTS, GET_POST } from "../graphql/queries";
import {
	Button,
	Category,
	Info,
	InfoContent,
	InfoThumbnail,
	InfoTitle,
	PostInfoCard,
	PostInfoMisc,
	Thumbnail,
	Title,
} from "../styles/Posts";

const PostInfo = () => {
	let { Id } = useParams();
	const navigate = useNavigate();

	const { data, loading, error } = useQuery(GET_POST, {
		variables: { id: Id },
	});

	const [deletePost] = useMutation(DELETE_POST);

	const handleDelete = async (postId) => {
		try {
			const { data } = await deletePost({
				variables: { id: postId },

				update(cache, { data: { deletePost } }) {
					const { posts } = cache.readQuery({
						query: GET_LATEST_POSTS,
					});

					console.log("in cha", posts);
					cache.writeQuery({
						query: GET_LATEST_POSTS,
						data: {
							posts: posts.filter((currentPost) => currentPost.id !== postId),
						},
					});
				},
			});
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Something went wrong</h1>;

	return (
		<>
			<PostInfoCard>
				<InfoThumbnail src={data.posts[0].thumbnail} alt="" />
				<InfoTitle>{data.posts[0].title}</InfoTitle>
				<PostInfoMisc>
					<Category>
						<span>Coding</span>
					</Category>
					<Info>
						<p>
							By Mc Hamouda at {new Date(data.posts[0].date).toDateString()}
						</p>
					</Info>
				</PostInfoMisc>

				<InfoContent dangerouslySetInnerHTML={{ __html: data.posts[0].body }} />

				<Link to={`/new-post/${data.posts[0].id}`}>
					<Button>Update</Button>
				</Link>
				<Button
					style={{ background: "red" }}
					onClick={() => handleDelete(data.posts[0].id)}>
					Delete
				</Button>
			</PostInfoCard>
		</>
	);
};

export default PostInfo;
