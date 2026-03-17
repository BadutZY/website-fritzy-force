import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface NewsArticleProps {
  /** Banner/header image for the article */
  bannerImage: string;
  /** Article title */
  title: string;
  /** Category label (e.g. "Berita") */
  category: string;
  /** Author name */
  author: string;
  /** Publication date string */
  date: string;
  /** Article body content — use JSX for rich formatting */
  children: ReactNode;
}

const NewsArticleLayout = ({
  bannerImage,
  title,
  category,
  author,
  date,
  children,
}: NewsArticleProps) => {
  return (
    <div className="min-h-screen">
      {/* Header breadcrumb */}
      <section className="py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-garamond text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke News
          </Link>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-cinzel text-primary tracking-wider"
          >
            Cavallery News
          </motion.p>
        </div>
      </section>

      {/* Banner Image */}
      <section className="pb-8">
        <div className="container mx-auto px-6 lg:px-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden border border-border inline-block"
          >
            <img
              src={bannerImage}
              alt={title}
              className="max-h-[500px] w-auto object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Card */}
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-3xl bg-card border border-border rounded-2xl p-8 md:p-12"
          >
            {/* Title & Meta */}
            <h1 className="text-2xl md:text-4xl font-cinzel font-bold text-foreground mb-4">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-garamond mb-6">
              <span className="text-primary">{category}</span>
              <span>•</span>
              <span>Oleh {author}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
            <div className="w-full h-px bg-border mb-8" />

            {/* Body */}
            <div className="font-garamond text-lg text-muted-foreground leading-relaxed space-y-6 text-justify">
              {children}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsArticleLayout;
