import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import newsFreebies from "@/assets/another/news-freebies.jpg";
import newsBirthday from "@/assets/another/news-birthday.png";

const ENABLE_NEWS = false;

const newsItems = [
  {
    image: newsFreebies,
    title: "Pernyataan Publik Cavallery – Freebies Event SISTER REUNION",
    author: "Cavallery",
    date: "Oktober 24, 2025",
    category: "Berita",
    excerpt:
      "Cavallery News Berita Terbaru Pernyataan Publik Cavallery – Freebies Event SISTER REUNION 24 Oktober...",
    link: "/news/freebies-sister-reunion",
    external: false,
  },
  {
    image: newsBirthday,
    title: "Pernyataan Publik Cavallery – Project Ulang Tahun Erine ke-18",
    author: "Cavallery",
    date: "September 8, 2025",
    category: "Berita",
    excerpt:
      "Cavallery News Berita Terbaru Pernyataan Publik Cavallery – Project Ulang Tahun Erine ke-18 8...",
    link: "/news/project-ultah-erine-18",
    external: false,
  },
];

const NewsPage = () => {
  return (
    <div className="min-h-screen">

      {/* Header */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-cinzel font-bold gradient-purple-text mb-2"
          >
            Berita Terbaru
          </motion.h1>

          <div className="w-24 h-1 gradient-purple rounded-full" />
        </div>
      </section>

      {!ENABLE_NEWS ? (
        <section className="pb-20">
          <div className="container mx-auto px-6 lg:px-16">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-border bg-card py-24 text-center shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-cinzel text-foreground">
                Belum ada berita
              </h2>
            </motion.div>

          </div>
        </section>
      ) : (

        <section className="pb-20">
          <div className="container mx-auto px-6 lg:px-16">

            <div className="space-y-8">

              {newsItems.map((news, i) => {

                const CardWrapper = news.external ? "a" : Link;

                const linkProps = news.external
                  ? { href: news.link, target: "_blank", rel: "noopener noreferrer" }
                  : { to: news.link };

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >

                    <CardWrapper
                      {...(linkProps as any)}
                      className="flex flex-col md:flex-row gap-6 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group"
                    >

                      <div className="md:w-64 flex-shrink-0">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>

                      <div className="p-6 flex flex-col justify-center">

                        <h2 className="text-xl font-cinzel font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                          {news.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-garamond mb-3">
                          <span>By {news.author}</span>
                          <span>•</span>
                          <span>{news.date}</span>
                          <span>•</span>
                          <span className="text-primary">{news.category}</span>
                        </div>

                        <p className="font-garamond text-muted-foreground mb-4 line-clamp-2">
                          {news.excerpt}
                        </p>

                        <span className="inline-block px-5 py-2 rounded-full gradient-purple text-primary-foreground font-cinzel text-sm w-fit">
                          Read More
                        </span>

                      </div>

                    </CardWrapper>

                  </motion.div>
                );
              })}

            </div>

          </div>
        </section>

      )}

    </div>
  );
};

export default NewsPage;