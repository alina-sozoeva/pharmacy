import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "antd";
import { Html5Qrcode } from "html5-qrcode";

import styles from "./HomePage.module.scss";
import clsx from "clsx";

export const HomePage = () => {
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();
  const qrRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  const startScanning = () => {
    if (!qrRef.current) return;

    html5QrCodeRef.current = new Html5Qrcode(qrRef.current.id);

    html5QrCodeRef.current
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText, decodedResult) => {
          // QR считан
          navigate(`${decodedText}`);
          stopScanning();
        },
        (errorMessage) => {
          console.warn(errorMessage);
        }
      )
      .catch((err) => {
        console.error("Ошибка запуска камеры:", err);
        setScanning(false);
      });
  };

  const stopScanning = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().finally(() => {
        html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
        setScanning(false);
      });
    }
  };

  useEffect(() => {
    if (scanning) startScanning();
    return () => stopScanning();
  }, [scanning]);

  return (
    <main>
      <div className={clsx(styles.doc, "container")}>
        <Flex
          className={clsx(styles.doc_add, "container")}
          align="center"
          justify="center"
          gap="small"
        >
          <button
            onClick={() => setScanning(true)}
            style={{ whiteSpace: "nowrap", display: "inline-block" }}
          >
            Отсканировать QR
          </button>
        </Flex>

        {scanning && (
          <div style={{ marginTop: 20 }}>
            <div
              id="reader"
              ref={qrRef}
              style={{ width: "100%", height: "400px" }}
            />
            <button onClick={stopScanning}>Отменить</button>
          </div>
        )}
      </div>
    </main>
  );
};
