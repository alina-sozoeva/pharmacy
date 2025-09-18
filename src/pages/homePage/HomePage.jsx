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

  const startScanning = async () => {
    if (!qrRef.current) return;

    html5QrCodeRef.current = new Html5Qrcode(qrRef.current.id);

    try {
      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 400 },
        (decodedText) => {
          navigate(`${decodedText}`);
          stopScanning();
        },
        (errorMessage) => {
          console.warn("QR error:", errorMessage);
        }
      );
      setScanning(true);
    } catch (err) {
      console.error("Ошибка запуска камеры:", err);
      alert(
        "Не удалось получить доступ к камере. Проверьте разрешения или используйте HTTPS."
      );
      html5QrCodeRef.current = null;
      setScanning(false);
    }
  };

  const stopScanning = async () => {
    if (!html5QrCodeRef.current) return;

    try {
      await html5QrCodeRef.current.stop();
    } catch (err) {
      console.warn("Сканер не был запущен или уже остановлен", err);
    } finally {
      html5QrCodeRef.current.clear();
      html5QrCodeRef.current = null;
      setScanning(false);
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
          </div>
        )}

        {scanning && (
          <div className={clsx("container", styles.create_btn_wrap)}>
            <button className={clsx(styles.create_btn)} onClick={stopScanning}>
              Отменить
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
