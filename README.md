<div align="left" style="position: relative;">
<img src="./public/static/logos/wiqi/Wiqi_Mascot_Minimalistic-removebg-preview.png" align="right" width="30%" style="margin: -20px 0 0 20px;">
<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h1> WiQi </h1>
      <h3> Explaining quantum technologies to everyone regardless of their background </h3> 
    </summary>
  </ul>
</div><p align="left">
    <em>Empowering Dynamic Content with Seamless Interactivity</em>
</p>
<p align="left">
    <img src="https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey?style=for-the-badge&logo=creativecommons&logoColor=white&color=7A036A" alt="license">
    <img src="https://img.shields.io/github/last-commit/leart-zuka/wiqi?style=for-the-badge&logo=git&logoColor=white&color=7A036A" alt="last-commit">
    <img src="https://img.shields.io/github/languages/top/leart-zuka/wiqi?style=for-the-badge&color=7A036A" alt="repo-top-language">
    <img src="https://img.shields.io/github/languages/count/leart-zuka/wiqi?style=for-the-badge&color=7A036A" alt="repo-language-count">
</p>
<p align="left">Built with the tools and technologies:</p>
<p align="left">
    <img src="https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm">
    <img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=for-the-badge&logo=PostCSS&logoColor=white" alt="PostCSS">
    <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black" alt="Prettier">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/Puppeteer-40B5A4.svg?style=for-the-badge&logo=Puppeteer&logoColor=white" alt="Puppeteer">
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black" alt="React">
    <br>
    <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=for-the-badge&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions">
    <img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white" alt="ESLint">
    <img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white" alt="Axios">
    <img src="https://img.shields.io/badge/DaisyUI-5A0EF8.svg?style=for-the-badge&logo=DaisyUI&logoColor=white" alt="DaisyUI">
</p>
</div>
<br clear="right">

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Project Structure](#project-structure)
  - [Project Index](#project-index)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing Build](#testing-build)
- [Project Roadmap](#project-roadmap)
- [Contributing](#contributing)
- [Contributer](#contributer)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

The WiQi is a project that aims at explaining quantum technologies and the physics behind them to everyone regardless of their background in physics or science, because we believe that you can only get excited about these new and upcoming technologies if you understand what makes them so special. With features like multilingual support, different knowledge levels, dynamic content rendering, responsive design, and customizable UI elemnts, WiQi ehances user engagement and accessibility across diverses audiences.

---

## Project Structure

<details closed>

```sh
├── bun.lockb
├── components.json
├── doc
│   ├── blogposts
│   │   ├── naming_scheme_of_blog_posts.md
│   │   └── writing_blog_posts.md
│   └── git-hooks
│       └── pre-push-hook.md
├── LICENSE
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── posts
│   │   ├── assets
│   │   ├── de
│   │   └── en
│   └── static
│       ├── flags
│       ├── locales
│       ├── logos
│       ├── map
│       └── squad
├── src
│   │
│   ├── api
│   │   ├── getBlogPosts
│   │   │   └── route.ts
│   │   └── previewImage
│   │       └── route.ts
│   ├── components
│   │   ├── button.css
│   │   ├── client_utils.ts
│   │   ├── CustomLink.tsx
│   │   ├── DifficultySelector.tsx
│   │   ├── DropDownSelect.tsx
│   │   ├── EasterEgg.tsx
│   │   ├── FlyoutLink.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── homepage
│   │   │   ├── DarkModeAwareBackground.tsx
│   │   │   ├── data
│   │   │   │   ├── de
│   │   │   │   │   └── cards.json
│   │   │   │   └── en
│   │   │   │       └── cards.json
│   │   │   └── FeaturedCard.tsx
│   │   ├── PostPreview.tsx
│   │   ├── QuantumMap.tsx
│   │   ├── S_Button.tsx
│   │   ├── server_utils.ts
│   │   └── useResizeObserverHeight.ts
│   ├── favicon.ico
│   ├── globals.css
│   └── [locale]
│       ├── about
│       │   └── page.tsx
│       ├── layout.tsx
│       ├── not-found.tsx
│       ├── page.tsx
│       ├── posts
│       │   └── [subfolder]
│       │       ├── [difficulty]
│       │       │   └── [slug]
│       │       │       ├── page.css
│       │       │       └── page.tsx
│       │       └── page.tsx
│       ├── quantum-map
│       │   └── page.tsx
│       └── [...rest]
│           └── page.tsx
│
├── tailwind.config.ts
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

</details>

## Getting Started

### Prerequesites:

Before getting started with wiqi, ensure your runtime environment meets the following requirements:

- Package Manager: [<img align="center" src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" />](https://bun.com/)

### Installation

1. Clone the WiQi repository:

```sh
❯ git clone https://github.com/leart-zuka/wiqi
```

2. Navigate to the project directory:

```sh
❯ cd wiqi
```

3. Install the project dependencies:

**Using `bun`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" />]()

```sh
❯ bun install
```

### Usage

Access the WiQi by running the following command:

```sh
❯ bun dev
```

### Testing Build

Run the test suite using the following command:

```sh
❯ bun next build
```

---

## Project Roadmap

Tbd

---

## Contributing

- **💬 [Join the Discussions](https://github.com/leart-zuka/wiqi/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/leart-zuka/wiqi/issues)**: Submit bugs found or log feature requests for the `wiqi` project.
- **💡 [Submit Pull Requests](https://github.com/leart-zuka/wiqi/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/leart-zuka/wiqi
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates (please make sure you use the following [commit guidelines](https://www.conventionalcommits.org)).
   ```sh
   git commit -m 'feat: Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Pull Request Guidelines</summary>

1. **Approval Requirement**: Before merging, your pull request must receive at least one approval from the appropriate reviewer.
2. **Self-Merge Policy**: Once your pull request is approved, you are responsible for merging or closing it yourself. Reviewers or other contributors should not merge/close it on your behalf.
3. **Merge Strategy**: Ensure your branch is up to date with the main branch before merging to avoid conflicts.
4. **Respect Review Feedback**: Address requested changes before merging to maintain code quality.
5. **Clean Up**: After merging, consider deleting your branch to keep the repository clean.
6. **Build Requiremenets**: This should go without saying, but make sure that your branch passes all checks pass.
7. **Blogpost Styling**: Make sure that when you're changing something on a blogpost, that you also build the project yourself ([check here](#installation)) and check if the blog post can be accessed and has the proper rendering of your images,quotes,formulas,etc. More infos can be found in the `doc` folder of this project.

</details>

## Contributers

<p align="left">
      <img src="https://contrib.rocks/image?repo=leart-zuka/wiqi">
</p>

---

## License

This repository is licensed under a [Creative Commons BY-NC-ND 4.0 License](https://creativecommons.org/licenses/by-nc-nd/4.0/).

---

## Acknowledgments

- I thank Leart (~Alpi)

---
