import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
	query getMovie($movieId: String!) {
		movie(id: $movieId) {
			id
			title
			small_cover_image
		}
	}
`;

export default function Movie() {
	const { id } = useParams();
	const { data, loading } = useQuery(GET_MOVIE, {
		variables: {
			movieId: id,
		},
	});
	console.log(data, loading);
	if(loading) return <h1>Loading...</h1>;
	// movies 화면이 돌가서 다시 동일한 movie로 들어가면 loading없이 데이타가 바로 나온다.
	// 이는 apollo cache로 InMemoryCache설정이 작동해서 그런것이다.
	// apollo가 쿼리를 저장해서 쿼리 결과가 브라우저의 메모리에 있는 cache에 저장이 되기 때문이다.
	
	return <div>{data.movie.title}</div>;
}
