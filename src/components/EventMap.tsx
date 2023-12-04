import { useEffect, useState } from "react";

export default function YourComponent() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

   
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div className="lg:col-span-1 col-span-4 mt-4 h-full">
      <iframe
        className="col-span-4 sm:col-span-4 rounded-sm"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8181116.269949623!2d130.64039243803072!3d36.56179855912495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2s!4v1700468556527!5m2!1sen!2s"
        width="100%"
        height={isMobile ? 400 : 730}
        style={{ border: "0", maxWidth: "850px", margin: "auto" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
