// https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
	apps: [{
		name: 'wf-nodejs-practice',
		script: 'npm run start:pm2',
		instances: 1,
		autorestart: true,
		time: true,
		merge_logs: true,
		ignore_watch: ['node_modules'],
		watch_options: {
			followSymlinks: true
		},
		error_file: 'logs/errors/error.log',
		max_memory_restart: '4G',
		env_test: {
			WF_ENVIRONMENT: 'test'
		}
	}]
}