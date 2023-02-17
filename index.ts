import dotenv from 'dotenv'
import { setupServer } from 'src/infrastructure/rest/server'

async function setup() {
	dotenv.config()
	await setupServer()
}

setup()