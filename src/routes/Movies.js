import {
	gql,
	//useApolloClient,
	useQuery,
} from "@apollo/client";
import { Link } from "react-router-dom";
//import { useEffect, useState } from "react";
import styled from "styled-components";

// useQuery hook을 사용하기 위해서 gql을 외부로 뺀다.
// getMovies는 임의로 지정한 이름으로 다른 것을 사용해도 된다.
const ALL_MOVIES = gql`
	query getMovies {
		allMovies {
			id
			title
			medium_cover_image
		}
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const Header = styled.header`
	background-image: linear-gradient(-45deg, #d754ab, #fd723a);
	height: 45vh;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const Title = styled.h1`
	font-size: 60px;
	font-weight: 600;
	margin-bottom: 20px;
`;

const Loading = styled.div`
	font-size: 18px;
	opacity: 0.5;
	font-weight: 500;
	margin-top: 10px;
`;

const MoviesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 25px;
	width: 60%;
	position: relative;
	top: -50px;
`;

const PosterContainer = styled.div`
	height: 400px;
	border-radius: 7px;
	width: 100%;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	background-color: transparent;
`;

const PosterBg = styled.div`
	background-image: url(${(props) => props.background});
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center center;
	border-radius: 7px;
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
	if (error) return <h1>Could not fetch..</h1>;
	
	return (
		<Container>
			<Header>
				<Title>Apollo Movies</Title>
			</Header>
			{loading && <Loading>Loading...</Loading>}
			<MoviesGrid>
				{data?.allMovies?.map((movie) => (
					<PosterContainer key={movie.id}>
						<Link to={`/movies/${movie.id}`}>
							<PosterBg background={movie.medium_cover_image} />
						</Link>
					</PosterContainer>
				))}
			</MoviesGrid>
		</Container>
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
