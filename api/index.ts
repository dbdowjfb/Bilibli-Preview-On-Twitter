
// Assuming this function is part of a server-side code and 'request' is an instance of Request
export async function GET(request) {
	const id = request.url.split("/").pop();
	const video = `https://player.bilibili.com/player.html?bvid=${id}`;
	// get the thumbnail image
	const response = (await (await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${id}`)).json());
	const thumbnail = response.data.pic;
	const title = response.data.title;
	const description = response.data.desc;
	// TODO. download the thumbnail image and save to cache
	
	console.log(thumbnail);
	const page =  ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bilibili Twitter Card Preview </title>
    <!-- Twitter Card meta tags -->
    <meta name="twitter:card" content="player">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:image" content="${thumbnail}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:player" content="${video}">
    <meta name="twitter:player:width" content="600">
    <meta name="twitter:player:height" content="400">
    <meta name="twitter:player:stream" content="${video}">
    <meta name="twitter:player:stream:content_type" content="video/mp4">
<style>
body {
	font-family: Arial, sans-serif;
	display: grid;
	justify-content: center;
	grid-gap: 20px;

}																	
	h1 {
		color: #333;
	}	
		
 button {
    padding: 10px 20px;
	width: 10rem;
	background-color: #4CAF50;
	color: white;
	border: none;
	cursor: pointer;
	border-radius: 5px;
}
button:hover {
	background-color: #45a049;
}

</style>
</head>
<body>
    <h1>复制分享本页链接即可在分享到推特时显示 Bilibili 视频 <code> ${id} </code> 的标题、简介、视频和封面的预览!</h1>
	<h2 class='bilibi-title'> 视频标题: ${title} </h2>
	<p> 视频简介:${description} </p>
	<button>复制本页链接</button>
	<pre> Bilibili 原地址链接: https://bilibili.com/${id} </pre>
	<script>
		const text = "已复制 !";
		// copy link to clipboard
		document.querySelector("button").addEventListener("click", () => {
			navigator.clipboard.writeText(location.href);
			document.querySelector("button").textContent = text;
		});														
		</script>
</body>
</html>
`
return new Response(page, {
	headers: {
		"content-type": "text/html;charset=UTF-8",
	},
});

}