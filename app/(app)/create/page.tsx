"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const msrTypes = [
  "PRINT DEVELOPMENT",
  "CHASE",
  "ALEX",
  "PERSONAL",
  "5/30 MSR",
  "4/30 MSR",
];

const categories = ["ACCESSORIES", "SKIRT", "PANT", "TOPS", "DRESS", "KNIT"];

type FormState = {
  styleName: string;
  msrType: string;
  jcNo: string;
  category: string;
  remark: string;
};

const Page = () => {
  const [form, setForm] = useState<FormState>({
    styleName: "",
    msrType: "",
    jcNo: "",
    category: "",
    remark: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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

    console.log("Form Data:", form);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300 p-6">
      <div className="pt-8 pb-24 px-4 md:ml-2.5">
        <div className="w-full md:w-95">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Create Style
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Style Name" error={errors.styleName}>
              <input
                name="styleName"
                value={form.styleName}
                onChange={handleChange}
                className={inputClass(errors.styleName)}
              />
            </Field>

            <Field label="MSR Type" error={errors.msrType}>
              <SelectWrapper error={errors.msrType}>
                <select
                  name="msrType"
                  value={form.msrType}
                  onChange={handleChange}
                  className={selectClass(errors.msrType)}
                >
                  <option value="" disabled>
                    Select MSR Type
                  </option>
                  {msrTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </Field>

            <Field label="JC No" error={errors.jcNo}>
              <input
                name="jcNo"
                value={form.jcNo}
                onChange={handleChange}
                className={inputClass(errors.jcNo)}
              />
            </Field>

            <Field label="Category" error={errors.category}>
              <SelectWrapper error={errors.category}>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={selectClass(errors.category)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </Field>

            <Field label="REMARK" error={errors.remark}>
              <textarea
                name="remark"
                value={form.remark}
                onChange={handleChange}
                rows={4}
                className={textareaClass(errors.remark)}
              />
            </Field>

            <div className="pt-2">
              <button
                type="submit"
                className="h-10 px-6 rounded-md bg-blue-600 text-white text-sm font-semibold
                hover:bg-blue-700 active:scale-[0.98] transition-transform"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
    <label className="text-sm font-medium text-gray-700">{label}</label>
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
      className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4
      ${error ? "text-red-500" : "text-gray-400"}`}
    />
  </div>
);

const baseInput =
  "h-10 w-full rounded-md border px-3 text-sm bg-white outline-none transition-all duration-150";

const inputClass = (error?: string) =>
  `${baseInput} ${
    error
      ? "border-red-500 focus:ring-2 focus:ring-red-400"
      : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  }`;

const selectClass = (error?: string) =>
  `${baseInput} appearance-none pr-10 shadow-sm hover:shadow-md focus:shadow-md ${
    error
      ? "border-red-500 focus:ring-2 focus:ring-red-400"
      : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  }`;

const textareaClass = (error?: string) =>
  `w-full rounded-md border px-3 py-2 text-sm resize-none outline-none transition-all duration-150 ${
    error
      ? "border-red-500 focus:ring-2 focus:ring-red-400"
      : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  }`;

export default Page;
