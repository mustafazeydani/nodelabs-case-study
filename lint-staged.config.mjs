import path from "path";

const buildEslintCommand = (filenames) => {
  const files = filenames
    .filter((f) => f.includes("/src/"))
    .map((f) => path.relative(process.cwd(), f))
    .join(" ");
  return `eslint --fix ${files}`;
};

const config = {
  "*.{ts,tsx}": [buildEslintCommand, "bash -c 'pnpm check-types'"],
  "*.{ts, tsx, js, jsx}": ["prettier --write"],
};

export default config;
