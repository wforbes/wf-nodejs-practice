import dotenv from 'dotenv'
import { setupServer } from 'src/infrastructure/rest/server'

async function setup() {
	// TODO: resource handler and folders
	dotenv.config()
	// TODO: database with typeorm
	await setupServer()
}

setup()