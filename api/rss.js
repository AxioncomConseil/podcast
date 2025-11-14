import fs from "fs";
import path from "path";

export default function handler(req, res) {
  let episodes = [];
  
  try {
    const filePath = path.join(process.cwd(), "api/episode.json");
    const data = fs.readFileSync(filePath, "utf-8");
    episodes = JSON.parse(data);
  } catch (e) {
    console.log("Aucun épisode trouvé ou erreur lors de la lecture du JSON.", e);
  }

  const rssItems = episodes.map(ep => {
    // Calcul de la durée en secondes depuis audioLength (en octets)
    // Estimation: 128 kbps MP3 ≈ 16000 octets/seconde
    const durationSeconds = Math.round(ep.audioLength / 16000);

    return `
    <item>
      <title>${ep.title}</title>
      <link>https://podcast-seven-liart.vercel.app</link>
      <description>${ep.description}</description>
      <enclosure url="${ep.audioUrl}" length="${ep.audioLength}" type="audio/mpeg"/>
      <guid isPermaLink="false">${ep.guid}</guid>
      <pubDate>${ep.pubDate}</pubDate>
      <itunes:author>${ep.author}</itunes:author>
      <itunes:summary>${ep.description}</itunes:summary>
      <itunes:explicit>${ep.explicit}</itunes:explicit>
      <itunes:duration>${durationSeconds}</itunes:duration>
    </item>
  `;
  }).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:podcast="https://podcastindex.org/namespace/1.0"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hôtel Hebdo Insight</title>
    <link>https://podcast-seven-liart.vercel.app</link>
    <description>Veille stratégique hebdomadaire pour l'industrie hôtelière française. Chaque vendredi, découvrez l'essentiel des actualités, tendances et innovations du secteur.</description>
    <language>fr-FR</language>
    <copyright>© ${new Date().getFullYear()} Axioncom Conseil</copyright>

    <atom:link href="https://podcast-seven-liart.vercel.app/api/rss" rel="self" type="application/rss+xml"/>

    <image>
      <url>https://podcast-seven-liart.vercel.app/logoPodcast.png</url>
      <title>Hôtel Hebdo Insight</title>
      <link>https://podcast-seven-liart.vercel.app</link>
    </image>

    <itunes:author>Axioncom Conseil</itunes:author>
    <itunes:summary>Veille stratégique hebdomadaire pour l'industrie hôtelière française. Chaque vendredi, découvrez l'essentiel des actualités, tendances et innovations du secteur.</itunes:summary>
    <itunes:explicit>no</itunes:explicit>
    <itunes:owner>
      <itunes:name>Axioncom Conseil</itunes:name>
      <itunes:email>automatisationaxc@gmail.com</itunes:email>
    </itunes:owner>
    <itunes:image href="https://podcast-seven-liart.vercel.app/logoPodcast.png"/>
    <itunes:category text="Business">
      <itunes:category text="Management"/>
    </itunes:category>

    <podcast:guid>hotel-hebdo-insight-axioncom</podcast:guid>
    <podcast:locked>yes</podcast:locked>
    
${rssItems}
  </channel>
</rss>`;

  // ✅ LE FIX EST ICI
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.status(200).send(rss);
}