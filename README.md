# Sharty: Short URLs

A dead-simple, practically featureless backend for URL shortening. No databases, no user-tracking,
no nonsense. Just a flat YAML text file with slugs and URLs.

Sharty uses a YAML file to key short slugs to a full URL. Slugs can be any lowercase letter `a` thru
`z`, any number `0` thru `9`, plus the hyphen. So to point a slug `gh` at `https://github.com/`:

```yaml
# urls.yaml
gh: https://github.com/
```

The result is that `http://example.com/gh` redirects to `https://github.com/`. Completely boring and
yawn-worthy, but simple and effective.
