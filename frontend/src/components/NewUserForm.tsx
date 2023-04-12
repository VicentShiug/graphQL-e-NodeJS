import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USER } from "../App";
import { client } from "../lib/apollo";
import React from "react";

const CREATE_USER = gql`
	mutation ($nome: String!) {
		createUser(nome: $nome) {
			id
			nome
		}
	}
`;

export function NewUserForm() {
	const [nome, setNome] = useState("");
	const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
	async function handleCreateUser(event: FormEvent) {
		event.preventDefault();

		if (!nome) {
			return;
		}

		await createUser({
			variables: {
				nome,
			},
			update: (cache, { data: { createUser } }) => {
				const { users } = client.readQuery({ query: GET_USER });

				cache.writeQuery({
					query: GET_USER,
					data: {
						users: [...users, createUser],
					},
				});
			},
			// refetchQueries: [GET_USER],
		});

		console.log(data);
	}
	return (
		<form onSubmit={handleCreateUser}>
			<input
				type="text"
				value={nome}
				onChange={(e) => setNome(e.target.value)}
			/>
			<button type="submit">Enviar</button>
		</form>
	);
}
