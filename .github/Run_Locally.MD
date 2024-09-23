# Local GitHub Actions Testing with act

## Installation

Multiple installation methods are available for act. See [the documentation](https://nektosact.com/installation/index.html) for a full list of options.

### Bash script

You can easily install a pre-built act executable on any system with bash via below commandline

```bash
curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```
⚠ Script can't install non-released versions ⚠

### Package Managers

Installation via software package manager
act is available in below package repositories

* [AUR](https://nektosact.com/installation/aur.html) (Linux)
* [Homebrew](https://nektosact.com/installation/homebrew.html) (Linux, macOS)
* [Chocolatey](https://nektosact.com/installation/chocolatey.html) (Windows)
* [COPR](https://nektosact.com/installation/copr.html) (Linux)
* [GitHub CLI](https://nektosact.com/installation/gh.html) (Linux, macOS, Windows, FreeBSD)
* [Nix/NixOS](https://nektosact.com/installation/nix.html) (Linux, macOS)
* [MacPorts](https://nektosact.com/installation/macports.html) (macOS)
* [Scoop](https://nektosact.com/installation/scoop.html) (Windows)
* [Winget](https://nektosact.com/installation/winget.html) (Windows)

## Setup

1. Clone your repository locally.
2. Navigate to the project root.
3. Create a `.secrets` file in `<root>/.github/`, following a Dotenv format.
    ```dotenv
    GITHUB_TOKEN=<your-PAT>
    ```
4. Replace `<your-PAT>` with a Personal Access Token from GitHub.

## Usage

> [!NOTE]
> See the [act documentation](https://nektosact.com/usage/index.html) for more advanced usage.

> [!NOTE]
> * Add `--secret-file .github/.secrets` to load secrets from the file.
> * Remember to keep your PAT secure and never commit the `.secrets` file to version control.

You can run specific workflows or emulate an event trigger with `act`.

To run a specific workflow:
```shell
act  -j <job-name>
```

Replace `<job-name>` with the name of the job you want to test.

To emulate an event trigger:
```shell
act push
```
```shell
act pull_request
```

> [!TIP]
> * Use `-W` flag to specify a custom working directory.
> * For Windows runners, use `-P windows-latest` instead.
