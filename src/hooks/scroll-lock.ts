import { useEffect, useRef } from "react";

/**
 * useScrollLock — mengunci scroll body saat modal/lightbox terbuka.
 *
 * Setiap kali isLocked berubah menjadi true, posisi scroll SAAT ITU
 * disimpan ke ref. Saat isLocked kembali false, posisi tersebut
 * di-restore secara instan tanpa animasi agar halaman tidak loncat.
 *
 * Bug yang diperbaiki:
 * - scrollYRef tidak lagi di-reset di cleanup, sehingga nilai selalu
 *   fresh sesuai posisi pengguna saat modal paling terakhir dibuka.
 */
const useScrollLock = (isLocked: boolean) => {
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (isLocked) {
      // Capture posisi scroll SEKARANG, setiap kali modal dibuka
      scrollYRef.current = window.scrollY;

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Baca nilai yang sudah di-capture saat modal terakhir dibuka
      const targetScrollY = scrollYRef.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";

      // Restore ke posisi yang benar tanpa animasi
      window.scrollTo({ top: targetScrollY, behavior: "instant" as ScrollBehavior });

      // JANGAN reset scrollYRef di sini — biarkan ref menyimpan nilai
      // terakhir sampai modal berikutnya dibuka dan menimpanya
    }
  }, [isLocked]);
};

export default useScrollLock;