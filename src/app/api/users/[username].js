const users = async (req, res) => {

	const { username } = req.query;

	// Send a GET request to the GitHub API to retrieve user data for the specified username.
	const response = await fetch('https://api.github.com/users/' + username, {
		headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
	});
	const data = await response.json();

	return res.status(200).json(data);
};

export default users;