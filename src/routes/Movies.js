import {
	gql,
	//useApolloClient,
	useQuery,
} from "@apollo/client";
//import { useEffect, useState } from "react";

// useQuery hook을 사용하기 위해서 gql을 외부로 뺀다.
// getMovies는 임의로 지정한 이름으로 다른 것을 사용해도 된다.
const ALL_MOVIES = gql`
	query getMovies {
		allMovies {
			id
			title
		}
		allBoards {
			id
			title
			author {
				fullName
			}
		}
	}
`;

export default function Movies() {
	//const result = useQuery(ALL_MOVIES);
	//console.log(result);

	/*
	useQuery 사용. 그럼 useEffect, useState를 사용하지 않아도 된다.
	useQuery는 declarative code(선언형 코드)를 쓰게 해 준다. 선언형 코드는 원하는 걸 설명하기 위한 코드만을 적는 것을 말한다.
	반면에 imperative(명령형)은 모든 단계의 코드를 적는 것을 말하면 react의 state를 사용한 코드가 그것이다.
	그래서 if문으로 단계별로 코드를 구성하면 되는 것이다. loading중이면 Loading..보여주고, error나면 error 보여주고, data가 있으면 data 보여주는 것이다.
	*/
	const { data, loading, error } = useQuery(ALL_MOVIES);
	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Could not fetch..</h1>;

	return (
		<ul>
			<h1>Movies List</h1>
			{data.allMovies.map((movie) => (
				<li key={movie.id}>{movie.title}</li>
			))}
			<h1>Boards List</h1>
			{data.allBoards.map((board) => (
				<li key={board.id}>
					{board.title} by {board.author.fullName}
				</li>
			))}
		</ul>
	);

	/* 일반적으로 react의 state를 사용한 코드
	const [movies, setMovies] = useState([]);
	const client = useApolloClient();
	//Movies 화면에서 client가 필요한데, 이건 useClient hook를 통해 가져올 수 있다.
	//useApolloClient를 사용하면 client.js를 가져와 사용이 가능한데, 이는 index.js에서 ApolloProvider에 의해 App 전체로 전달되기 때문이다.
	//그래서 여기서는 바로 client를 사용할 수 있는 것이다.
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
	*/
}
