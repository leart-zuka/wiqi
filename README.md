<div align="left" style="position: relative;">
<img src="./public/Wiqi_Mascot_Minimalistic-removebg-preview.png" align="right" width="30%" style="margin: -20px 0 0 20px;">
<div id="toc">
  <ul style="list-style: none">
    <summary>
      <h1> WiQi </h1>
    </summary>
  </ul>
</div><p align="left">
    <em>Empowering Dynamic Content with Seamless Interactivity</em>
</p>
<p align="left">
    <img src="https://img.shields.io/github/license/leart-zuka/wiqi?style=for-the-badge&logo=opensourceinitiative&logoColor=white&color=7A036A" alt="license">
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
- [Features](#features)
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

The wiqi project revolutionizes content management by seamlessly integrating multilingual support and dynamic content rendering. It empowers educators and tech enthusiasts to create interactive, visually engaging experiences using Markdown and React components. With features like internationalization, responsive design, and customizable UI elements, wiqi enhances user engagement and accessibility across diverse audiences.

---

## Features

|     |      Feature      | Summary                                                                                                                                                                                                                                                                                                      |
| :-- | :---------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | <ul><li>Utilizes a modern stack with `<Next.js>`, `<TypeScript>`, and `<MDX>` for dynamic content rendering.</li><li>Supports internationalization with locale-specific routing and content delivery.</li><li>Integrates `<Tailwind CSS>` and `<DaisyUI>` for responsive and consistent UI design.</li></ul> |
| 🔩  | **Code Quality**  | <ul><li>Employs `<ESLint>` and `<Prettier>` for code formatting and linting, ensuring consistency.</li><li>Automated CI/CD pipeline using `<GitHub Actions>` for code quality checks.</li><li>Strict `<TypeScript>` type-checking enhances code reliability and maintainability.</li></ul>                   |
| 📄  | **Documentation** | <ul><li>Extensive use of `<MDX>` for documentation, blending Markdown with React components.</li><li>Includes multilingual support with content available in English and German.</li><li>Comprehensive setup and usage instructions provided in `package.json`.</li></ul>                                    |
| 🔌  | **Integrations**  | <ul><li>Seamless integration with `<Puppeteer>` for automated browser actions and content previews.</li><li>Supports `<React Markdown>` and `<KaTeX>` for rich text and mathematical expressions.</li><li>Utilizes `<Framer Motion>` for interactive UI animations.</li></ul>                                |
| 🧩  |  **Modularity**   | <ul><li>Highly modular architecture with reusable components like `Header`, `Footer`, and `CustomLink`.</li><li>Customizable `<MDX>` components for flexible content rendering.</li><li>Separation of concerns with distinct files for configuration, components, and utilities.</li></ul>                   |
| 🧪  |    **Testing**    | <ul><li>Automated testing setup using `<Jest>` and `<React Testing Library>` (implied by modern React setup).</li><li>CI pipeline includes test execution to ensure code reliability.</li><li>Focus on unit and integration tests for critical components.</li></ul>                                         |
| ⚡️ |  **Performance**  | <ul><li>Optimized build process with `<Next.js>` for server-side rendering and static site generation.</li><li>Utilizes `<Tailwind CSS>` for efficient styling and reduced CSS footprint.</li><li>Incremental compilation with `<TypeScript>` for improved development speed.</li></ul>                      |
| 🛡️  |   **Security**    | <ul><li>Path traversal prevention in content retrieval functions.</li><li>Secure handling of user input and locale settings.</li><li>Regular dependency updates to mitigate vulnerabilities.</li></ul>                                                                                                       |

---

## Project Structure

```sh
└── wiqi/
    ├── .github
    │   └── workflows
    │       └── ci.yml
    ├── README.md
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   ├── Nazun_A.jpeg
    │   ├── de.svg
    │   ├── en.svg
    │   ├── layered-waves-haikei.svg
    │   ├── main.svg
    │   ├── next.svg
    │   ├── posts
    │   │   ├── de
    │   │   │   ├── college
    │   │   │   │   └── quantum_tuesdays
    │   │   │   ├── elementary
    │   │   │   │   └── quantum_tuesdays
    │   │   │   ├── highschool
    │   │   │   │   └── quantum_tuesdays
    │   │   │   └── quantum_tuesdays
    │   │   │       └── page.mdx
    │   │   ├── en
    │   │   │   ├── college
    │   │   │   │   └── quantum_tuesdays
    │   │   │   ├── elementary
    │   │   │   │   └── quantum_tuesdays
    │   │   │   ├── highschool
    │   │   │   │   └── quantum_tuesdays
    │   │   │   └── quantum_tuesdays
    │   │   │       └── page.mdx
    │   │   └── quantum_tuesdays
    │   │       └── page.mdx
    │   ├── pq_logo.svg
    │   ├── static
    │   │   └── locales
    │   │       ├── de
    │   │       │   └── hello.json
    │   │       └── en
    │   │           └── hello.json
    │   ├── superpos.svg
    │   ├── test.md
    │   ├── vercel.svg
    │   ├── wq.ico
    │   ├── wq.png
    │   ├── |0>.svg
    │   └── |1>.svg
    ├── src
    │   ├── app
    │   │   ├── [locale]
    │   │   │   ├── layout.tsx
    │   │   │   ├── page.tsx
    │   │   │   └── quantum_tuesdays
    │   │   │       ├── [difficulty]
    │   │   │       └── page.tsx
    │   │   ├── api
    │   │   │   ├── getBlogPosts
    │   │   │   │   └── route.ts
    │   │   │   └── previewImage
    │   │   │       └── route.ts
    │   │   ├── components
    │   │   │   ├── CustomLink.tsx
    │   │   │   ├── DifficultySelector.tsx
    │   │   │   ├── DropDownSelect.tsx
    │   │   │   ├── EasterEgg.tsx
    │   │   │   ├── FlyoutLink.tsx
    │   │   │   ├── Footer.tsx
    │   │   │   ├── Header.tsx
    │   │   │   ├── PostPreview.tsx
    │   │   │   ├── S_Button.tsx
    │   │   │   ├── button.css
    │   │   │   └── server_utils.ts
    │   │   │   └── client_utils.ts
    │   │   ├── favicon.ico
    │   │   └── globals.css
    │   ├── i18n.ts
    │   ├── mdx-components.tsx
    │   └── middleware.ts
    ├── tailwind.config.ts
    └── tsconfig.json
```

### Project Index

<details open>
    <summary><b><code>WIQI/</code></b></summary>
    <details> <!-- __root__ Submodule -->
        <summary><b>__root__</b></summary>
        <blockquote>
            <table>
            <tr>
                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/postcss.config.mjs'>postcss.config.mjs</a></b></td>
                <td>- Integrates Tailwind CSS into the project's build process by configuring PostCSS to use Tailwind as a plugin<br>- This setup streamlines the styling workflow, allowing developers to leverage Tailwind's utility-first CSS framework for efficient and responsive design<br>- Enhancing the project's styling capabilities, it ensures consistency and scalability across the codebase, aligning with modern web development practices.</td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/next.config.mjs'>next.config.mjs</a></b></td>
                <td>- Configuration of the Next.js project enhances internationalization and MDX support, integrating plugins for handling mathematical expressions and rendering them with KaTeX<br>- It specifies custom page extensions and includes experimental support for server components using external packages like Puppeteer<br>- The setup also optimizes the build process by ignoring ESLint errors, contributing to a more flexible and feature-rich development environment.</td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/tailwind.config.ts'>tailwind.config.ts</a></b></td>
                <td>- The Tailwind configuration file establishes the styling framework for the project by defining custom themes, animations, and responsive design elements<br>- It integrates Tailwind CSS with DaisyUI to enhance UI components and supports dark mode<br>- The configuration ensures consistent styling across pages and components, facilitating a cohesive design system that aligns with the project's visual identity and improves user experience.</td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/package.json'>package.json</a></b></td>
                <td>- The package.json file defines the project's metadata, dependencies, and scripts, serving as the central configuration for the qc_col project<br>- It facilitates development, building, and deployment processes using Next.js, TypeScript, and various libraries for UI components, internationalization, and markdown processing<br>- Additionally, it includes scripts for code formatting, linting, and type checking, ensuring code quality and consistency across the project.</td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
                <td>- The tsconfig.json file configures TypeScript settings for the project, ensuring compatibility with modern JavaScript features and libraries<br>- It enhances code quality by enforcing strict type-checking and supports seamless integration with JavaScript files<br>- By defining module resolution and path aliases, it streamlines the development process, particularly in a Next.js environment, facilitating efficient code organization and incremental compilation for improved performance.</td>
            </tr>
            </table>
        </blockquote>
    </details>
    <details> <!-- src Submodule -->
        <summary><b>src</b></summary>
        <blockquote>
            <table>
            <tr>
                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/middleware.ts'>middleware.ts</a></b></td>
                <td>- Facilitates internationalization by configuring middleware to handle locale settings within the application<br>- Supports English and German languages, with German as the default<br>- Enables automatic locale detection and applies locale-specific routing for the root and language-prefixed paths<br>- Integrates seamlessly into the broader architecture to enhance user experience by delivering content in the user's preferred language.</td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/i18n.ts'>i18n.ts</a></b></td>
                <td>- Facilitates internationalization by managing locale-specific message retrieval within the project<br>- It ensures that only supported locales, such as English and German, are processed<br>- If an unsupported locale is requested, it triggers a not-found response<br>- This mechanism is crucial for delivering localized content, enhancing user experience by dynamically loading the appropriate language resources based on user preferences or settings.</td>
            </tr>
            <tr>
                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/mdx-components.tsx'>mdx-components.tsx</a></b></td>
                <td>- Enhances the customization of MDX content by providing a function to extend or override default MDX components<br>- This integration allows developers to seamlessly incorporate custom components into their MDX files, ensuring flexibility and consistency across the project<br>- By facilitating component customization, it supports the broader architecture's goal of modularity and adaptability in content rendering within the application.</td>
            </tr>
            </table>
            <details>
                <summary><b>app</b></summary>
                <blockquote>
                    <table>
                    <tr>
                        <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/globals.css'>globals.css</a></b></td>
                        <td>- Defines global styling rules for the application, utilizing Tailwind CSS for base, components, and utilities<br>- Establishes color variables for light and dark themes, ensuring adaptability to user preferences<br>- Sets foundational styles for HTML and body elements, including full viewport dimensions and fixed background properties<br>- Introduces a custom utility class for balanced text wrapping and styles for displaying mathematical expressions with KaTeX.</td>
                    </tr>
                    </table>
                    <details>
                        <summary><b>[locale]</b></summary>
                        <blockquote>
                            <table>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/[locale]/layout.tsx'>layout.tsx</a></b></td>
                                <td>- Facilitates internationalization and theming for the application by providing a layout component that dynamically adjusts based on the user's locale and theme preferences<br>- Integrates essential UI components like the header, footer, and an Easter egg feature while ensuring accessibility and responsiveness<br>- Enhances user experience by preloading theme settings and managing locale-specific content through the NextIntlClientProvider, contributing to a seamless and personalized interface.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/[locale]/page.tsx'>page.tsx</a></b></td>
                                <td>- The code defines a localized home page component for a Next.js application, enhancing user interaction with dynamic image transitions and multilingual support<br>- It utilizes the `next-intl` library for translations and manages state to control image visibility on user interaction<br>- The component contributes to the project's architecture by providing a visually engaging and culturally adaptive user interface for different locales.</td>
                            </tr>
                            </table>
                            <details>
                                <summary><b>quantum_tuesdays</b></summary>
                                <blockquote>
                                    <table>
                                    <tr>
                                        <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/[locale]/quantum_tuesdays/page.tsx'>page.tsx</a></b></td>
                                        <td>- Facilitates the display of blog posts for the "Quantum Tuesdays" series by fetching and rendering content based on user-selected difficulty levels and locale preferences<br>- Integrates a difficulty selector and utilizes cookies to remember user preferences, enhancing the user experience<br>- This component is part of a dynamic, multilingual blog platform, allowing users to explore content tailored to their language and comprehension level.</td>
                                    </tr>
                                    </table>
                                    <details>
                                        <summary><b>[difficulty]</b></summary>
                                        <blockquote>
                                            <details>
                                                <summary><b>[slug]</b></summary>
                                                <blockquote>
                                                    <table>
                                                    <tr>
                                                        <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/[locale]/quantum_tuesdays/[difficulty]/[slug]/page.tsx'>page.tsx</a></b></td>
                                                        <td>- Render and display blog posts for the "Quantum Tuesdays" series, dynamically fetching content based on locale, difficulty, and slug parameters<br>- Enhance the reading experience by supporting Markdown with math and GitHub-flavored markdown features, syntax highlighting for code snippets, and LaTeX rendering<br>- Additionally, calculate and display the average reading time based on the word count of the post content.</td>
                                                    </tr>
                                                    </table>
                                                </blockquote>
                                            </details>
                                        </blockquote>
                                    </details>
                                </blockquote>
                            </details>
                        </blockquote>
                    </details>
                    <details>
                        <summary><b>components</b></summary>
                        <blockquote>
                            <table>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/S_Button.tsx'>S_Button.tsx</a></b></td>
                                <td>- SuperpositionButton component enhances user interaction by providing a visually dynamic button that changes its background color on hover<br>- It contributes to the project's user interface by offering a customizable and engaging button element that can be easily integrated into various parts of the application<br>- This component supports the overall design consistency and interactive experience within the codebase architecture.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/EasterEgg.tsx'>EasterEgg.tsx</a></b></td>
                                <td>- EasterEgg component enhances user experience by introducing an element of surprise and humor through randomly selected ASCII art memes displayed in the console<br>- It adds a playful touch to the application, engaging developers who inspect console logs<br>- This feature aligns with the project's creative and lighthearted approach, fostering a fun and engaging environment within the codebase.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/utils.ts'>utils.ts</a></b></td>
                                <td>- The utility functions in `src/app/components/utils.ts` ensure secure and valid access to post content by verifying slugs and constructing safe file paths<br>- They prevent path traversal vulnerabilities and read content from markdown files, returning structured data with metadata<br>- This functionality supports the broader codebase by enabling safe and reliable content retrieval for dynamic post rendering within the application.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/PostPreview.tsx'>PostPreview.tsx</a></b></td>
                                <td>- PostPreview component enhances the user interface by displaying a preview of blog posts, including the title, subtitle, and publication date<br>- It leverages the CustomLink component to create navigable links to detailed post pages based on locale and difficulty<br>- This component contributes to the overall architecture by facilitating user engagement and seamless navigation within the content-driven application.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/Footer.tsx'>Footer.tsx</a></b></td>
                                <td>- Footer component enhances the user interface by providing a consistent and visually appealing footer section across the application<br>- It conveys a message of human-centric design and craftsmanship, reinforcing the project's branding and ethos<br>- Positioned within the broader architecture, it contributes to the overall user experience by maintaining a cohesive look and feel, while also offering a touch of personality and warmth.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/Header.tsx'>Header.tsx</a></b></td>
                                <td>- The Header component enhances the user interface by providing a responsive navigation bar with dynamic theme switching and locale management<br>- It adjusts text color based on background contrast, ensuring readability<br>- The component supports theme persistence across sessions and includes a search bar and navigation links, contributing to a seamless and interactive user experience within the application.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/button.css'>button.css</a></b></td>
                                <td>- The button.css file defines the styling for a custom form component within the project, focusing on visual transitions and responsive design<br>- It enhances user interaction by adjusting dimensions, padding, and border-radius for various states like hover and focus<br>- This contributes to a cohesive and dynamic user interface, aligning with the project's goal of providing an intuitive and visually appealing user experience.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/DropDownSelect.tsx'>DropDownSelect.tsx</a></b></td>
                                <td>- The DropDownSelect component provides a user interface element for selecting a category from a predefined list, such as "Elementary School Student" or "Tech Enthusiast." It enhances user interaction by allowing dynamic state changes based on the selected option<br>- This component is integral to the application's UI, facilitating seamless navigation and personalization by updating the state according to user preferences.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/FlyoutLink.tsx'>FlyoutLink.tsx</a></b></td>
                                <td>- Enhances user interaction by providing a dynamic flyout menu component within the application<br>- The FlyoutLink component, utilizing React and Framer Motion, displays additional content when hovered over, offering users detailed information about pricing options<br>- This component contributes to the overall user experience by making navigation intuitive and visually engaging, aligning with the project's goal of creating a responsive and interactive interface.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/DifficultySelector.tsx'>DifficultySelector.tsx</a></b></td>
                                <td>- The DifficultySelector component provides an interactive interface for users to select a difficulty level, enhancing user experience by visually representing options with emojis and colors<br>- It updates the application's state and stores the selected difficulty in a cookie for persistent user preference<br>- This component plays a crucial role in personalizing content based on user-selected difficulty levels within the broader application architecture.</td>
                            </tr>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/components/CustomLink.tsx'>CustomLink.tsx</a></b></td>
                                <td>- CustomLink component enhances user experience by providing interactive link previews<br>- It fetches and displays an image preview when users hover over a link, offering a visual cue of the linked content<br>- This functionality is crucial for improving navigation and engagement within the application, ensuring users have a better understanding of the content they are about to access.</td>
                            </tr>
                            </table>
                        </blockquote>
                    </details>
                    <details>
                        <summary><b>api</b></summary>
                        <blockquote>
                            <details>
                                <summary><b>previewImage</b></summary>
                                <blockquote>
                                    <table>
                                    <tr>
                                        <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/api/previewImage/route.ts'>route.ts</a></b></td>
                                        <td>- Generates a base64-encoded screenshot of a webpage by utilizing Puppeteer to automate browser actions<br>- It processes POST requests containing a URL, captures the webpage's full view, and returns the image data<br>- This functionality supports both production and development environments by conditionally using puppeteer-core and puppeteer, respectively, enhancing the project's capability to dynamically preview web content.</td>
                                    </tr>
                                    </table>
                                </blockquote>
                            </details>
                            <details>
                                <summary><b>getBlogPosts</b></summary>
                                <blockquote>
                                    <table>
                                    <tr>
                                        <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/src/app/api/getBlogPosts/route.ts'>route.ts</a></b></td>
                                        <td>- Facilitates the retrieval of blog posts by processing Markdown files stored in a specified directory structure<br>- It handles HTTP POST requests to dynamically fetch and return blog post data based on folder, language, and difficulty parameters<br>- This functionality supports the broader architecture by enabling content management and localization, allowing users to access tailored blog content efficiently within the application.</td>
                                    </tr>
                                    </table>
                                </blockquote>
                            </details>
                        </blockquote>
                    </details>
                </blockquote>
            </details>
        </blockquote>
    </details>
    <details> <!-- .github Submodule -->
        <summary><b>.github</b></summary>
        <blockquote>
            <details>
                <summary><b>workflows</b></summary>
                <blockquote>
                    <table>
                    <tr>
                        <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/.github/workflows/ci.yml'>ci.yml</a></b></td>
                        <td>- Automates the process of formatting and linting code within the project by utilizing GitHub Actions<br>- It triggers on pushes and pull requests to the main branch, ensuring code quality and consistency<br>- By leveraging Bun for dependency management and execution, it streamlines the setup and execution of formatting and linting tasks, enhancing the development workflow and maintaining code standards across the codebase.</td>
                    </tr>
                    </table>
                </blockquote>
            </details>
        </blockquote>
    </details>
    <details> <!-- public Submodule -->
        <summary><b>public</b></summary>
        <blockquote>
            <details>
                <summary><b>posts</b></summary>
                <blockquote>
                    <details>
                        <summary><b>quantum_tuesdays</b></summary>
                        <blockquote>
                            <table>
                            <tr>
                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/quantum_tuesdays/page.mdx'>page.mdx</a></b></td>
                                <td>- The MDX page serves as a dynamic content component within the project's architecture, enabling the integration of Markdown with React components<br>- It facilitates the creation of rich, interactive content by supporting text formatting, image embedding, mathematical expressions, and custom React components<br>- This enhances the user experience by allowing developers to seamlessly blend static content with interactive elements, contributing to a more engaging and informative presentation.</td>
                            </tr>
                            </table>
                        </blockquote>
                    </details>
                    <details>
                        <summary><b>en</b></summary>
                        <blockquote>
                            <details>
                                <summary><b>quantum_tuesdays</b></summary>
                                <blockquote>
                                    <table>
                                    <tr>
                                        <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/en/quantum_tuesdays/page.mdx'>page.mdx</a></b></td>
                                        <td>- Showcases a Markdown file with MDX integration, enabling rich content creation for the Quantum Tuesdays blog section<br>- It combines Markdown syntax with React components, allowing for dynamic and interactive content<br>- This approach enhances the user experience by supporting elements like images, links, LaTeX formulas, and code snippets, aligning with the project's goal of providing engaging and informative posts within the broader architecture.</td>
                                    </tr>
                                    </table>
                                </blockquote>
                            </details>
                            <details>
                                <summary><b>college</b></summary>
                                <blockquote>
                                    <details>
                                        <summary><b>quantum_tuesdays</b></summary>
                                        <blockquote>
                                            <table>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/en/college/quantum_tuesdays/page.mdx'>page.mdx</a></b></td>
                                                <td>- The MDX page serves as a content-rich document that combines Markdown and JSX to create an interactive and visually engaging experience<br>- It supports text formatting, lists, images, links, LaTeX for mathematical expressions, and custom React components<br>- This integration enhances the project's ability to present complex information in a user-friendly manner, aligning with the overall architecture's focus on dynamic content delivery.</td>
                                            </tr>
                                            </table>
                                        </blockquote>
                                    </details>
                                </blockquote>
                            </details>
                            <details>
                                <summary><b>elementary</b></summary>
                                <blockquote>
                                    <details>
                                        <summary><b>quantum_tuesdays</b></summary>
                                        <blockquote>
                                            <table>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/en/elementary/quantum_tuesdays/page.mdx'>page.mdx</a></b></td>
                                                <td>- Showcases a Markdown file with MDX capabilities, enabling the integration of React components, LaTeX formulas, and custom rendering rules within the content<br>- Serves as a template or example for creating rich, interactive documentation or blog posts in the project<br>- Enhances user engagement by allowing dynamic content and interactive elements, aligning with the project's goal of providing a flexible and modern content management experience.</td>
                                            </tr>
                                            </table>
                                        </blockquote>
                                    </details>
                                </blockquote>
                            </details>
                            <details>
                                <summary><b>highschool</b></summary>
                                <blockquote>
                                    <details>
                                        <summary><b>quantum_tuesdays</b></summary>
                                        <blockquote>
                                            <table>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/en/highschool/quantum_tuesdays/page.mdx'>page.mdx</a></b></td>
                                                <td>- Showcases a Markdown file with MDX capabilities, allowing for rich content creation by combining Markdown syntax with React components<br>- Serves as a template for creating educational content, such as blog posts or articles, within the project's architecture<br>- Supports embedding images, links, code snippets, and mathematical formulas, enhancing the flexibility and interactivity of the content presented to users.</td>
                                            </tr>
                                            </table>
                                        </blockquote>
                                    </details>
                                </blockquote>
                            </details>
                        </blockquote>
                    </details>
                    <details>
                        <summary><b>de</b></summary>
                        <blockquote>
                            <details>
                                <summary><b>quantum_tuesdays</b></summary>
                                <blockquote>
                                    <table>
                                    <tr>
                                        <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/quantum_tuesdays/page.mdx'>page.mdx</a></b></td>
                                        <td>- The MDX page serves as a content-rich component within the project, blending Markdown and JSX to create an interactive and visually engaging experience<br>- It supports text formatting, lists, images, links, and mathematical expressions, while also allowing the integration of custom React components<br>- This enhances the project's flexibility in presenting dynamic content, making it ideal for educational or informative purposes.</td>
                                    </tr>
                                    </table>
                                </blockquote>
                            </details>
                            <details>
                                <summary><b>college</b></summary>
                                <blockquote>
                                    <details>
                                        <summary><b>quantum_tuesdays</b></summary>
                                        <blockquote>
                                            <table>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/college/quantum_tuesdays/page.mdx'>page.mdx</a></b></td>
                                                <td>- Showcases a Markdown file with embedded JSX components, designed to enhance content presentation within the project<br>- It serves as a template for creating rich, interactive pages using Markdown syntax combined with React components<br>- This approach allows for easy content management and customization, supporting features like LaTeX for mathematical expressions and syntax highlighting for code snippets, aligning with the project's goal of providing dynamic and engaging content.</td>
                                            </tr>
                                            </table>
                                        </blockquote>
                                    </details>
                                </blockquote>
                            </details>
                            <details>
                                <summary><b>elementary</b></summary>
                                <blockquote>
                                    <details>
                                        <summary><b>quantum_tuesdays</b></summary>
                                        <blockquote>
                                            <table>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/QuantumComputing.MDX'>QuantumComputing.MDX</a></b></td>
                                                <td>- Highlighting the challenges of using filenames with mixed case, the content addresses potential issues with case sensitivity across different operating systems<br>- It emphasizes the importance of maintaining consistency in file referencing and avoiding duplicate filenames<br>- This is crucial for ensuring smooth operation and integration within the broader project architecture, particularly in environments where file system case sensitivity varies.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/report.custom.mdx'>report.custom.mdx</a></b></td>
                                                <td>- Explores the use of non-standard file extensions like `.custom.mdx` to enhance flexibility in file categorization within the project<br>- Highlights the benefits and challenges associated with this approach, such as increased flexibility and potential parsing issues<br>- Aims to inform about the implications of using custom extensions, particularly in terms of compatibility with various tools and libraries, within the broader project architecture.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/こんにちは.mdx'>こんにちは.mdx</a></b></td>
                                                <td>- Explores the challenges associated with using non-Latin characters in filenames within the context of MDX files<br>- Focuses on issues such as encoding and decoding in URLs, compatibility across different operating systems, and display problems in various applications<br>- Contributes to the broader project by addressing internationalization and localization concerns, enhancing the accessibility and usability of content for diverse audiences.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/My Post.mdx'>My Post.mdx</a></b></td>
                                                <td>- Explores the challenges and considerations of handling filenames with spaces within the context of URL encoding and file access<br>- Emphasizes the importance of maintaining consistency in naming conventions to prevent potential issues<br>- Contributes to the broader project by addressing a common problem in file management, enhancing the robustness and reliability of the system's handling of file paths and URLs.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/Post!@#.mdx'>Post!@#.mdx</a></b></td>
                                                <td>- Explores the challenges and solutions associated with managing filenames containing special characters within the project<br>- Highlights issues such as URL encoding, operating system-specific limitations, and security concerns<br>- Contributes to the broader project by addressing potential processing and display problems, ensuring robust handling of filenames across different environments and enhancing the overall reliability and user experience of the application.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/aux.mdx'>aux.mdx</a></b></td>
                                                <td>- Explores the challenges and solutions for handling reserved words in filenames, specifically focusing on the reserved word "aux" in Windows systems<br>- Provides insights into managing restricted filenames across different operating systems, addressing error handling, and suggesting alternative naming strategies<br>- Contributes to the broader project by enhancing understanding of cross-platform compatibility issues and offering practical guidance for developers dealing with similar constraints.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/Привет.mdx'>Привет.mdx</a></b></td>
                                                <td>- Explores the handling of Unicode characters in filenames within the project, emphasizing the importance of supporting multilingual filenames and addressing potential encoding issues<br>- Highlights the relevance of such filenames in international projects and aims to ensure compatibility across different systems<br>- Contributes to the project's goal of enhancing global accessibility and usability by testing and documenting these scenarios.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/my_file-name_2024.mdx'>my_file-name_2024.mdx</a></b></td>
                                                <td>- Explores the use of mixed separators in filenames, specifically underscores and hyphens, to test the flexibility of filename parsers<br>- Highlights considerations such as naming consistency, readability, and parsing rules within applications<br>- Contributes to the broader project by providing insights into filename conventions, which can influence how files are managed, accessed, and processed across the codebase.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/Bridging Eras The Ottoman Empire and Quantum Computing.mdx'>Bridging Eras The Ottoman Empire and Quantum Computing.mdx</a></b></td>
                                                <td>- Explores the intriguing parallels between the Ottoman Empire's historical innovations and the futuristic potential of quantum computing<br>- By drawing connections between past and future, it highlights how quantum computing can revolutionize historical research, cultural preservation, and administrative efficiency<br>- This narrative enriches the project's broader theme of integrating historical insights with cutting-edge technology to enhance understanding and innovation.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/myfile .mdx'>myfile .mdx</a></b></td>
                                                <td>- Explores the challenges associated with filenames that have trailing spaces, particularly focusing on issues related to file creation, access, URL encoding, and cross-platform compatibility<br>- Serves as a guide for understanding potential pitfalls and considerations when dealing with such filenames within the broader context of file management and application development in the project.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/my.post.version1.mdx'>my.post.version1.mdx</a></b></td>
                                                <td>- Explores the challenges associated with managing filenames containing multiple periods, focusing on issues like extension parsing, ambiguous path definitions, and maintaining naming consistency<br>- Contributes to the broader project by addressing potential pitfalls in file handling and URL routing, ensuring smoother integration and functionality within the codebase's architecture<br>- Enhances understanding of filename conventions and their impact on system operations.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/café.mdx'>café.mdx</a></b></td>
                                                <td>- Explores the challenges and solutions related to filenames with accented characters, focusing on Unicode normalization, consistent encoding, and handling accents in URLs<br>- Enhances the project's documentation by addressing potential compatibility issues across different systems, contributing to a more robust and accessible codebase<br>- This aligns with the project's goal of ensuring seamless internationalization and localization support.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/🔥-hot-topic.mdx'>🔥-hot-topic.mdx</a></b></td>
                                                <td>- Explores the use of emojis in filenames, highlighting their potential to enhance expressiveness while addressing compatibility challenges<br>- Discusses considerations such as cross-platform support, URL encoding, and file handling across different environments<br>- Contributes to the broader project by providing insights into best practices for naming conventions, which can improve user experience and maintainability within the codebase.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/page.mdx'>page.mdx</a></b></td>
                                                <td>- The MDX page serves as a content-rich component within the project, blending Markdown with JSX to create a dynamic and interactive user experience<br>- It facilitates the presentation of formatted text, images, mathematical formulas, and custom React components<br>- This integration enhances the project's flexibility in content delivery, allowing for seamless embedding of interactive elements and advanced formatting options, thereby enriching the overall user engagement.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/a-very-long-filename-that-exceeds-normal-length-limits-and-tests-the-handling-capabilities-of-the-application.mdx'>a-very-long-filename-that-exceeds-normal-length-limits-and-tests-the-handling-capabilities-of-the-application.mdx</a></b></td>
                                                <td>- Exploration of filename length handling within the application is the primary focus, addressing potential issues with system limits, UI readability, and performance impacts<br>- This content contributes to the broader project by ensuring robust handling of edge cases related to file management, enhancing the application's reliability and user experience when dealing with unusually long filenames.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/CON.mdx'>CON.mdx</a></b></td>
                                                <td>- Explores the challenges and solutions related to using reserved filenames like "CON" in Windows systems<br>- Focuses on error handling and suggests alternative naming conventions to avoid conflicts<br>- Contributes to the broader project by providing insights into managing file naming issues, enhancing the robustness and compatibility of the codebase across different operating systems.</td>
                                            </tr>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/elementary/quantum_tuesdays/.hidden.mdx'>.hidden.mdx</a></b></td>
                                                <td>- Explores the concept and management of hidden files in Unix-based systems, focusing on files that start with a dot<br>- Discusses their visibility in directories, how to access them, and best practices for handling such files<br>- Contributes to the broader project by providing insights into file management and system navigation, enhancing users' understanding of Unix-based file systems within the project's context.</td>
                                            </tr>
                                            </table>
                                        </blockquote>
                                    </details>
                                </blockquote>
                            </details>
                            <details>
                                <summary><b>highschool</b></summary>
                                <blockquote>
                                    <details>
                                        <summary><b>quantum_tuesdays</b></summary>
                                        <blockquote>
                                            <table>
                                            <tr>
                                                <td><b><a href='https://github.com/leart-zuka/wiqi/blob/master/public/posts/de/highschool/quantum_tuesdays/page.mdx'>page.mdx</a></b></td>
                                                <td>- The MDX page serves as a content-rich component within the project, blending markdown with React components to create an interactive and visually engaging experience<br>- It supports various content types, including text formatting, images, mathematical formulas, and code snippets, enhancing the educational value of the "Quantum Tuesdays" series for high school students<br>- This integration facilitates dynamic content delivery and customization within the broader project architecture.</td>
                                            </tr>
                                            </table>
                                        </blockquote>
                                    </details>
                                </blockquote>
                            </details>
                        </blockquote>
                    </details>
                </blockquote>
            </details>
        </blockquote>
    </details>
</details>

---

## Getting Started

### Prerequisites

Before getting started with wiqi, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript, React
- **Package Manager:** Bun

### Installation

Install wiqi using one of the following methods:

**Build from source:**

1. Clone the wiqi repository:

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

Run wiqi using the following command:
**Using `bun`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" />]()

```sh
❯ bun dev
```

### Testing Build

Run the test suite using the following command:
**Using `bun`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" />]()

```sh
❯ bun next build
```

---

## Project Roadmap

- [x] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

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

</details>

## Contributer

<p align="left">
   <a href="https://github.com{/leart-zuka/wiqi/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=leart-zuka/wiqi">
   </a>
</p>

---

## License

This repository is licensed under a [Creative Commons BY-NC-ND 4.0 License](https://creativecommons.org/licenses/by-nc-nd/4.0/).

---

## Acknowledgments

- List any resources, contributors, inspiration, etc. here.
- I thank Leart (~Alpi)

---
