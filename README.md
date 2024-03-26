# Is Executable (TypeScript)

[**⚖️** MIT](./LICENSE.md)

**🗂️**
[![GitHub: hugoalh-studio/is-executable-ts](https://img.shields.io/badge/hugoalh--studio/is--executable--ts-181717?logo=github&logoColor=ffffff&style=flat "GitHub: hugoalh-studio/is-executable-ts")](https://github.com/hugoalh-studio/is-executable-ts)
[![JSR: @hugoalh/is-executable](https://img.shields.io/badge/JSR-@hugoalh/is--executable-F7DF1E?labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/is-executable")](https://jsr.io/@hugoalh/is-executable)

**🆙** ![Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/is-executable-ts?sort=semver&color=2187C0&label=&style=flat "Latest Release Version") (![Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/is-executable-ts?color=2187C0&label=&style=flat "Latest Release Date"))

A TypeScript module to determine whether the file is executable.

## 🎯 Target

- Bun ^ v1.0.0
- Deno >= v1.34.0 / >= v1.41.1 *(Via JSR)*
  > **🛡️ Require Permission**
  >
  > - Environment (`allow-env`)
  >   - `PATHEXT` *(For Windows Only)*
  > - File System - Read (`allow-read`)
  > - System Info (`allow-sys`)
  >   - `gid` *(For Non-Windows Only)*
  >   - `uid` *(For Non-Windows Only)*
- NodeJS >= v16.13.0

## 🔰 Usage

### Via HTTPS

> **🎯 Supported Target**
>
> - Deno

1. Import at the script (`<ScriptName>.ts`):
    - Via DenoPKG
      ```ts
      import ... from "https://denopkg.com/hugoalh-studio/is-executable-ts[@<Tag>]/mod.ts";
      ```
    - Via GitHub Raw (Require Tag)
      ```ts
      import ... from "https://raw.githubusercontent.com/hugoalh-studio/is-executable-ts/<Tag>/mod.ts";
      ```
    - Via Pax
      ```ts
      import ... from "https://pax.deno.dev/hugoalh-studio/is-executable-ts[@<Tag>]/mod.ts";
      ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
    >
    > - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
    > - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
    > - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
    >
    > These elements are not considered part of the public API, thus no stability is guaranteed for them.

### Via JSR With Native Support

> **🎯 Supported Target**
>
> - Deno

1. Import at the script (`<ScriptName>.ts`):
    ```ts
    import ... from "jsr:@hugoalh/is-executable[@<Tag>]";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.

### Via JSR With NPM Compatibility Layer Support

> **🎯 Supported Target**
>
> - Bun
> - NodeJS

1. Install via console/shell/terminal:
    - Via Bun
      ```sh
      bunx jsr add @hugoalh/is-executable[@<Tag>]
      ```
    - Via NPM
      ```sh
      npx jsr add @hugoalh/is-executable[@<Tag>]
      ```
    - Via PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/is-executable[@<Tag>]
      ```
    - Via Yarn
      ```sh
      yarn dlx jsr add @hugoalh/is-executable[@<Tag>]
      ```
2. Import at the script (`<ScriptName>.ts`):
    ```ts
    import ... from "@hugoalh/is-executable";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.

## 🧩 API

- ```ts
  function isExecutable(filePath: string, options: IsExecutableOptions = {}): Promise<boolean>;
  ```
- ```ts
  interface IsExecutableOptions {
    /**
    * If the file is not exist, whether to return `false` instead of throw an error.
    * @default false
    */
    mayNotExist?: boolean;
    /**
    * Effective group ID to check executable mode flags on POSIX system. Default to the group ID of the current process.
    */
    gid?: number;
    /**
    * Effective user ID to check executable mode flags on POSIX system. Default to the user ID of the current process.
    */
    uid?: number;
  }
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/is-executable)
