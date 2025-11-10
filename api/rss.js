export default function handler(req, res) {
  // Exemple d’épisode statique
  const episode = {
    title: "Épisode test",
    description: "Épisode généré automatiquement via ChatGPT",
    audioUrl: "https://mon-fichier-audio.mp3", // Remplace par ton URL réelle
    audioLength: 123456, // Taille en octets
    guid: "episode-1",
    pubDate: new Date().toUTCString(),
    author: "Alex Codaura",
    explicit: "no"
  };

  // Flux RSS complet avec les balises obligatoires pour Anchor
  const rss = `
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Mon Podcast</title>
    <link>https://podcast-seven-liart.vercel.app</link>
    <description>Flux de mon podcast généré automatiquement</description>
    
    <!-- Illustration du podcast -->
    <image>
      <url>https://podcast-seven-liart.vercel.app/logoPodcast.png</url> <!-- Remplace par ton image de couverture -->
      <title>Hôtel Hebdo Insight</title>
      <link>https://podcast-seven-liart.vercel.app</link>
    </image>

    <!-- Infos iTunes obligatoires -->
    <itunes:author>${episode.author}</itunes:author>
    <itunes:owner>
      <itunes:name>${episode.author}</itunes:name>
      <itunes:email>automatisationaxc@gmail.com</itunes:email>
    </itunes:owner>
    <itunes:explicit>${episode.explicit}</itunes:explicit>

    <!-- Épisode -->
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
