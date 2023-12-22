import { Context } from '@aws-appsync/utils'

export function request(ctx: Context) {
	const assistant = ``
	const theme = ctx.args.theme
	const prompt = `Generate 10 words related to ${theme}. Put the words in an array. For example, if the theme was "animals", you would return ["monkey", "tiger", "bear", "lion", "gorilla", "bird", "penguin", "dolphin", "wolf", "dog"].`

	return {
		resourcePath: '/model/anthropic.claude-v2/invoke',
		method: 'POST',
		params: {
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				prompt: `\n\nHuman:${prompt}\n\nAssistant:${assistant}`,
				max_tokens_to_sample: 300,
				temperature: 0.5,
				top_k: 250,
				top_p: 1,
				stop_sequences: ['\\n\\nHuman:'],
			},
		},
	}
}

export function response(ctx: Context) {
	console.log('the bedrock response', ctx.result.body)
	return ctx.result.body
}
