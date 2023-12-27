import { FaSquareXTwitter, FaLinkedin, FaSquareYoutube } from 'react-icons/fa6'

function Footer() {
	return (
		<footer className="footer items-center p-4 bg-neutral text-neutral-content">
			<aside className="items-center grid-flow-col">
				<p>
					Made with ❤️ by{' '}
					<a
						className=" font-bold link link-hover hover:text-gray-700 transition-colors duration-300 bold"
						href="https://focusotter.com"
						target="_blank"
					>
						Focus Otter
					</a>
				</p>
			</aside>
			<nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
				<a
					href="https://twitter.com/intent/follow?screen_name=focusotter"
					target="_blank"
				>
					<FaSquareXTwitter
						size={'2em'}
						className="text-black hover:text-gray-700 transition-colors duration-300"
					/>
				</a>
				<a href="https://www.linkedin.com/in/focusotter" target="_blank">
					<FaLinkedin
						size={'2em'}
						className="text-black hover:text-blue-500 transition-colors duration-300"
					/>
				</a>
				<a href="https://www.youtube.com/focusotter?sub_confirmation=1">
					<FaSquareYoutube
						size={'2em'}
						className="text-black hover:text-red-500 transition-colors duration-300"
					/>
				</a>
			</nav>
		</footer>
	)
}

export default Footer
