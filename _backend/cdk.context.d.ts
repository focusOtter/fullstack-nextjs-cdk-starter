export type CDKContext = {
	appName: string
	stage: string
	env: {
		account: string
		region: string
	}
	hosting: {
		branch: string
		ghTokenName: string
		ghOwner: string
		repo: string
	}
}
