export default function handler(req, res) {
  const rss = `
<rss version="2.0">
  <channel>
    <title>Mon Podcast</title>
    <link>https://my-podcast.vercel.app</link>
    <description>Flux de mon podcast généré automatiquement</description>
    <item>
      <title>Épisode test</title>
      <description>Épisode généré automatiquement via ChatGPT</description>
      <enclosure url="https://mon-fichier-audio.mp3" length="123456" type="audio/mpeg"/>
      <guid>episode-1</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>
  `;
  res.setHeader('Content-Type', 'application/rss+xml');
  res.status(200).send(rss);
}
