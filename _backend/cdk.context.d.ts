export type CDKContext = {
	appName: string
	stage: string
	branch: string
	env: {
		account: string
		region: string
	}
	hosting: {
		ghTokenName: string
		ghOwner: string
		repo: string
	}
}
