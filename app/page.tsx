export default function Home() {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<img
					src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
					className="max-w-sm rounded-lg shadow-2xl"
					alt="spiderman pic"
				/>
				<div>
					<h1 className="text-5xl font-bold"> NextJS 🫶🏽 AppSync Todos!</h1>
					<p className="py-6">
						This is a sample app that uses NextJS 14, DaisyUI, and AWS Amplify
						libraries on the frontend. The backend is built with the AWS CDK and
						uses Amazon Cognito, AWS AppSync, and DynamoDB. This is a great
						starting app if wanting to build a real-world application that is
						ready to be deployed and extended!
					</p>
					<button className="btn btn-primary">Get Started</button>
				</div>
			</div>
		</div>
	)
}
