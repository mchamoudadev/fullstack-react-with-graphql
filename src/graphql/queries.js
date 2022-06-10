import { gql } from "@apollo/client";

export const GET_LATEST_POSTS = gql`
    query read_latest_posts {
        posts(limit: 5, order_by: {date: desc}) {
            id
            thumbnail
            title
            body
            date
        }
    }
`;

export const GET_POST = gql`
    query getPost($id: uuid!) {
    posts(where: {id: {_eq: $id}}){
        id
        title
        body
        thumbnail
        date
    }
    }
`;
