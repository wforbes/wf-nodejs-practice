import dotenv from 'dotenv'
import { setupServer } from 'src/infrastructure/rest/server'
import { setupDB } from 'src/infrastructure/db'

async function setup() {
	// TODO: resource handler and folders
	dotenv.config()
	await setupDB()
	await setupServer()
}

setup()