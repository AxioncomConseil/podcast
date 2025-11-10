export default function handler(req, res) {
  // Exemple d’épisode temporaire
  const episode = {
    title: "Épisode test",
    description: "Épisode généré automatiquement via ChatGPT",
    audioUrl: "https://podcast-seven-liart.vercel.app/api/audio/test.mp3", // à remplacer plus tard
    audioLength: 123456, // taille fictive, à mettre à jour automatiquement depuis n8n
    guid: "episode-1",
    pubDate: new Date().toUTCString(),
    author: "Axioncom Conseil",
    explicit: "no"
  };

  const rss = `
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Mon Podcast</title>
    <link>https://podcast-seven-liart.vercel.app</link>
    <description>Flux de mon podcast généré automatiquement</description>

    <!-- Illustration -->
    <image>
      <url>https://podcast-seven-liart.vercel.app/logoPodcast.png</url>
      <title>Mon Podcast</title>
      <link>https://podcast-seven-liart.vercel.app</link>
    </image>

    <!-- Infos iTunes obligatoires -->
    <itunes:author>Axioncom Conseil</itunes:author>
    <itunes:owner>
      <itunes:name>Axioncom Conseil</itunes:name>
      <itunes:email>automatisationaxc@gmail.com</itunes:email>
    </itunes:owner>
    <itunes:explicit>no</itunes:explicit>

    <!-- Épisode test -->
    <item>
      <title>${episode.title}</title>
      <description>${episode.description}</description>
      <enclosure url="${episode.audioUrl}" length="${episode.audioLength}" type="audio/mpeg"/>
      <guid>${episode.guid}</guid>
      <pubDate>${episode.pubDate}</pubDate>
      <itunes:author>${episode.author}</itunes:author>
      <itunes:explicit>${episode.explicit}</itunes:explicit>
    </item>
  </channel>
</rss>
  `;

  res.setHeader('Content-Type', 'application/rss+xml');
  res.status(200).send(rss);
}
