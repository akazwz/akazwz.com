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

	// 读取原图尺寸以保持纵横比
	const { width: srcW = 1, height: srcH = 1 } = await sharp(filePath).metadata();

	// 字符几何：常见等宽字体字符高约为宽的 2 倍 (k=2)
	// 每个字符同时表示上下两行像素，需要补偿高度
	// 因此最终高度按 2/k 系数缩放以保持比例
	const resizeW = targetCols;
	const charAspect = 1.7; // 经验系数 k = 字符高 / 字符宽，可根据字体微调
	const resizeH = Math.round((srcH / srcW) * resizeW * 2 / charAspect);

	// 使用 sharp 调整尺寸并获取原始 RGBA 数据
	const { data, info } = await sharp(filePath)
		.resize(resizeW, resizeH)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });

	const { width: imgWidth, height: imgHeight, channels } = info;
	const rows: string[] = [];

	// 每次取两行像素合成一个 '▀' 半块字符
	for (let y = 0; y < imgHeight - 1; y += 2) {
		let line = "";
		for (let x = 0; x < imgWidth; x++) {
			const topIdx = (y * imgWidth + x) * channels;
			const bottomIdx = ((y + 1) * imgWidth + x) * channels;

			const [rt, gt, bt] = data.slice(topIdx, topIdx + 3);
			const [rb, gb, bb] = data.slice(bottomIdx, bottomIdx + 3);

			const fg = `rgb(${rt},${gt},${bt})`;
			const bg = `rgb(${rb},${gb},${bb})`;

			line += `<span style="color:${fg};background-color:${bg}">▀</span>`;
		}
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
					className="text-[6px] leading-none font-mono whitespace-pre overflow-hidden"
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
