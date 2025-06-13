import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "akazwz - Developer & Creator" },
		{
			name: "description",
			content:
				"Welcome to akazwz's personal website. Developer, creator, and tech enthusiast.",
		},
	];
}

export const handle = { hydrate: false };

export default function Home() {
	return (
		<div className="min-h-dvh flex items-center justify-center p-4">
			<div className="max-w-lg mx-auto text-center space-y-8">
				<div className="size-24 mx-auto rounded-full overflow-hidden border-2">
					<img
						src="/akazwz.webp"
						alt="akazwz avatar"
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Name and Title */}
				<div className="space-y-3">
					<h1 className="text-4xl font-bold">AKAZWZ</h1>
					<p className="text-lg">Developer & Creator</p>
				</div>

				{/* Social Links */}
				<div className="flex justify-center space-x-4">
					<a
						href="https://github.com/akazwz"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center space-x-2 px-4 py-2 rounded-lg"
					>
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-label="GitHub"
						>
							<title>GitHub</title>
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
						<span className="font-medium">GitHub</span>
					</a>

					<a
						href="https://twitter.com/akazwz_"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center space-x-2 px-4 py-2 rounded-lg"
					>
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-label="Twitter"
						>
							<title>Twitter</title>
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
						</svg>
						<span className="font-medium">Twitter</span>
					</a>
				</div>

				{/* Contact Button */}
				<div className="pt-4">
					<a
						href="https://twitter.com/akazwz_"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium"
					>
						<span>Let's Connect</span>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-label="Arrow right"
						>
							<title>Arrow right</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}
