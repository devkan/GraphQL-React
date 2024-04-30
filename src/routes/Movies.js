import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Movies() {
	const [movies, setMovies] = useState([]);
	const client = useApolloClient();
	/*
	Movies 화면에서 client가 필요한데, 이건 useClient hook를 통해 가져올 수 있다.
	useApolloClient를 사용하면 client.js를 가져와 사용이 가능한데, 이는 index.js에서 ApolloProvider에 의해 App 전체로 전달되기 때문이다.
	그래서 여기서는 바로 client를 사용할 수 있는 것이다.
	*/
	useEffect(() => {
		client
			.query({
				query: gql`
					{
						allMovies {
							id
							title
						}
					}
				`,
			})
			.then((results) => setMovies(results.data.allMovies));
	}, [client]);

	return (
		<ul>
			{movies.map((movie) => (
				<li key={movie.id}>{movie.title}</li>
			))}
		</ul>
	);
}
