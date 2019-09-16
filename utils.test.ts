import { getChangelogEntry, BumpLevels, getChangedPackages } from "./utils";
import tempy from "tempy";
import { exec } from "@actions/exec";
import * as fs from "fs-extra";
import path from "path";

let changelog = `# @keystone-alpha/email

## 3.0.1

### Patch Changes

- [19fe6c1b](https://github.com/keystonejs/keystone-5/commit/19fe6c1b):

  Move frontmatter in docs into comments

## 3.0.0

### Major Changes

- [2164a779](https://github.com/keystonejs/keystone-5/commit/2164a779):

  - Replace jade with pug because Jade was renamed to Pug, and \`jade\` package is outdated

### Patch Changes

- [81dc0be5](https://github.com/keystonejs/keystone-5/commit/81dc0be5):

  - Update dependencies

## 2.0.0

- [patch][b69fb9b7](https://github.com/keystonejs/keystone-5/commit/b69fb9b7):

  - Update dev devependencies

- [major][f97e4ecf](https://github.com/keystonejs/keystone-5/commit/f97e4ecf):

  - Export { emailSender } as the API, rather than a default export

## 1.0.2

- [patch][7417ea3a](https://github.com/keystonejs/keystone-5/commit/7417ea3a):

  - Update patch-level dependencies

## 1.0.1

- [patch][1f0bc236](https://github.com/keystonejs/keystone-5/commit/1f0bc236):

  - Update the package.json author field to "The Keystone Development Team"

## 1.0.0

- [major] 8b6734ae:

  - This is the first release of keystone-alpha (previously voussoir).
    All packages in the \`@voussoir\` namespace are now available in the \`@keystone-alpha\` namespace, starting at version \`1.0.0\`.
    To upgrade your project you must update any \`@voussoir/<foo>\` dependencies in \`package.json\` to point to \`@keystone-alpha/<foo>: "^1.0.0"\` and update any \`require\`/\`import\` statements in your code.

# @voussoir/email

## 0.0.2

- [patch] 113e16d4:

  - Remove unused dependencies

- [patch] 625c1a6d:

  - Update mjml-dependency
`;

test("it works", () => {
  let entry = getChangelogEntry(changelog, "3.0.0");
  expect(entry.content).toMatchSnapshot();
  expect(entry.highestLevel).toBe(BumpLevels.major);
});

test("it works", () => {
  let entry = getChangelogEntry(changelog, "3.0.1");
  expect(entry.content).toMatchSnapshot();
  expect(entry.highestLevel).toBe(BumpLevels.patch);
});

test("getChangedPackages works", async () => {
  let dir = tempy.directory();
  await exec("git", ["init"], { cwd: dir });
  await fs.writeJson(path.join(dir, "package.json"), {
    name: "some-package",
    version: "1.0.0"
  });
  await exec("git", ["add", "."], { cwd: dir });
  await exec("git", ["commit", "-m", "initial commit"], { cwd: dir });
  let emptyWorkspaces = await getChangedPackages(dir);
  expect(emptyWorkspaces).toEqual([]);
  let workspace = {
    name: "some-package",
    version: "2.0.0"
  };
  await fs.writeJson(path.join(dir, "package.json"), workspace);
  let workspaces = await getChangedPackages(dir);
  expect(workspaces).toEqual([
    { name: "some-package", dir, config: workspace }
  ]);
});
