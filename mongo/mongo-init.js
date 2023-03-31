db.getSiblingDB('admin').auth(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD
);
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