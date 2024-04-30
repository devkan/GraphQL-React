import { 
	ApolloClient, 
	//gql, 
	InMemoryCache, 
} from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: new InMemoryCache(),
});

/*
apollo client connect test용 코드
gql에는 graphql query문을 넣어주면 됨

client
	.query({
		query: gql`
			{
				allMovies {
					title
				}
			}
		`,
	})
	.then((data) => console.log(data));
*/

export default client;
