import { gql } from '@apollo/client';

export const REGISTER_POST = gql`
    mutation registerPost($title: String!, $body: String!, $thumbnail: String!) {
        insert_posts(objects :{title: $title, body :$body, thumbnail: $thumbnail}) {
            returning {
            body
            date
            id
            thumbnail
            title
            }
        }
}
`;


export const UPDATE_POST = gql`

    mutation updatePost($id: uuid!, $title : String!, $body : String!, $thumbnail: String!) {
    update_posts(where: {id: {_eq: $id}}, _set: {
        title: $title,
        body : $body,
        thumbnail: $thumbnail
    }){
        returning {
        id
        title
        body
        thumbnail
        date
        } 
    } 
}
`;

export const DELETE_POST = gql`

    mutation deletePost($id : uuid!){
        delete_posts(where: {id: {_eq: $id}}){
        returning{
        id
        title
        thumbnail
        body
        date
        }
    }
}

`;
