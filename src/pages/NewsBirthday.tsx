import NewsArticleLayout from "@/components/NewsArticleLayout";
import newsBirthday from "@/assets/another/news-birthday.png";
import newsDoc from "@/assets/another/news-birthday.png";

const NewsBirthdayPage = () => {
  return (
    <NewsArticleLayout
      bannerImage={newsBirthday}
      title="Pernyataan Publik Cavallery – Project Ulang Tahun Erine ke-18"
      category="Berita"
      author="Cavallery"
      date="8 Oktober 2025"
    >
      <h2 className="text-xl font-cinzel font-bold text-foreground">1. Pendahuluan</h2>
      <p>
        Cavallery menyampaikan laporan terbuka mengenai hasil evaluasi dan tindak lanjut atas
        pengelolaan dana dalam project ulang tahun Erine ke-18. Langkah ini merupakan bentuk
        pertanggungjawaban dan komitmen Cavallery terhadap keterbukaan pengelolaan dana publik.
      </p>

      <h2 className="text-xl font-cinzel font-bold text-foreground">2. Kronologi</h2>
      <p>
        Pada <strong>Juli 2025</strong>, Ahmad Teguh Purnama selaku{" "}
        <strong>ketua pelaksana project</strong> mengajukan permintaan pencairan dana sebesar{" "}
        <strong>Rp17.300.000</strong> dari kas fanbase dengan alasan pembayaran videotron. Dari
        jumlah tersebut, <strong>Rp17.300.000</strong> diajukan untuk biaya sewa videotron yang
        seharusnya hanya <strong>Rp16.652.500</strong> dengan alasan pembulatan, serta tambahan{" "}
        <strong>Rp300.000</strong> untuk biaya operasional (yang pada akhirnya tidak digunakan).
      </p>
      <p>
        Namun, dana yang telah dicairkan tersebut{" "}
        <strong>tidak disalurkan sesuai peruntukan</strong> dan justru digunakan untuk kepentingan
        pribadi. Sebagai langkah penyelamatan kegiatan, biaya videotron akhirnya{" "}
        <strong>ditutup menggunakan profit dari penjualan merchandise</strong>, sehingga project
        ulang tahun tetap dapat terlaksana sesuai rencana.
      </p>

      <h2 className="text-xl font-cinzel font-bold text-foreground">3. Tindak Pertanggungjawaban</h2>
      <p>
        Sebagai tindak lanjut resmi, pada <strong>26 September 2025</strong>, pihak Cavallery
        bersama saksi telah melakukan{" "}
        <strong>penandatanganan surat perjanjian pengembalian dana</strong> dengan pihak yang
        bersangkutan. Dana sebesar <strong>Rp17.300.000</strong> kini tercatat sebagai{" "}
        <strong>kewajiban pengembalian</strong>, dengan target pelunasan maksimal{" "}
        <strong>Maret 2026</strong>. Progres penyelesaian pengembalian dana akan diperbarui secara
        berkala melalui thread resmi Cavallery di platform X (Twitter) agar publik dapat terus
        mengikuti perkembangannya secara transparan.
      </p>
      <p>
        Cavallery juga menegaskan bahwa{" "}
        <strong>
          Ahmad Teguh Purnama tidak lagi menjadi bagian dari kepengurusan maupun anggota Cavallery
        </strong>
        . Kasus ini merupakan penyalahgunaan kepercayaan secara pribadi; sistem pengelolaan
        keuangan Cavallery sejak awal telah menggunakan{" "}
        <strong>mekanisme pembayaran langsung kepada vendor resmi</strong> sesuai invoice tanpa
        perantara.
      </p>
      <p>
        Seluruh informasi dan laporan keuangan telah lebih dahulu disampaikan melalui{" "}
        <strong>Laporan Pertanggungjawaban (LPJ) kepada donatur</strong>, dilanjutkan dengan{" "}
        <strong>rapat internal bersama anggota</strong>, dan kini dipublikasikan secara terbuka
        untuk publik.
      </p>

      <h2 className="text-xl font-cinzel font-bold text-foreground">4. Penutup</h2>
      <p>
        Cavallery mengucapkan terima kasih kepada seluruh pihak yang telah memberikan dukungan,
        kepercayaan, dan pengertian selama proses penyelesaian ini berlangsung.
      </p>

      <p className="font-cinzel font-bold text-foreground">Cavallery</p>

      {/* Documentation image */}
      <div className="rounded-xl overflow-hidden border border-border mt-4">
        <img
          src={newsDoc}
          alt="Dokumentasi penandatanganan surat pengembalian dana"
          className="w-full object-cover"
        />
      </div>
      <p className="text-sm text-muted-foreground italic">
        Dokumentasi resmi penandatanganan surat pengembalian dana Cavallery, dilakukan pada 26
        September 2025 sebagai bentuk tindak lanjut dan transparansi publik.
      </p>
    </NewsArticleLayout>
  );
};

export default NewsBirthdayPage;
