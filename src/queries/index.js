//query to add a note

import { gql } from "@apollo/client";

//function created to create/modify the data in db and return some values
//insert_notes 'insert' is a prefix for table 'notes' graphql syntax
export const insertNoteMutation = gql`
  mutation ($name: String!, $user_id: String!) {
    insert_notes(objects: {name: $name, user_id: $user_id}) {
      returning {
        note_id
        name,
        user_id
      }
    }
  }
`;

//function for gql query to get all notes using specified variables
export const getNotesQuery = gql`
query {
  notes(order_by: { createdOn: desc }) {
    note_id
    name
    user_id
  }
}
`;

//function for gql mutation query to delete a note i.e remove specified data in db
export const deleteNoteMutation = gql`
mutation($note_id: Int!) {
  delete_notes_by_pk (note_id: $note_id) {
    note_id
    name
    user_id
  }
} 
`;


//gql query to update a note using prefix 'update'
export const updateNoteMutation = gql`
  mutation ($name: String!, $note_id: Int!) {
    update_notes(where: {note_id: {_eq: $note_id}}, _set: {name: $name}) {
      affected_rows
    }
  }
`;
