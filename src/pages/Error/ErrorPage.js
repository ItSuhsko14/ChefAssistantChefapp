import { useRouteError } from 'react-router-dom'

function ErrorPage () {
	const error = useRouteError();
	console.error(error);
	return (
			<div>
				<h1>Error page</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>{error.statusText || error.message} </p>
			</div>
		)
}

export default ErrorPage