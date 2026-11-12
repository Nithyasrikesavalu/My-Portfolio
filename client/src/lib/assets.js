// Finds real images/files by base filename. Missing files resolve to null and the UI shows a labelled fallback.
const found = import.meta.glob("../assets/**/*.{jpg,jpeg,png,webp,svg,pdf}", {
  eager: true,
  query: "?url",
  import: "default",
});

const findAsset = (baseName) => {
  const key = Object.keys(found).find((k) => {
    const m = /\/([^/]+)\.[a-z]+$/i.exec(k);
    return m && m[1].toLowerCase() === baseName.toLowerCase();
  });
  return key ? { url: found[key], ext: key.slice(key.lastIndexOf(".")) } : null;
};

export const profileImg = findAsset("profile")?.url ?? null;
export const profileHeroImg = findAsset("profile-hero")?.url ?? profileImg;
export const profileAboutImg = findAsset("profile-about")?.url ?? profileImg;

export const projectImages = {
  portfolio: findAsset("portfolio")?.url ?? null,
  botvortex: findAsset("botvortex")?.url ?? null,
  oneTap: findAsset("one_tap")?.url ?? null,
  coffee: findAsset("coffee_shop")?.url ?? null,
  employeeTasks: findAsset("employee_tasks")?.url ?? null,
  hostelReview: findAsset("hostel_review")?.url ?? null,
};

const cv = findAsset("Nithyasri_resume");
export const cvUrl = "/Nithyasri_resume.pdf" || cv?.url || null;
export const cvExt = ".pdf";
