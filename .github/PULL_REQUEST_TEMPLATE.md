## Summary

This PR updates documentation and CI:

- Adds badges to README (owner: `bouajilaprog`, TypeScript, build, npm, codecov).
- Adds MIT `LICENSE` file.
- Adds a basic GitHub Actions CI workflow (`.github/workflows/ci.yml`) that installs deps, typechecks, and builds.
- Adds Codecov upload step (requires `CODECOV_TOKEN` secret).

## Checklist

- [ ] CI green
- [ ] Codecov token configured (optional)
- [ ] Update repo URL in README if different

## Notes

If you want the Build Status badge to be valid immediately, ensure GitHub Actions are enabled for this repo. For Codecov uploads, add `CODECOV_TOKEN` to repository secrets or remove the step.
