# slam-react-basic

Favorite React Template and setup by Slam. This Web Application Template was configured for basic React Scripting with some knowledge of certain libraries/frameworks.

## Packages

The main packages are listed as follows:

- React Typescript
- SASS/SCSS
- React Redux/Redux Toolkit
- *(No bootstrap and bootstrap icons for full customizability)*

## Folder Structure

Here are the necesarry files listed in the folder as a structure visualied below:

```css
src/
├── App.tsx
├── index.tsx
├── index.scss
├── utils/
│   └── (your utility files).ts
├── theme/
│   └── theme.scss
├── store/
│   └── store.ts
├── assets/
│   ├── images/
│   ├── sounds/
│   └── videos/
└── components/
    ├── .Interface/
    │   └── Interface.tsx
    ├── common/
    │   └── (your common bootstrapped components).tsx
    ├── widgets/
    │   └── (your custom components).tsx
    └── slice/
        └── (redux slices for components).ts
```

## Flow and Design

Here is my basic workflow/design for this template

- **STYLING** (All Styles are referenced from the parent file. No inline/local css/scss files beside component.)

    ```css
    index.scss
    ^   ^
    │   └── theme.scss
    │
    ├── Component1.tsx
    │   ├── [classes from index.scss]
    │   └── ...
    └── Component2.tsx
        └── ...
    ```

- **COMPONENT HEIRARCHY**

    ```css
    :
    │
    App.tsx
    ^
    │   assets/
    │   ├── images/ ──┓
    │   ├── sounds/ ──┨
    │   └── videos/ ──┨
    │                 |
    │   utils/        v
    │   └── [asset array list].ts
    │                 |
    Interface.tsx <───┙
    ^
    └── components/
        ├── common/
        │   └── (your common bootstrapped components).tsx
        └── widgets/
            └── (custom components that doesnt fit in the common context).tsx
    ```
