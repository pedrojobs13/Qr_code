import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import QRCodeStyling, { FileExtension, Options } from "qr-code-styling";

import styles from "@/styles/Home.module.css";

export default function Qrcode() {
  const [options, setOptions] = useState<Options>({
    width: 300,
    image: "",
    height: 300,
    dotsOptions: {
      color: "#000",
      type: "rounded",
    },
    imageOptions: {
      crossOrigin: "https://imgur.com",
      margin: 10,
    },
  });
  const [url, setUrl] = useState("");
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));

  function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    const imagem = event.target.value;
    setOptions((options) => ({
      ...options,
      image: imagem,
    }));
  }

  useEffect(() => {
    ref.current && qrCode.append(ref.current);
  }, [options]);

  useEffect(() => {
    qrCode.update({
      data: url,
      image: options.image,
    });
  }, [url, options.image]);

  function onDownloadClick() {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({ extension: fileExt as FileExtension });
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={options.image}
          placeholder="URL da imagem que deseja colocar no centro"
          onChange={onImageChange}
          className={styles.inputBox}
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.inputBox}
        />
        <select onChange={(e) => setFileExt(e.target.value)} value={fileExt}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <button onClick={onDownloadClick}>Baixar</button>
      </div>
      <div ref={ref} />
    </div>
  );
}
