import sharp from "sharp";
import path from "node:path";

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

export async function loader() {
	const filePath = path.join(process.cwd(), "public", "akazwz.webp");
	const targetCols = 50; // 字符列数（可调整）

	const charAspect = 2; // 字符高 / 字符宽（等宽字体约为 2:1）
	const resizeW = targetCols;
	// 让可视宽高相等：resizeH * charHeight / 2 ≈ resizeW * charWidth
	// => resizeH = resizeW * 2 / charAspect
	const resizeH = Math.round((resizeW * 2) / charAspect);

	// 使用 sharp 调整尺寸并获取原始 RGBA 数据
	const { data, info } = await sharp(filePath)
		.resize(resizeW, resizeH, { fit: "cover", position: "centre" })
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });

	const { width: imgWidth, height: imgHeight, channels } = info;
	const rows: string[] = [];

	const toHex = (r: number, g: number, b: number) =>
		`#${((1 << 24) + (r << 16) + (g << 8) + b)
			.toString(16)
			.slice(1)}`;

	for (let y = 0; y < imgHeight - 1; y += 2) {
		let line = "";
		let prevFg = "";
		let prevBg = "";
		let runBuffer = "";
		const flush = () => {
			if (runBuffer) {
				line += `<span style="color:${prevFg};background-color:${prevBg}">${runBuffer}</span>`;
				runBuffer = "";
			}
		};

		for (let x = 0; x < imgWidth; x++) {
			const topIdx = (y * imgWidth + x) * channels;
			const bottomIdx = ((y + 1) * imgWidth + x) * channels;

			const [rt, gt, bt] = data.subarray(topIdx, topIdx + 3);
			const [rb, gb, bb] = data.subarray(bottomIdx, bottomIdx + 3);

			const fg = toHex(rt, gt, bt);
			const bg = toHex(rb, gb, bb);

			if (fg === prevFg && bg === prevBg) {
				runBuffer += "▀";
			} else {
				flush();
				prevFg = fg;
				prevBg = bg;
				runBuffer = "▀";
			}
		}
		flush();
		rows.push(line);
	}

	const ascii = rows.join("<br/>");
	return { ascii };
}

export const handle = { hydrate: false };

export default function Home({ loaderData }: Route.ComponentProps) {
	const { ascii } = loaderData;
	return (
		<div className="min-h-dvh flex items-center justify-center p-4">
			<div className="max-w-lg mx-auto text-center space-y-8">
				<pre
					className="text-[clamp(2px,1vw,6px)] leading-none font-mono whitespace-pre overflow-hidden"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: 已确认数据安全，直接插入 HTML
					dangerouslySetInnerHTML={{ __html: ascii }}
				/>
				{/* 名称与标题 */}
				<div className="space-y-3">
					<h1 className="text-4xl font-bold">AKAZWZ</h1>
					<p className="text-lg">Developer & Creator</p>
				</div>
			</div>
		</div>
	);
}
