import {
	Button,
	InfoThumbnail,
	Input,
	Label,
	PostForm,
	Preview,
} from "../styles/Posts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6

import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@apollo/client";
import { REGISTER_POST, UPDATE_POST } from "../graphql/mutations";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { GET_LATEST_POSTS, GET_POST } from "../graphql/queries";

const NewPost = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const [selectedFile, setSelectedFile] = useState("");
	const [thumbnail, setThumbnail] = useState("");
	const [loadingLocal, setLoadingLocal] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const [update, setUpdate] = useState(false);

	const [registerPost] = useMutation(REGISTER_POST);
	const [updatePost] = useMutation(UPDATE_POST);

	const { Id } = useParams();
	const navigate = useNavigate();

	const { data, loading, error } = useQuery(GET_POST, {
		variables: { id: Id },
	});

	useEffect(() => {
		if (data) {
			setImageSrc(data.posts[0].thumbnail);
			setTitle(data.posts[0].title);
			setThumbnail(data.posts[0].thumbnail);
			setBody(data.posts[0].body);
			setUpdate(true);
			setUploaded(true);
		}
	}, [data]);

	const handleChange = (event) => {
		// the state hase some bad spaces so replace them
		event.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
		setBody(event);
	};

	const handleImageSelect = (e) => {
		setUploaded(false);
		setUpdate(false);
		const file = e.target.files[0];
		setSelectedFile(file);
		setImageSrc(window.URL.createObjectURL(file));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", selectedFile);
		formData.append("upload_preset", "vvhsfg0s");

		try {
			setLoadingLocal(true);
			if (!uploaded && !update) {
				const { data } = await axios.post(
					"https://api.cloudinary.com/v1_1/dugsiiye/image/upload",
					formData
				);
				setUploaded(true);
				setThumbnail(data.secure_url);
				handleRegisterPost(data.secure_url);
			} else {
				handleRegisterPost();
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleRegisterPost = async (updateThumbnail) => {
		try {
			if (!Id) {
				const { data } = await registerPost({
					variables: {
						title,
						body,
						thumbnail: updateThumbnail ? updateThumbnail : thumbnail,
					},
					refetchQueries: [{ query: GET_LATEST_POSTS }],
				});
			} else {
				// console.log({ title, body, thumbnail });
				const { data } = await updatePost({
					variables: {
						id: Id,
						title,
						body,
						thumbnail: updateThumbnail ? updateThumbnail : thumbnail,
					},
					refetchQueries: [{ query: GET_LATEST_POSTS }],
				});
			}

			setLoadingLocal(false);
			setTitle("");
			setUploaded(false);
			setSelectedFile("");
			setImageSrc("");
			toast.success("Post Registered Successfully");
			navigate("/");
		} catch (err) {
			setLoadingLocal(false);
			console.log(err, Id);
			toast.error("Somthing Failed");
		}
	};

	return (
		<PostForm onSubmit={handleSubmit}>
			<Label htmlFor="title">Post Title</Label>
			<Input
				type="text"
				id="file"
				name="file"
				placeholder="Post thumbnail..."
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<Label htmlFor="fname">Post Body</Label>
			<ReactQuill
				value={body}
				onChange={handleChange}
				formats={NewPost.formats}
				modules={NewPost.modules}
			/>
			<Input
				type="file"
				id="fname"
				name="firstname"
				placeholder="Your name.."
				onChange={handleImageSelect}
			/>
			{imageSrc && <Preview src={imageSrc}></Preview>}

			<Button type="submit" disabled={loadingLocal}>
				{loadingLocal ? "Uploading..." : "Submit"}
			</Button>
		</PostForm>
	);
};

NewPost.modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "image", "video"],
		["clean"],
		["code-block"],
	],
};

NewPost.formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"link",
	"image",
	"video",
	"code-block",
];

export default NewPost;
