import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
	query getMovie($movieId: String!) {
		movie(id: $movieId) {
			id
			title
			large_cover_image
			rating
			description_full
			isLiked @client
		}
	}
`;
// isLiked @client 는 local only field로 apollo cache에 저장되어 해당 유저만 사용하는 것이다.

const Container = styled.div`
	height: 100vh;
	background-image: linear-gradient(-45deg, #d754ab, #fd723a);
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: white;
`;

const Column = styled.div`
	margin-left: 10px;
	width: 50%;
`;

const Title = styled.h1`
	font-size: 65px;
	margin-bottom: 15px;
`;

const Subtitle = styled.h4`
	font-size: 35px;
	margin-bottom: 10px;
`;

const Description = styled.p`
	font-size: 28px;
`;

const Image = styled.div`
	width: 25%;
	height: 60%;
	background-color: transparent;
	background-image: url(${(props) => props.bg});
	background-size: cover;
	background-position: center center;
	border-radius: 7px;
`;

const Button = styled.button`
	width: 100px;
	height: 50px;
	font-size: 20px;
	border-radius: 7px;
`;

export default function Movie() {
	const { id } = useParams();
	const {
		data,
		loading,
		client: { cache },
	} = useQuery(GET_MOVIE, {
		variables: {
			movieId: id,
		},
	});
	// console.log(data, loading);
	// if(loading) return <h1>Loading...</h1>;
	// movies 화면이 돌가서 다시 동일한 movie로 들어가면 loading없이 데이타가 바로 나온다.
	// 이는 apollo cache로 InMemoryCache설정이 작동해서 그런것이다.
	// apollo가 쿼리를 저장해서 쿼리 결과가 브라우저의 메모리에 있는 cache에 저장이 되기 때문이다.

	// return <div>{data.movie.title}</div>;

	const onClick = () => {
		/*
		writeFragment는 cache에 있는 fragment를 수정할 때 사용한다.
		형식이 정해져 있어서 아래와 비슷한 구성으로 작성하면 된다.
		*/
		cache.writeFragment({
			id: `Movie:${id}`, // id는 cache에 저장된 id로 cache에서 "Movie:1111" 이렇게 되어 있어서 Movie:${id}로 작성한 것이다.
			fragment: gql`
				fragment MovieFragment on Movie {
					isLiked
					rating
				}
			`,
			data: {
				isLiked: !data.movie.isLiked,
				rating: 10,
			},
		});
		// fragment의 안에는 수정할 필드명이 들어가 있어야 수정이 가능하다. 그리고 data에서 변경할 데이타를 넣어주면 된다.
	};
	return (
		<Container>
			<Column>
				<Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
				<Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
				<Button onClick={onClick}>
					{data?.movie?.isLiked ? "Unlike" : "Like"}
				</Button>
				<Description>{data?.movie?.description_full}</Description>
			</Column>
			<Image bg={data?.movie?.large_cover_image} />
		</Container>
	);
}
