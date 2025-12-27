"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  X,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";

const fileTypes = ["PDF", "XPS", "DJVU", "POSTSCRIPT"];
const pricingStatus = ["No Idea", "Pricing Done", "Pricing Not Done"];

type FormState = {
  name: string;
  style: string;
  fileType: string;
  pricingStatus: string;
  proto: string;
};

type OverlayState = {
  type: "success" | "error";
  message: string;
} | null;

const Page = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    style: "",
    fileType: "",
    pricingStatus: "",
    proto: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [showProtoModal, setShowProtoModal] = useState(false);
  const [canCreateProto, setCanCreateProto] = useState(true);
  const [overlay, setOverlay] = useState<OverlayState>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [protos, setProtos] = useState<string[]>(["Proto 1", "Proto 2"]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "proto" && value === "__create__") {
      setShowProtoModal(true);
      setCanCreateProto(true);
      return;
    }

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof FormState] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(form);
  };

  const createNewProto = async () => {
    if (!canCreateProto) return;

    setCanCreateProto(false);
    setIsCreating(true);

    try {
      await new Promise((res, rej) =>
        setTimeout(() => {
          Math.random() > 0.5
            ? res(true)
            : rej("Proto creation failed. Try again.");
        }, 800)
      );

      const newProto = `Proto ${protos.length + 1}`;
      setProtos((prev) => [...prev, newProto]);
      setForm((prev) => ({ ...prev, proto: newProto }));

      setOverlay({
        type: "success",
        message: "Proto created successfully",
      });

      setTimeout(() => {
        setOverlay(null);
        setShowProtoModal(false);
        setCanCreateProto(true);
        setIsCreating(false);
      }, 800);
    } catch (err: any) {
      setOverlay({
        type: "error",
        message: err || "Something went wrong",
      });

      setTimeout(() => {
        setOverlay(null);
        setCanCreateProto(true);
        setIsCreating(false);
      }, 800);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow p-6">
        <div className="pt-6 px-4 max-w-xl">
          <h1 className="text-2xl font-semibold mb-6">File Upload</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Name" error={errors.name}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass(errors.name)}
              />
            </Field>

            <Field label="Choose Style" error={errors.style}>
              <input
                name="style"
                value={form.style}
                onChange={handleChange}
                className={inputClass(errors.style)}
              />
            </Field>

            <Field label="File Type" error={errors.fileType}>
              <SelectWrapper error={errors.fileType}>
                <select
                  name="fileType"
                  value={form.fileType}
                  onChange={handleChange}
                  className={selectClass(errors.fileType)}
                >
                  <option value="" disabled>
                    Select File Type
                  </option>
                  {fileTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </SelectWrapper>
            </Field>

            <Field label="Pricing Status" error={errors.pricingStatus}>
              <SelectWrapper error={errors.pricingStatus}>
                <select
                  name="pricingStatus"
                  value={form.pricingStatus}
                  onChange={handleChange}
                  className={selectClass(errors.pricingStatus)}
                >
                  <option value="" disabled>
                    Select Pricing Status
                  </option>
                  {pricingStatus.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </SelectWrapper>
            </Field>

            <Field label="Proto" error={errors.proto}>
              <SelectWrapper error={errors.proto}>
                <select
                  name="proto"
                  value={form.proto}
                  onChange={handleChange}
                  className={selectClass(errors.proto)}
                >
                  <option value="" disabled>
                    Select Proto
                  </option>
                  {protos.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                  <option value="__create__">+ Create New Proto</option>
                </select>
              </SelectWrapper>
            </Field>

            <button
              type="submit"
              className="h-10 px-6 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      {showProtoModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-4xl rounded-2xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b flex justify-between">
              <h3 className="font-semibold">Proto Variations</h3>
              <button
                onClick={() => {
                  setShowProtoModal(false);
                  setOverlay(null);
                }}
                disabled={isCreating}
                className="text-red-500"
              >
                <X />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {protos.map((p) => (
                  <div key={p} className="border rounded-xl p-3">
                    <span className="font-medium">{p}</span>
                    <div className="h-56 rounded-lg bg-gray-200 mt-2" />
                  </div>
                ))}

                {canCreateProto && !isCreating && (
                  <div
                    onClick={createNewProto}
                    className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                  >
                    <Plus size={40} />
                    <span className="font-semibold">
                      Create New Proto
                    </span>
                  </div>
                )}
              </div>
            </div>

            {isCreating && (
              <div className="absolute inset-0 z-20 bg-white">
                <div className="p-6 border-b animate-pulse">
                  <div className="h-4 w-40 bg-gray-300 rounded" />
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-pulse">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-72 bg-gray-300 rounded-xl"
                    />
                  ))}
                </div>
              </div>
            )}

            {overlay && (
              <div className="absolute inset-0 z-30 bg-black/40 flex items-center justify-center">
                <div
                  className={`w-90 rounded-2xl p-10 flex flex-col items-center gap-4 shadow-2xl text-white
                  ${
                    overlay.type === "success"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {overlay.type === "success" ? (
                    <CheckCircle size={72} />
                  ) : (
                    <XCircle size={72} />
                  )}
                  <h4 className="text-lg font-semibold text-center">
                    {overlay.message}
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">{label}</label>
    {children}
    <div className="h-4 text-xs text-red-500">{error}</div>
  </div>
);

const SelectWrapper = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) => (
  <div className="relative">
    {children}
    <ChevronDown
      className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
        error ? "text-red-500" : "text-gray-400"
      }`}
    />
  </div>
);

const baseInput =
  "h-10 w-full rounded-md border px-3 text-sm outline-none transition";

const inputClass = (error?: string) =>
  `${baseInput} ${
    error
      ? "border-red-500 focus:ring-2 focus:ring-red-400"
      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
  }`;

const selectClass = (error?: string) =>
  `${baseInput} appearance-none pr-10 ${
    error
      ? "border-red-500 focus:ring-2 focus:ring-red-400"
      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
  }`;

export default Page;
