import fs from "fs";
import path from "path";

export default function handler(req, res) {
  let episodes = [];

  // Lire le fichier JSON des épisodes
  try {
    const filePath = path.join(process.cwd(), "api/episodes.json");
    const data = fs.readFileSync(filePath, "utf-8");
    episodes = JSON.parse(data);
  } catch (e) {
    console.log("Aucun épisode trouvé ou erreur lors de la lecture du JSON.", e);
  }

  // Générer les items RSS dynamiquement
  const rssItems = episodes.map(ep => `
    <item>
      <title>${ep.title}</title>
      <description>${ep.description}</description>
      <enclosure url="${ep.audioUrl}" length="${ep.audioLength}" type="audio/mpeg"/>
      <guid>${ep.guid}</guid>
      <pubDate>${ep.pubDate}</pubDate>
      <itunes:author>${ep.author}</itunes:author>
      <itunes:explicit>${ep.explicit}</itunes:explicit>
    </item>
  `).join("\n");

  // Construire le flux RSS complet
  const rss = `
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Hôtel Hebdo Insight</title>
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

    ${rssItems}
  </channel>
</rss>
  `;

  res.setHeader("Content-Type", "application/rss+xml");
  res.status(200).send(rss);
}
