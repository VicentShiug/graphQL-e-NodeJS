import { gql, useQuery } from "@apollo/client";
import { NewUserForm } from "./components/NewUserForm";

type User = {
	id: String;
	nome: String;
};

export const GET_USER = gql`
	query {
		users {
			id
			nome
		}
	}
`;

function App() {
	const { data, loading } = useQuery<{ users: User[] }>(GET_USER);

	if (loading) {
		return <p>Carregando...</p>;
	}

	console.log(data);
	return (
		<div>
			<ul>
				{data?.users.map((user) => (
					<li>{user.nome}</li>
				))}
			</ul>
			<NewUserForm />
		</div>
	);
}

export default App;
