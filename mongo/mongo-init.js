db = db.getSiblingDB('wf-practice');
db.createUser(
	{
		user: "wf_user",
		pwd: "superSecretPassword",
		roles: [
			{
				role: "readWrite",
				db: "wf-practice"
			}
		]
	}
);