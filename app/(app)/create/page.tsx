"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import axios from "axios";

type FormState = {
  styleName: string;
  msrId: number | "";
  jcNo: string;
  categoryId: number | "";
  remark: string;
};

type FormErrors = {
  styleName?: string;
  msrId?: string;
  jcNo?: string;
  categoryId?: string;
  remark?: string;
};

type MSRApiItem = {
  msr_id: number;
  msr_name: string;
  year: string;
};

type CategoryApiItem = {
  category_id: number;
  category_name: string;
};

const Page = () => {
  const [form, setForm] = useState<FormState>({
    styleName: "",
    msrId: "",
    jcNo: "",
    categoryId: "",
    remark: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [msrTypes, setMsrTypes] = useState<MSRApiItem[]>([]);
  const [categories, setCategories] = useState<CategoryApiItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
    };

    const fetchMsrTypes = async () => {
      const res = await axios.get(
        "http://128.100.10.210:8000/all-msr/",
        { headers }
      );
      setMsrTypes(res.data?.data || []);
    };

    const fetchCategories = async () => {
      const res = await axios.get(
        "http://128.100.10.210:8000/all-category/",
        { headers }
      );
      setCategories(res.data?.data || []);
    };

    fetchMsrTypes();
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "msrId" || name === "categoryId"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.styleName) newErrors.styleName = "This field is required";
    if (!form.msrId) newErrors.msrId = "This field is required";
    if (!form.jcNo) newErrors.jcNo = "This field is required";
    if (!form.categoryId) newErrors.categoryId = "This field is required";
    if (!form.remark) newErrors.remark = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("access_token");

    const payload = {
      name: form.styleName,
      jc_no: Number(form.jcNo),
      remark: form.remark,
      msr_id: form.msrId,
      category_id: form.categoryId,
    };

    try {
      setLoading(true);

      await axios.post(
        "http://128.100.10.210:8000/create-style/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Style created successfully");

      setForm({
        styleName: "",
        msrId: "",
        jcNo: "",
        categoryId: "",
        remark: "",
      });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
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

            <Field label="MSR Type" error={errors.msrId}>
              <SelectWrapper error={errors.msrId}>
                <select
                  name="msrId"
                  value={form.msrId}
                  onChange={handleChange}
                  className={selectClass(errors.msrId)}
                >
                  <option value="" disabled>
                    Select MSR Type
                  </option>
                  {msrTypes.map((m) => (
                    <option key={m.msr_id} value={m.msr_id}>
                      {m.msr_name}
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

            <Field label="Category" error={errors.categoryId}>
              <SelectWrapper error={errors.categoryId}>
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className={selectClass(errors.categoryId)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((c) => (
                    <option key={c.category_id} value={c.category_id}>
                      {c.category_name}
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
                disabled={loading}
                type="submit"
                className="h-10 px-6 rounded-md bg-blue-600 text-white text-sm font-semibold
                hover:bg-blue-700 active:scale-[0.98] transition-transform"
              >
                {loading ? "Saving..." : "Save"}
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
      className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
        error ? "text-red-500" : "text-gray-400"
      }`}
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