import NewsArticleLayout from "@/components/NewsArticleLayout";
import newsFreebies from "@/assets/another/news-freebies.jpg";

const NewsFreebiesPage = () => {
  return (
    <NewsArticleLayout
      bannerImage={newsFreebies}
      title="Pernyataan Publik Cavallery – Freebies Event SISTER REUNION"
      category="Berita"
      author="Cavallery"
      date="24 Oktober 2025"
    >
      <p>
        Sebagai bagian dari rangkaian dukungan Cavallery untuk Erine JKT48 dalam acara{" "}
        <strong>SISTER REUNION: JKT48 &amp; AKB48 Personal Meet &amp; Greet Festival</strong>,
        kami menyiapkan berbagai <strong>freebies spesial</strong> yang akan dibagikan secara
        gratis kepada pengunjung yang hadir di area event.
      </p>

      <p>
        Freebies yang disiapkan Cavallery terdiri dari beberapa jenis, mulai dari{" "}
        <strong>set utama Cavallery</strong> hingga{" "}
        <strong>freebies hasil kolaborasi dengan sejumlah fanbase dan pihak pendukung lainnya.</strong>
      </p>

      <p>
        Perlu diketahui bahwa <strong>isi dan jenis freebies dapat bervariasi</strong>, tidak
        terbatas pada yang ditampilkan dalam materi promosi, serta dapat berbeda tergantung{" "}
        <strong>ketersediaan dan stok di lokasi.</strong>
      </p>

      <p>
        Distribusi freebies akan dilakukan langsung oleh tim Cavallery di area event dengan
        sistem pembagian terbuka tanpa pembelian atau syarat khusus.
      </p>

      <p>
        Kami berharap inisiatif kecil ini dapat menjadi bentuk apresiasi dan kebersamaan untuk
        sesama penggemar Erine yang hadir di <em>SISTER REUNION</em>.
        Terima kasih atas antusiasme dan dukungan yang terus diberikan.
      </p>

      <p className="font-cinzel font-bold text-foreground">Cavallery</p>
    </NewsArticleLayout>
  );
};

export default NewsFreebiesPage;
