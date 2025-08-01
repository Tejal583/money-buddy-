"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Upload, Check, AlertCircle } from "lucide-react";

type FileStatus = "idle" | "uploading" | "success" | "error";

interface UploadedFile {
  name: string;
  size: number;
  status: FileStatus;
  error?: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      status: "idle" as FileStatus,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
    },
    multiple: true,
  });

  const handleUpload = async (fileIndex: number) => {
    setFiles((prev) =>
      prev.map((file, index) =>
        index === fileIndex ? { ...file, status: "uploading" } : file
      )
    );

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setFiles((prev) =>
      prev.map((file, index) =>
        index === fileIndex ? { ...file, status: "success" } : file
      )
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Upload Statements</h1>
        <p className="text-gray-600">
          Upload your bank statements or transaction files for analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <Card className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 hover:border-indigo-500"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              {isDragActive
                ? "Drop your files here"
                : "Drag and drop your files here"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Or click to select files from your computer
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: PDF, CSV (Max size: 10MB)
            </p>
          </div>
        </Card>

        {/* Processing Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Processing Features</h2>
          <div className="space-y-4">
            {[
              "Automatic transaction categorization",
              "Merchant name normalization",
              "Duplicate detection",
              "Historical data comparison",
              "Custom category mapping",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <Card className="col-span-1 lg:col-span-2 p-6">
            <h2 className="text-lg font-semibold mb-4">Uploaded Files</h2>
            <div className="space-y-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border rounded-lg p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Upload className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {file.status === "error" && (
                      <div className="flex items-center text-red-600 text-sm gap-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{file.error}</span>
                      </div>
                    )}
                    <Button
                      onClick={() => handleUpload(index)}
                      disabled={
                        file.status === "uploading" || file.status === "success"
                      }
                    >
                      {file.status === "uploading" && "Uploading..."}
                      {file.status === "success" && "Processed"}
                      {file.status === "idle" && "Process"}
                      {file.status === "error" && "Retry"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Expense Categories Section */}
        <Card className="col-span-1 lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Add Your Expenses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Rent Expense */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Rent</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Enter rent amount"
                  className="border rounded-lg p-2 w-full"
                  min="0"
                />
              </div>
            </div>

            {/* Food Expense */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Food</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Enter food expenses"
                  className="border rounded-lg p-2 w-full"
                  min="0"
                />
              </div>
            </div>

            {/* Transport Expense */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Transport</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Enter transport costs"
                  className="border rounded-lg p-2 w-full"
                  min="0"
                />
              </div>
            </div>

            {/* Entertainment Expense */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Entertainment</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Enter entertainment costs"
                  className="border rounded-lg p-2 w-full"
                  min="0"
                />
              </div>
            </div>

            {/* Other Expense */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Other</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Enter other expenses"
                  className="border rounded-lg p-2 w-full"
                  min="0"
                />
              </div>
            </div>

            {/* Submit Button - spans full width on its own row */}
            <div className="md:col-span-2 lg:col-span-3">
              <Button className="w-full">
                Submit All Expenses
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
