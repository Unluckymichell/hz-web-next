"use client";
import mathOnlyEval from "@/Utils/mathOnlyEval";
import classNames from "classnames";
import { useMemo, useState } from "react";

type UploadProgress = {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "done" | "error" | "waiting";
  errorMsg: string;
};

export default function ImageUpload() {
  // Calculate the maximum upload size from environment variable or default value
  // Using mathOnlyEval to safely evaluate the expression
  // This allows for dynamic configuration of the maximum upload size
  const NEXT_PUBLIC_MAX_UPLOAD = useMemo(() => mathOnlyEval(
    process.env.NEXT_PUBLIC_MAX_UPLOAD || "512 * 1024 * 1024"
  ), []);

  const [progressList, setProgressList] = useState<UploadProgress[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files || []);
    setProgressList(
      fileList.map((file) => ({
        file,
        progress: 0,
        status: file.size > NEXT_PUBLIC_MAX_UPLOAD ? "error" : "waiting",
        errorMsg:
          file.size > NEXT_PUBLIC_MAX_UPLOAD
            ? `File is to large! Only ${NEXT_PUBLIC_MAX_UPLOAD / 1024 / 1024
            } MB allowed`
            : "",
      }))
    );
  };

  const uploadFile = async (file: File, index: number) => {
    return new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);

      xhr.open("POST", "/api/upload", true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgressList((prev) => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              progress: percent,
              status: "uploading",
            };
            return updated;
          });
        }
      };

      xhr.onload = function () {
        setProgressList((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            progress: 100,
            status: xhr.status === 200 ? "done" : "error",
            errorMsg: this.responseText,
          };
          return updated;
        });
        resolve();
      };

      xhr.onerror = function () {
        setProgressList((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            status: "error",
            errorMsg: this.responseText,
          };
          return updated;
        });
        resolve();
      };

      xhr.send(formData);
    });
  };

  const handleUploadAll = async () => {
    for (let i = 0; i < progressList.length; i++) {
      if (progressList[i].status != "error")
        await uploadFile(progressList[i].file, i);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        multiple
        onChange={handleFilesChange}
        className="mb-4 block border-1 p-2"
      />

      <button
        onClick={handleUploadAll}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        disabled={progressList.length === 0}
      >
        Hochladen starten
      </button>

      <div className="space-y-4">
        {progressList.map((item, index) => (
          <div key={index} className={classNames({
            "bg-red-500/15": item.status === "error"
          })}>
            <p className="text-sm mb-1">{item.file.name}</p>
            {item.status !== "waiting" && item.status !== "error" && (
              <progress
                value={item.progress}
                max="100"
                className="w-full h-4"
              />
            )}
            <p className="text-xs mt-1 text-gray-600">
              {item.status === "uploading" && "Wird hochgeladen..."}
              {item.status === "done" && "✅ Hochgeladen"}
              {item.status === "error" && "❌ Fehler beim Hochladen: "}
              {item.status === "error" && item.errorMsg}
              {item.status === "waiting" && "Warte auf Start"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
