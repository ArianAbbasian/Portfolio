"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS_DATA, Project } from "@/constants/projects";

export default function ProjectsList() {
  const params = useParams();
  const locale = (params?.locale as "en" | "fa") || "fa";

  // متون ثابت برای دکمه‌ها بر اساس زبان فعال
  const labels = {
    en: {
      viewProject: "View Project",
      commercial: "Commercial",
      personal: "Lab Project",
    },
    fa: {
      viewProject: "مشاهده پروژه",
      commercial: "تجاری",
      personal: "پروژه شخصی",
    },
  }[locale];

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {/* ─── شبکه‌ی کارت‌های پروژه‌ها (Grid) ─── */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {PROJECTS_DATA.map((project: Project, index: number) => {
          // استخراج دیتای متناسب با زبان فعلی
          const data = project[locale];

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden rounded-3xl border border-border-subtle bg-background-glass p-4 backdrop-blur-xl transition-all duration-500 hover:border-accent-primary/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              style={{
                boxShadow:
                  "0 8px 32px 0 rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.03)",
              }}
            >
              {/* ─── بخش تصویر پروژه ─── */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900">
                {/* افکت لایه نوری روی تصویر هنگام هاور */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                <Image
                  src={project.image}
                  alt={data.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                  sizes="(max-w-768px) 100vw, 50vw"
                />

                {/* تگ وضعیت پروژه (تجاری / شخصی) */}
                <span
                  className={`absolute top-4 right-4 z-20 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase backdrop-blur-md ${
                    project.isCommercial
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  {project.isCommercial ? labels.commercial : labels.personal}
                </span>

                {/* سال پروژه */}
                <span className="absolute bottom-4 left-4 z-20 rounded-md bg-black/40 px-2.5 py-0.5 text-[10px] font-medium text-text-secondary backdrop-blur-sm border border-white/5">
                  {project.year}
                </span>
              </div>

              {/* ─── اطلاعات متنی پروژه ─── */}
              <div className="mt-5 px-2 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-accent-primary/80">
                    {data.category}
                  </span>
                </div>

                <h3 className="mt-2 text-xl font-bold text-text-primary transition-colors duration-300 group-hover:text-accent-primary">
                  {data.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2 min-h-[40px]">
                  {data.shortDescription}
                </p>

                {/* ─── لیست تکنولوژی‌ها (تگ‌های مینی‌مال) ─── */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {data.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-neutral-800/40 border border-white/[0.03] px-2 py-1 text-[11px] text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ─── دکمه اکشن (مشاهده جزئیات) ─── */}
                <div className="mt-6">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 text-xs font-semibold text-text-primary transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.1]">
                    {labels.viewProject}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
